import PocketBase from 'pocketbase';
import { useRuntimeConfig } from 'nitropack/runtime';

let pbInstance: PocketBase | null = null;
let authPromise: Promise<void> | null = null;

export async function getPocketBaseInstance(): Promise<PocketBase> {
  const config = useRuntimeConfig(); // Acessa o runtimeConfig globalmente

  const pocketbaseUrl = config.pocketBaseUrl;
  const pocketBaseEmail = config.pocketBaseEmail;
  const pocketBasePassword = config.pocketBasePassword;

  if (!pocketbaseUrl || !pocketBaseEmail || !pocketBasePassword) {
    console.error('Erro: Variáveis de ambiente do PocketBase não configuradas corretamente.');
    throw new Error('Configuração do PocketBase incompleta no servidor.');
  }
  if (!pbInstance) {
    pbInstance = new PocketBase(pocketbaseUrl);
    console.log(`PocketBase: Nova instância criada para ${pocketbaseUrl}`);
  }

  if (!pbInstance.authStore.isValid || pbInstance.authStore.token === '') {
    if (!authPromise) {
      console.log('PocketBase: Iniciando autenticação...');
      authPromise = pbInstance.collection('_superusers').authWithPassword(
        pocketBaseEmail,
        pocketBasePassword,
      ).then(() => {
        console.log('PocketBase: Autenticação bem-sucedida.');
        authPromise = null;
      }).catch(err => {
        console.error('PocketBase: Erro na autenticação:', err);
        authPromise = null;
        throw err;
      });
    }

    await authPromise;
  } else {
    console.log('PocketBase: Instância já autenticada, reutilizando token.');
  }

  return pbInstance;
}