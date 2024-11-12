const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite solicitudes desde cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Permite métodos HTTP
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permite estas cabeceras
  next();
});

app.use(bodyParser.json());

const PORT = 3000;

const conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fotoTren",
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

conection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});




app.get("/api/trains/types", (req, res) => {
  const query = "SELECT * FROM tipoTren";
  conection.query(query, (err, result) => {
    if (err) return console.log(err.message);
    res.json(result);
  });
});

app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM usuario";
  conection.query(query, (err, result) => {
    if (err) return console.log(err.message);
    res.json(result);
  });
});


app.post("/api/users/create", (req, res) => {
  const usuario = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  
  const idFinder = "SELECT email FROM usuario WHERE email = ?";
  
  // Check if user already exists
  conection.query(idFinder, [usuario.email], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Error while checking for existing user");
    }

    if (result.length > 0) {
      res.json("El usuario ya existe");
    } else {
      const insertQuery = "INSERT INTO usuario SET ?";
      conection.query(insertQuery, usuario, (err, result) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json("Error while inserting user");
        }
        res.json("Se insertó correctamente");
      });
    }
  });
});



app.post("/api/users/login", (req, res) => {
  const usuario = {
    email: req.body.email,
    contra: req.body.contra,
  };

  const checker = `SELECT contra FROM usuario WHERE email = ?`;
  
  // Check if user exists and password matches
  conection.query(checker, [usuario.email], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Error while checking user credentials");
    }
    
    if (result.length > 0 && result[0].contra === usuario.contra) {
      // Password matches
      res.json("OK");
    } else {
      // Password does not match or user not found
      res.json("NO");
    }
  });
});


app.get("/api/publications", (req, res) => {
  const query = "select * from imagen as img join publicacion as pub on img.pubId=pub.pubId group by pub.pubId  ;";
  conection.query(query, (err, result) => {
    if (err) console.log(err.message);

    if (result.length > 0) {
      res.json(result); // Enviar el resultado como respuesta
    } else {
      res.json("No hay publicaciones"); // Mensaje si no hay resultados
    }
  });
});

app.get("/api/publicationsId/:pubId", (req, res) => {
  const { pubId } = req.params;
  const query = `SELECT * FROM Publicacion WHERE pubId = ${pubId}`;
  console.log(query);
  conection.query(query, (err, result) => {
    if (err) return console.log(err.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay publicaciones con ese id");
    }
  });
});

app.post("/api/publications", (req, res) => {
  const usuario = {
    pubId: req.body.pubId,
    email: req.body.email,
    tremId: req.body.trenId,
    titulo: req.body.titulo,
    posicion: req.body.posicion,
    comAuto: req.body.comAuto,
  };
  const query = `INSERT INTO Publicacion ?`;
  conection.query(query, usuario, (err, result) => {
    if (err) return console.log(err.message);
    res.json("Se inserto correctamente");
  });
});

app.put("/api/publications/actualizar/:pubId", (req, res) => {
  const pubId = req.params;
  const usuario = {
    email: req.body.email,
    tremId: req.body.trenId,
    titulo: req.body.titulo,
    posicion: req.body.posicion,
    comAuto: req.body.comAuto,
  };
  const query = `UPDATE Publicacion SET ? WHERE id = ${pubId}`;
  conection.query(query, usuario, (err, result) => {
    if (err) return console.log(err.message);
    res.json("Se actualizo correctamente");
  });
});


// DELETE
app.delete("/api/publications/delete/:pubId", (req, res) => {
  const { pubId } = req.params;
  const query = "DELETE FROM Publicacion WHERE pubId = ?";
  console.log(query);
  // Usa el pubId como parámetro para evitar SQL Injection
  conection.query(query, [pubId], (err, result) => {
    if (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ error: "Error al eliminar la publicación" });
    }
    // Verificar si alguna fila fue eliminada
    if (result.affectedRows > 0) {
      res.json("Se eliminó correctamente");
    } else {
      res.json("No se encontró ninguna publicación con ese id");
    }
  });
});
