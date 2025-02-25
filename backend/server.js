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
// Ruta GET para obtener la información de un profesor específico
app.get("/api/profesores/:ci_profesor", async (req, res) => {
  const { ci_profesor } = req.params;

  try {
    const [profesor] = await DB.query(
      "SELECT * FROM profesores WHERE ci_profesor = ?",
      [ci_profesor]
    );

    if (profesor.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    res.json(profesor[0]); // Enviar solo el primer resultado
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
    // Buscar en la tabla admin"
    const [admin] = await DB.query(
      "SELECT * FROM admin WHERE email = ? AND contrasenia = ?",
      [email, contrasenia]
    );

    if (admin.length > 0) {
      return res.json({ message: "Login exitoso", user: admin[0] });
    }

    return res.status(401).json({ error: "Credenciales incorrectas" });
  } catch (err) {
    console.error("Error en la consulta:", err);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});
// Ruta PUT para actualizar la información de un profesor específico
app.put("/api/profesores/:ci_profesor", async (req, res) => {
  const { ci_profesor } = req.params;
  const { total_tiempo_visita, ubicacion_visita } = req.body;

  try {
    const [result] = await DB.query(
      "UPDATE profesores SET total_tiempo_visita = ?, ubicacion_visita = ? WHERE ci_profesor = ?",
      [total_tiempo_visita, ubicacion_visita, ci_profesor]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Datos del profesor actualizados exitosamente." });
  } catch (err) {
    console.error("Error al actualizar los datos del profesor:", err);
    res
      .status(500)
      .json({ error: "Error al actualizar los datos del profesor." });
  }
});
// Ruta PUT para actualizar la información de un estudiante específico
app.put("/api/estudiantes/:ci_estudiante", async (req, res) => {
  const { ci_estudiante } = req.params;
  const { horas_totales } = req.body;

  try {
    const [result] = await DB.query(
      "UPDATE estudiantes SET horas_totales = ? WHERE ci_estudiante = ?",
      [horas_totales, ci_estudiante]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Horas de vinculación actualizadas exitosamente." });
  } catch (err) {
    console.error("Error al actualizar las horas de vinculación:", err);
    res
      .status(500)
      .json({ error: "Error al actualizar las horas de vinculación." });
  }
});
// Ruta GET para obtener todos los estudiantes
app.get("/api/estudiantes", async (req, res) => {
  try {
    const [estudiantes] = await DB.query("SELECT * FROM estudiantes");
    res.json(estudiantes);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

// Ruta POST para agregar un nuevo estudiante
app.post("/api/estudiantes", async (req, res) => {
  const {
    ci_estudiante,
    primer_nombre,
    primer_apellido,
    entidad_beneficiaria,
    carrera,
    rol,
    periodo_academico,
    email,
    contrasenia,
  } = req.body;

  try {
    const [result] = await DB.query(
      "INSERT INTO estudiantes (ci_estudiante, primer_nombre, primer_apellido, entidad_beneficiaria, carrera, rol, periodo_academico, email, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        ci_estudiante,
        primer_nombre,
        primer_apellido,
        entidad_beneficiaria,
        carrera,
        rol,
        periodo_academico,
        email,
        contrasenia,
      ]
    );

    res.status(201).json({ message: "Estudiante registrado exitosamente." });
  } catch (err) {
    console.error("Error al registrar el estudiante:", err);
    res.status(500).json({ error: "Error al registrar el estudiante." });
  }
});

// Ruta POST para agregar un nuevo profesor
app.post("/api/profesores", async (req, res) => {
  const {
    ci_profesor,
    ci_estudiante,
    primer_nombre,
    primer_apellido,
    rol,
    email,
    contrasenia,
  } = req.body;

  try {
    const [result] = await DB.query(
      "INSERT INTO profesores (ci_profesor, ci_estudiante, primer_nombre, primer_apellido, rol, email, contrasenia) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        ci_profesor,
        ci_estudiante,
        primer_nombre,
        primer_apellido,
        rol,
        email,
        contrasenia,
      ]
    );

    res.status(201).json({ message: "Profesor registrado exitosamente." });
  } catch (err) {
    console.error("Error al registrar el profesor:", err);
    res.status(500).json({ error: "Error al registrar el profesor." });
  }
});

// Conectar a la base de datos y luego iniciar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
});
