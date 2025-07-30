
import PocketBase from 'pocketbase';
import {  useRuntimeConfig} from 'nitropack/runtime';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const pocketbaseUrl = config.pocketBaseUrl;
  const pocketBaseEmail = config.pocketBaseEmail;
  const pocketBasePassword = config.pocketBasePassword;

  console.log(`BFF: Recebendo requisição para sab_paineis. Conectando ao PocketBase em: ${pocketbaseUrl}`);

  const collectionName = 'sabia_paineis';

  if (!pocketbaseUrl || !pocketBaseEmail || !pocketBasePassword) {
    console.error('Erro: Variáveis de ambiente do PocketBase não configuradas corretamente.');
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuração do PocketBase incompleta no servidor. Verifique seu .env e nitro.config.ts',
    });
  }

  try {
    const pb = new PocketBase(pocketbaseUrl);

    await pb.collection('_superusers').authWithPassword(
      pocketBaseEmail,
      pocketBasePassword,
    );

    const query = getQuery(event);
    let filterString = '';

    if (query.internet !== undefined) {
      const internetValue = String(query.internet).toLowerCase();

      if (internetValue === 'true') {
        filterString = 'internet = true';
      } else if (internetValue === 'false') {
        filterString = 'internet = false';
      }
    }

    const resultList = await pb.collection(collectionName).getList(1, 7, {
      sort: '-id',
      filter: filterString,
    });

    return resultList;
  } catch (error: any) {
    console.error(`Erro no BFF ao buscar registros da coleção '${collectionName}':`, error);

    if (error.status === 400 && error.response?.message === 'Failed to authenticate.') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Falha na autenticação com o PocketBase. Verifique credenciais.',
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Erro interno no servidor: ${error.message || 'Ocorreu um erro desconhecido.'}`,
    });
  }
});