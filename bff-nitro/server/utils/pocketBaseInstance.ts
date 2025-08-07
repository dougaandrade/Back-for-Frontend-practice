import PocketBase from "pocketbase";
import { useRuntimeConfig } from "nitropack/runtime";
import { authPocketBase } from "./authPocketBase";

let pbInstance = null as PocketBase | null;

export async function getPocketBaseInstance() {
  const config = useRuntimeConfig();

  const pocketbaseUrl = config.pocketBaseUrl;

  if (!pocketbaseUrl) {
    console.error(
      "Erro: Variáveis de ambiente do PocketBase não configuradas corretamente."
    );
    throw new Error("Configuração do PocketBase incompleta no servidor.");
  }
  if (!pbInstance) {
    pbInstance = new PocketBase(pocketbaseUrl);
    console.log(`PocketBase: Nova instância criada para ${pocketbaseUrl}`);
  }

  if (pbInstance.authStore.isValid) {
    console.log("PocketBase: Instância autenticada, reutilizando token.");
  } else {
    pbInstance = await authPocketBase();
  }
  console.log( pbInstance)
  return pbInstance;
}
