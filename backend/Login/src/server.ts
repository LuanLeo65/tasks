import app from "./app";
import database from "./db";

(async () => {
  try {
    const PORT = parseInt(`${process.env.PORT}`);
    
    await database.sync()
    console.log(`Conectado ao banco ${process.env.DB_NAME}`)

    await app.listen(PORT);
    console.log(`Rodando na porta ${process.env.PORT}`);
    
  } catch (error) {
    console.log("Erro ao tentar subir servidor login" + error);
  }
})();
