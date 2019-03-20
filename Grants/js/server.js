var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));

var id = 3;
var grants = [ 
  {id:0,
    titulo:"Name 1",
    tipo:"Familia",
    objeto:"Efectivo",
    abstract:"Ayuda para la familia",
    url:"http://www.boe.es/boe/dias/2016/07/28/pdfs/BOE-A-2016-7300.pdf",
    beneficiarios:2,
    requisitos:3,
    documentacion:4,
    plazos:5,
    solicitud:6
  },
  {id:1,
    titulo:"Name 2",
    tipo:"Familia",
    objeto:"Ayuda fi­sica",
    abstract:"Ayuda para la familia",
    url:"",
    beneficiarios:1,
    requisitos:2,
    documentacion:3,
    plazos:4,
    solicitud:5
  }, 
  {id:2,
    titulo:"Name 3",
    tipo:"Familia",
    objeto:"Colegio",
    abstract:"Ayuda para la familia",
    url:"http://localhost/conmascosas",
    beneficiarios:3,
    requisitos:4,
    documentacion:5,
    plazos:6,
    solicitud:7
}
];

app.get('/grantsService', function (req, res) { 
    console.log("Llamando a list grants");
    res.send(grants);
 })

app.post('/grantsService', function (req, res) {
    console.log("Llamando a add grants");
    console.log(req.body);
    req.body.id = id;
    id ++;
    grants.push(req.body); // Aqui insertamos en el array
    console.log(grants);
    res.send("ok");  
})

app.get('/grantService/:id', function (req, res) { 
    //Accedemos al id asi: req.params.id, es una modalidad que nos permite el modulo express.
    var cp = grants.findIndex(x => x.id == req.params.id);
    console.log("recibida llamada a get");
    console.log(req.params.id);
    console.log(grants[cp]);
    res.send(grants[cp]); 
    
 })

app.put('/grantService/:id',function(req,res){ 
    console.log("Llamando a update grants");
    console.log(req.body);
    var cp = grants.findIndex(x => x.id == req.params.id);
    grants.splice(cp,req.params.id,req.body); 
    res.send("ok");

})

app.delete('/grantService/:id', function (req, res) { 
          var cp = grants.findIndex(x => x.id == req.params.id);
          grants.splice(cp,1); //borra
          res.send(grants);
 })

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)

})