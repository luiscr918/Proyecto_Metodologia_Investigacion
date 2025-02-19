const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());

const DB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Argentina_123",
  database: "vinculacion_itsqmet",
});
DB.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexion Exitosa");
});

//ruta para peticion GET
app.get("/api/estudiantes", (req, res) => {
  const SQL_QUERY = "SELECT *from estudiante";
  DB.query(SQL_QUERY, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
//echar a andar el server
app.listen(PORT, () => {
  console.log("SERVIDOR ESCUCHANDO CORRECTAMENTE");
});
