export default defineNitroConfig({
  srcDir: "server",
  runtimeConfig: {
    pocketBaseUrl: process.env.POCKET_BASE_URL,
    pocketBaseEmail: process.env.POCKET_BASE_EMAIL,
    pocketBasePassword: process.env.POCKET_BASE_PASSWORD,
  },
});
