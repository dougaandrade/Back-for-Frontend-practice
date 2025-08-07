import { getPocketBaseInstance } from "./pocketBaseInstance";

let authPromise = null as Promise<void> | null;

export async function authPocketBase() {
  const config = useRuntimeConfig();

  const pocketBaseEmail = config.pocketBaseEmail;
  const pocketBasePassword = config.pocketBasePassword;

  const pbInstance = await getPocketBaseInstance();
  if (!pbInstance.authStore.isValid || pbInstance.authStore.token === "") {
    if (pbInstance === null) {
      console.log("PocketBase: Iniciando autenticação...");
      authPromise = pbInstance
        .collection("_superusers")
        .authWithPassword(pocketBaseEmail, pocketBasePassword)
        .then(() => {
          console.log("PocketBase: Autenticação bem-sucedida.");
          authPromise = null;
        })
        .catch((err) => {
          console.error("PocketBase: Erro na autenticação:", err);
          authPromise = null;
          throw err;
        });
    }

    await authPromise;
  } else {
    console.log("PocketBase: Instância já autenticada, reutilizando token.");
  }

  return pbInstance;
    
}