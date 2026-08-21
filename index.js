const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");
const Resposta = require("./database/Resposta");

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

// tela da pergunta.ejs
app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Achou a pergunta

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                        ['id','DESC']
                ]
            }).then(respostas =>{
                 res.render("pergunta",{
                pergunta: pergunta,
                respostas: respostas
              });
            });
            }else{ //Não encotrou
                res.redirect("/");           
        };
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

//servidor
app.listen(8080,()=>{console.log("App rodando!");});