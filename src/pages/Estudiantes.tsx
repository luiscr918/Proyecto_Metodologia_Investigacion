import { useEffect, useState } from "react"
//no borrar esto, es lo que me permite obtener datos del profesor desde  la DB
interface Estudiante {
  ci_estudiante: string;
  email: string;
  contrasenia: string;
  primer_nombre: string
  primer_apellido: string;
}
export const Estudiantes = () => {

//DESDE AQUI TAMPOCO BORRAR
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  // Método para obtener el estudiante que ha iniciado sesión
  const fetchEstudiante = async () => {
    const ci_estudiante = localStorage.getItem("ci_estudiante"); // Obtener el ID del estudiante logueado

    if (!ci_estudiante) {
      console.log("No hay estudiante logueado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/estudiantes/${ci_estudiante}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
      const data = await response.json();
      setEstudiante(data);
    } catch (error) {
      console.log("Error al obtener el estudiante:", error);
    }
  };
  // useEffect para obtener los datos al cargar la página
  useEffect(() => {
    fetchEstudiante();
  }, []);
//HASTA AQUI A PARTIR DE AQUI SI HACER LO QUE SEA

  return (
    <div className="container m-5">
      <h1>Datos del Estudiante</h1>
      {estudiante
        ?
        (
          <div className="card">
            <h3>{estudiante.ci_estudiante}</h3>
            <h3>{estudiante.primer_nombre} {estudiante.primer_apellido}</h3>
            <p>Email: {estudiante.email}</p>
          </div>
        )
        :
        (
          <p>Cargando información del estudiante...</p>
        )}
    </div>
  );
};
