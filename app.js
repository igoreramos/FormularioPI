const express = require("express");
const app = express();
const porta = 3000
const bodyParser = require("body-parser")

app.use(bodyParser.json());

const livros = [
    {id: 1, título: "Aprendendo Javascript", autor: "Jhon Jones"},
    {id: 2, título: "Aprendendo a codar", autor: "Cabeça lisa"},
];

app.get("/", (req, res) => {
    res.send(livros);
});

app.post("/", (req, res) => {
    const novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor,
      };
    
      livros.push(novoLivro);
      res.status(201).json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
    const livroIndex = livros.findIndex((l) => l.id === parseInt(req.params.id));
  
    if (livroIndex === -1) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }
    livros[livroIndex] = {
      id: livros[livroIndex].id,
      titulo: req.body.titulo,
      autor: req.body.autor,
    };
    res.json(livros[livroIndex]);
  });
  

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
