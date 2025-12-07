//server.ts
import "dotenv/config";
import database from "./db";
import app from "./app";
import { setupAssociations } from "./model/association";

(async () => {
  try {
    const port = parseInt(`${process.env.PORT}`);

    await database.sync();
    console.log(`Rodando o banco de dados ${process.env.NAME_DB}`);
    setupAssociations();

    await app.listen(port);
    console.log(`Rodando na porta ${port}`);
  } catch (error) {
    console.log(error);
  }
})();
