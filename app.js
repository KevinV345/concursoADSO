// Importar módulos necesarios
const { log } = require('console');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para decodificar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Endpoint de ejemplo para manejar solicitudes POST
app.post('/api/data', (req, res) => {
  const data = req.body; // Acceso al cuerpo de la solicitud
  console.log('Datos recibidos:', data);

  // Respuesta de ejemplo
  res.json({ message: 'Datos recibidos correctamente', data });
});


var empezo=false;
app.get('/empezar-juego', (req, res) => {
    empezo=true;
    res.json(true);
});
app.get('/empezar', (req, res) => {
    res.json(empezo);
});

var correctas={}
app.get('/register', (req, res) => {
    if(correctas[req.query.n]!=undefined){
        res.send("error");
        return
    }
    correctas[req.query.n]=0
    res.json("ok");
});
app.get('/lista', (req, res) => {

    var arr=Object.keys(correctas).map(e => {
        return {n:e,p:correctas[e],e:jugadores_que_terminaron.includes(e)}
    });


    var terminaron=arr.filter((e)=>e.e)
    var faltan=arr.filter((e)=>!e.e)
    terminaron=terminaron.sort((a, b) => {
        // Primero comparamos los puntos de los jugadores
        if (b.p !== a.p) {
            return b.p - a.p; // Mayor puntaje primero
        }
        // Si tienen los mismos puntos, mantiene el orden original (no cambia el orden en caso de empate)
        return 0; // Devuelve 0 para que no se cambie el orden
    });
    faltan=faltan.sort((a, b) => {
        // Primero comparamos los puntos de los jugadores
        if (b.p !== a.p) {
            return b.p - a.p; // Mayor puntaje primero
        }
        // Si tienen los mismos puntos, mantiene el orden original (no cambia el orden en caso de empate)
        return 0; // Devuelve 0 para que no se cambie el orden
    });



    res.json({terminaron,faltan});
});



var jugadores_que_terminaron=[]


app.get('/reiniciar', (req, res) => {
    correctas[req.query.n]=0
})
app.get('/end', (req, res) => {
    res.send("ok")
    jugadores_que_terminaron.push(req.query.n)
    
})
app.get('/correcta', (req, res) => {
    if(!correctas[req.query.n]){
        correctas[req.query.n]=0;
    }
    correctas[req.query.n]++;
    res.json("ok");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});




