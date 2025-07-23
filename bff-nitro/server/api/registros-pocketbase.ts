import PocketBase from 'pocketbase';

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig(event);
  const pocketbaseUrl = config.pocketBaseUrl;
  console.log(`Conectando ao PocketBase em: ${pocketbaseUrl}`);
  const collectionName = 'sabia_paineis';

  try {
      const pocketbaseUrl = config.pocketBaseUrl;
      const pocketBaseEmail = config.pocketBaseEmail;
      const pocketBasePassword = config.pocketBasePassword;
    const pb = new PocketBase(pocketbaseUrl);

    await pb.collection('_superusers').authWithPassword(
      pocketBaseEmail,
      pocketBasePassword,
    );
    
    const resultList = await pb.collection('sabia_paineis').getList(1, 7, {
        sort : '-id',
    });
    return resultList;
  } catch (error) {
    console.error(`Erro ao conectar ao PocketBase ou buscar registros da coleção '${collectionName}':`, error);

    if (error instanceof Error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Erro interno no servidor ao acessar o PocketBase: ${error.message}`,
        });
    } else {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ocorreu um erro desconhecido ao acessar o PocketBase.',
        });
    }
  }
});