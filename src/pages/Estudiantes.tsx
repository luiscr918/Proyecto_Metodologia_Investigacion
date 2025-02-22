import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//no borrar esto, es lo que me permite obtener datos del profesor desde  la DB
interface Estudiante {
  ci_estudiante: string;
  email: string;
  contrasenia: string;
  primer_nombre: string
  primer_apellido: string;
  horas_totales: string;
  entidad_beneficiaria: string;
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
  //use navigate para regresar al main
  const navigate = useNavigate();
  const returnHome = () => {
    navigate('/')
  }
  return (
    <>
      <header className="bg-gray-900 text-white py-4 px-6 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl font-bold">Estudiantes</h1>
        <Link to={'/'}>
          <img src="/src/assets/imgs/logoStudents.png" alt="Logo" className="h-15 w-45 " />
        </Link>
      </header>

      <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <form className="space-y-4">
          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-32">Nombre:</label>
            <input type="text" readOnly
              value={estudiante?.primer_nombre.concat(' ', estudiante.primer_apellido)}
              className="flex-1 p-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
          </div>

          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-32">Carrera:</label>
            <input type="text" readOnly
              className="flex-1 p-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
          </div>

          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-32">Entidad Beneficiaria:</label>
            <input type="text" readOnly
              value={estudiante?.entidad_beneficiaria}
              className="flex-1 p-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
          </div>

          <div className="flex items-center">
            <label className="text-lg font-semibold text-gray-700 w-32">Horas Totales Completadas:</label>
            <input type="text" readOnly
              className="flex-1 p-3 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
          </div>

          <button type="button"
            onClick={returnHome}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-blue-ring-blue-900 transition">
            Back to Home
          </button>
        </form>
      </div>
    </>
  );
};
