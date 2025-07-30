import { getPocketBaseInstance } from '../utils/pocketbase'; // Importe a função

export default defineEventHandler(async (event) => {
  const collectionName = 'sabia_paineis';

  try {
    const pb = await getPocketBaseInstance(); 

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

    if (error.message.includes('Configuração do PocketBase incompleta')) {
       throw createError({ statusCode: 500, statusMessage: error.message });
    }
    if (error.message.includes('Erro na autenticação')) {
      throw createError({ statusCode: 401, statusMessage: 'Falha na autenticação com o PocketBase.' });
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Erro interno no servidor: ${error.message || 'Ocorreu um erro desconhecido.'}`,
    });
  }
});