const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");

//Database
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados")
})
    .catch((msgErro) =>{
        console.log(msgErro);
    })

// EJS View Engine
app.set("view engine", "ejs");
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req,res)=>{
    Pergunta.findAll({ raw:true, order:[['id','DESC']] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    }); 
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {
        //recebe dados
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    // inserindo dados na tabela do banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
});

//servidor
app.listen(8080,()=>{console.log("App rodando!");});