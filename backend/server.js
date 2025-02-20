const express = require("express");
const mysql = require("mysql2/promise"); // Usa la versión con promesas
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let DB; // La conexión a la base de datos

// Función para conectar a la base de datos antes de iniciar el servidor
async function connectDB() {
  try {
    DB = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Argentina_123",
      database: "vinculacion_itsqmet",
    });
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1); // Sale del proceso si hay error
  }
}

// Ruta GET para obtener la información de un estudiante específico
app.get("/api/estudiantes/:ci_estudiante", async (req, res) => {
  const { ci_estudiante } = req.params;
  
  try {
    const [estudiante] = await DB.query(
      "SELECT * FROM estudiantes WHERE ci_estudiante = ?",
      [ci_estudiante]
    );

    if (estudiante.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json(estudiante[0]); // Enviar solo el primer resultado
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});


// Ruta POST para login
app.post("/api/login", async (req, res) => {
  const { email, contrasenia } = req.body;

  try {
    // Buscar en la tabla "estudiantes"
    const [estudiantes] = await DB.query(
      "SELECT * FROM estudiantes WHERE email = ? AND contrasenia = ?",
      [email, contrasenia]
    );

    if (estudiantes.length > 0) {
      return res.json({ message: "Login exitoso", user: estudiantes[0] });
    }

    // Buscar en la tabla "profesores"
    const [profesores] = await DB.query(
      "SELECT * FROM profesores WHERE email = ? AND contrasenia = ?",
      [email, contrasenia]
    );

    if (profesores.length > 0) {
      return res.json({ message: "Login exitoso", user: profesores[0] });
    }

    return res.status(401).json({ error: "Credenciales incorrectas" });
  } catch (err) {
    console.error("Error en la consulta:", err);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});


// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
});
