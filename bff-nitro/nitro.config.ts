export default defineNitroConfig({
  srcDir: "server",
    runtimeConfig: {
    // Variáveis acessíveis apenas no servidor (via `useRuntimeConfig()`)
    // As chaves aqui mapeiam para process.env
    pocketBaseUrl: process.env.POCKET_BASE_URL,
    pocketBaseEmail: process.env.POCKET_BASE_EMAIL,
    pocketBasePassword: process.env.POCKET_BASE_PASSWORD,
  }

  
});
