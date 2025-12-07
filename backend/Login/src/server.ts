import "dotenv/config";
import app from "./app";
import database from "./db";
import { setupAssociations } from "./model/association";

(async () => {
  try {
    const PORT = parseInt(`${process.env.PORT}`);

    await database.sync();
    console.log(`Conectado ao banco ${process.env.DB_NAME}`);

    setupAssociations();

    await app.listen(PORT);
    console.log(`Rodando na porta ${process.env.PORT}`);
  } catch (error) {
    console.log("Erro ao tentar subir servidor login" + error);
  }
})();
