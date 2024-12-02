const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const { log } = require("console");
const multer = require('multer');
const saltRounds = 10; // Define the cost factor for hashing
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ok } = require("assert");

const uploadsDir = path.join(__dirname, '../../public/fotosGuardadas');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permite solicitudes desde cualquier origen
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Permite métodos HTTP
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permite estas cabeceras
  next();
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/fotosGuardadas'); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada archivo
  },
});

const upload = multer({ storage: storage });


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
  const query = "SELECT * FROM Usuario";
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

  const idFinder = "SELECT email FROM Usuario WHERE email = ?";

  // Verificar si el usuario ya existe
  conection.query(idFinder, [usuario.email], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Error while checking for existing user");
    }

    if (result.length > 0) {
      res.status(500).json("El usuario ya existe");
    } else {
      // Hash de la contraseña
      bcrypt.hash(usuario.password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json("Error al hashear la contraseña");
        }

        // Reemplazar la contraseña en claro con la contraseña hasheada
        usuario.password = hashedPassword;

        // Insertar el nuevo usuario en la base de datos
        const insertQuery = "INSERT INTO Usuario SET ?";
        conection.query(insertQuery, usuario, (err, result) => {
          if (err) {
            console.log(err.message);
            return res.status(500).json("Error al insertar el usuario");
          }

          // Devolver el nombre del usuario después de crearlo
          res.json({ name: usuario.name });
        });
      });
    }
  });
});

app.post("/api/users/login", (req, res) => {
  const usuario = {
    email: req.body.email,
    contra: req.body.password, // Cambiar 'contra' a 'password'
  };

  // Consulta para verificar la contraseña del usuario
  const checker = `SELECT password, name FROM Usuario WHERE email = ?`;

  // Verificar si el usuario existe y validar la contraseña
  conection.query(checker, [usuario.email], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Error en la base de datos");
    }

    if (result.length > 0) {
      const hashedPassword = result[0].password;

      // Comparar la contraseña proporcionada con la almacenada
      bcrypt.compare(usuario.contra, hashedPassword, (err, isMatch) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json("Error en la comparación de contraseñas");
        }

        if (isMatch) {
          // La contraseña coincide, devolver el nombre del usuario
          const name = result[0].name;
          res.json({ name }); // Devolver el nombre del usuario
        } else {
          // La contraseña no coincide
          res.status(401).json("Contraseña incorrecta");
        }
      });
    } else {
      // El usuario no fue encontrado
      res.status(404).json("Usuario no encontrado");
    }
  });
});




app.post('/upload', upload.single('file'), (req, res) => {

  const datosSubida = {
    titulo: req.body.titulo,      //pub.titulo              v
    texto: req.body.descripcion,  //pub.texto               v
    tren: req.body.tren,          //tipoTren.tipoTren       v
    modelo: req.body.modelo,      //tren.modelo             v
    ubicacion: req.body.ubicacion,  //pub.comAuto             v
    creador: req.body.creador,    //usu.name                email
    //pub.pubId               pubId

  };

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Archivo no subido' });
  }

  console.log('Datos del formulario modelo:', datosSubida.modelo, 'Tren:', datosSubida.tren);

  // Obtener el email del usuario
  const queryGetUser = `SELECT email FROM usuario WHERE name = ?`;
  conection.query(queryGetUser, [datosSubida.creador], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const email = result[0].email;

    // Obtener el máximo pubId
    const queryMaxPubId = 'SELECT MAX(pubId) AS pubId FROM publicacion';
    conection.query(queryMaxPubId, (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Error al obtener pubId" });
      }

      let pubId = result[0].pubId || 0; // Si no hay publicaciones, comenzar con 1
      pubId += 1;

      console.log('New pubId:', pubId);


      const querygetTrenId = 'select max(trenId) as trenId from Tren;'; 
      conection.query(querygetTrenId, [email, pubId], (err, result) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ error: "Error obtener ultimo tren id" });
        }

        let trenId = result[0].trenId || 0; // Si no hay publicaciones, comenzar con 1
        trenId += 1;
        console.log('Tren id new' , trenId, ' modelo', datosSubida.modelo, ' tipotren ', datosSubida.tren);

        const queryInsertTren = 'INSERT INTO `fotoTren`.`Tren` (`trenId`, `modelo`, `tipoTren`) VALUES     (?, ?, ?)'; // TODO mal
        conection.query(queryInsertTren, [trenId, datosSubida.modelo, datosSubida.tren], (err, result) => {
          if (err) {
            console.log(err.message);
            return res.status(500).json({ error: "Error al insertar en Tren" });
          }
          console.log('Ubicacion: ' , datosSubida.ubicacion)
          const queryInsertPub = 'INSERT INTO `fotoTren`.`Publicacion` (`email`, `trenId`, `titulo`, `comAuto`, `texto`) VALUES (?,?,?,?,?)'; // TODO mal
          conection.query(queryInsertPub, [email, trenId,datosSubida.titulo,datosSubida.ubicacion,datosSubida.texto], (err, result) => {
            if (err) {
              console.log(err.message);
              return res.status(500).json({ error: "Error al insertar en Publicacion" });
            }






            // Insertar en la tabla Imagen
            const queryInImagen = `INSERT INTO Imagen (imgId, pubId) VALUES (?, ?)`;
            conection.query(queryInImagen, [file.filename, pubId], (err, result) => {
              if (err) {
                console.log(err.message);
                return res.status(500).json({ error: "Error al insertar en Imagen" });
              }

              console.log('Imagen insertada correctamente');
              res.status(200).json({
                message: 'Formulario procesado correctamente',
                pubId,
                email,
              });
            });
          });
        });
      });
    });
  });
});




