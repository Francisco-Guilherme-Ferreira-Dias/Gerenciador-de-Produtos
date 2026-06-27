const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/produtos",(req,res)=>{

    const {nome,categoria,preco,quantidade} = req.body;

    db.run(
        "INSERT INTO produtos(nome,categoria,preco,quantidade) VALUES(?,?,?,?)",
        [nome,categoria,preco,quantidade],
        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                id:this.lastID
            });
        }
    );
});

app.get("/produtos",(req,res)=>{

    db.all(
        "SELECT * FROM produtos",
        [],
        (err,rows)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
});

app.put("/produtos/:id",(req,res)=>{

    const {nome,categoria,preco,quantidade} = req.body;

    db.run(
        `UPDATE produtos
         SET nome=?,
             categoria=?,
             preco=?,
             quantidade=?
         WHERE id=?`,
        [
            nome,
            categoria,
            preco,
            quantidade,
            req.params.id
        ],
        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                alterados:this.changes
            });
        }
    );
});

app.delete("/produtos/:id",(req,res)=>{

    db.run(
        "DELETE FROM produtos WHERE id=?",
        [req.params.id],
        function(err){

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                removidos:this.changes
            });
        }
    );
});

app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000");
});