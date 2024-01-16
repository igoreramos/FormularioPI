import express, { json } from "express";
import mysql from "mysql2"
import bodyParser from "body-parser";

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345",
    database: "softexlabs"
});

const app = express();
app.use(json());
app.use(bodyParser.json());

//Seleção de todos os dados que há no banco de dados;
app.get("/empresa", (req, res) => {
    const consulta = "select empresa.nome, empresa.cnpj, empresa.email, empresa.senha from softexlabs.empresa";

    conexao.query(consulta, (erro, resultado) => {
        if(erro){
            console.log(erro);
            res.status(404).json({'erro': erro});
        }else{
            res.status(200).json(resultado);
        }
    })
});

//Seleção por cnpj;
app.get("/empresa/:id", (req, res) => {
    const cnpj = req.params.id
    const sql = 'SELECT * FROM empresa WHERE cnpj = ?';

    conexao.query(sql, cnpj, (erro, resultado) => {
        if(erro){
            console.log(erro);
            res.status(404).json({'erro': erro});
        }else{
            if (Array.isArray(resultado) && resultado.length === 0) {
                // Não foram encontrados registros com esse CNPJ
                res.status(404).json({'mensagem': 'Empresa não cadastrada.'});
            } else {
                // Empresa encontrada
                res.status(200).json(resultado);
            }
        }
    })
});

//Cadastrar uma nova empresa;
app.post("/cadastrar", (req, res) => {
    const dados = req.body;
    const sql = "insert into softexlabs.empresa set ?;"

    conexao.query(sql, dados, (erro, resultado) => {
        if(erro){
            console.log(erro);
            res.status(400).json({'erro': erro})
        }else{
            res.status(201).json(resultado)
        }
    })
});

// Alterar dados da empresa através do CNPJ
app.put("/alterar/:id", (req, res) => {

    const cnpj = req.params.id;
    const dados = req.body;
    const sql = 'UPDATE empresa SET ? WHERE cnpj = ?';

    conexao.query(sql, [dados, cnpj], (erro, resultado) => {
        if(erro){
            console.log(erro);
            res.status(404).json({'erro': erro});
        }else{
            res.status(200).json(resultado);
        }
    });
})

// Deletar empresa através do CNPJ
app.delete("/deletar/:id", (req, res) => {
    const cnpj = req.params.id;
    const sql = "DELETE FROM empresa WHERE cnpj = ?"

    conexao.query(sql, cnpj, (erro, resultado) => {
        if(erro){
            console.log(erro);
            res.status(404).json({'erro': erro});
        }else{
            res.status(200).json(resultado);
        }
    })
});

app.listen(3000, () => {
    console.log("Conectado a porta http://localhost:3000/empresa");    
});