module.exports = router;



app.get("/api/publications", (req, res) => {
  
  const query = "select img.imgId, pub.pubId, pub.titulo, pub.comAuto, pub.fechaCrea, pub.texto, tren.modelo, tip.name as tipoTren, usu.name as nombreUsuario  from Imagen as img join Publicacion as pub on img.pubId=pub.pubId join Tren as tren on tren.trenId=pub.trenId join tipoTren as tip on tip.tipoTren=tren.tipoTren join Usuario as usu on usu.email=pub.email;";
//  const query = "select * from Imagen as img join Publicacion as pub on img.pubId=pub.pubId group by pub.pubId  ;";

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



// GET foro
app.get("/api/foroConversaciones", (req, res) => {
  const { pubId } = req.params;
  const query = `SELECT * FROM Foro where PId IS null `;

  conection.query(query, (err, result) => {
    if (err) return console.log(err.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay publicaciones con ese id");
    }
  });
});

// GET foro
app.get("/api/foroConversaciones/:PId", (req, res) => {
  const { PId } = req.params;
  const query = `SELECT * FROM Foro WHERE PId = ${PId}`;

  conection.query(query, (err, result) => {
    if (err) return console.log(err.message);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No hay publicaciones con ese id");
    }
  });
});


//POST Foro

app.post("/api/foroConversaciones/comentar", (req, res) => {
  const { PId, Creador, Texto } = req.body; // Extraer valores del cuerpo de la solicitud
  const query = `INSERT INTO Foro (PId, Creador, Texto) VALUES (?, ?, ?)`; // Especificar columnas y usar marcadores
  conection.query(query, [PId, Creador, Texto], (err, result) => { // Pasar los valores como un arreglo
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json("Se insertó correctamente");
  });
});

app.post("/api/foroConversaciones/nuevoTema", (req, res) => {
  const { Creador, Texto } = req.body; // Extraer valores del cuerpo de la solicitud
  const query = `INSERT INTO Foro (PId, Creador, Texto) VALUES (null, ?, ?)`; // Especificar columnas y usar marcadores
  conection.query(query, [Creador, Texto], (err, result) => { // Pasar los valores como un arreglo
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json("Se insertó correctamente");
  });
});
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});



app.get('/api/getImage', (req, res) => {
  const imageName = req.query.imageName;

  if (!imageName) {
    return res.status(400).json({ error: 'El nombre de la imagen es obligatorio' });
  }

  // Ruta completa de la imagen
  const imagePath = path.join(__dirname, '../../public/fotosGuardadas', imageName);

  // Verifica si la imagen existe
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
  }

  // Configurar el tipo MIME y enviar la imagen
  res.setHeader('Content-Type', 'image/*'); 
  res.sendFile(imagePath);
});



app.post("/api/cuenta/cambiarContra", (req, res) => {
  const { Creador, Texto } = req.body; // Extraer valores del cuerpo de la solicitud
  const cambio = {
    usuario: req.body.usuario,
    contraAntigua: req.body.contraAntigua,
    contraNueva: req.body.contraNueva,
  };

 
  const checker = `SELECT password FROM Usuario WHERE name = ?`;

  // Verificar si el usuario existe y validar la contraseña
  conection.query(checker, [cambio.usuario], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Error en la base de datos");
    }

    if (result.length > 0) {
      const hashedPassword = result[0].password;

      // Comparar la contraseña proporcionada con la almacenada
      bcrypt.compare(usuario.contra, hashedPassword, (err, isMatch) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json("Error en la comparación de contraseñas");
        }

        if (isMatch) {
          bcrypt.hash(cambio.contraNueva, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.log(err.message);
              return res.status(500).json("Error al hashear la contraseña");
            }
    
            // Reemplazar la contraseña en claro con la contraseña hasheada
            cambio.contraAntigua = hashedPassword;
    
            // Insertar el nuevo usuario en la base de datos
            const insertQuery = "update Usuario set password = ? where name = ?";
            conection.query(insertQuery, cambio.usuario,cambio.contraNueva, (err, result) => {
              if (err) {
                console.log(err.message);
                return res.status(500).json("Error al insertar el usuario");
              }
    
              // Devolver el nombre del usuario después de crearlo
             res.status(ok);
            });
          });
          
          
        } else {
          // La contraseña no coincide
          res.status(401).json("Contraseña incorrecta");
        }
      });
    } else {
      // El usuario no fue encontrado
      res.status(404).json("Usuario no encontrado");
    }
  });
});
