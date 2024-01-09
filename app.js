import express, { application } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();


app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://https://seu-backend.com/CRUD_BACK_E_FRONT");
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter dados da API." });
    }
  });
  

const porta = 3000;

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
