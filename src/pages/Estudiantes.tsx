import { useEffect, useState } from "react"
//no borrar esto, es lo que me permite obtener datos del profesor desde  la DB
interface Estudiante {
  ci_estudiante: string;
  email: string;
  contrasenia: string;
  primer_nombre: string
  primer_apellido: string;
  horas_totales:string;
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
    <>
<header className="bg-blue-900 text-white py-4 px-6 shadow-lg flex items-center justify-between">
  <h1 className="text-3xl font-bold">Estudiantes</h1>
  <img src="/src/assets/imgs/logoPageProf.png" alt="Logo" className="h-20 w-20"/>
</header>

<div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
  <form className="space-y-4">
    <div className="flex items-center">
      <label className="text-lg font-semibold text-gray-700 w-32">Nombre:</label>
      <input type="text" placeholder="Ingrese su nombre" 
        className="flex-1 p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
    </div>

    <div className="flex items-center">
      <label className="text-lg font-semibold text-gray-700 w-32">Carrera:</label>
      <input type="text" placeholder="Ingrese su carrera" 
        className="flex-1 p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
    </div>

    <div className="flex items-center">
      <label className="text-lg font-semibold text-gray-700 w-32">Entidad:</label>
      <input type="text" placeholder="Entidad Beneficiaria" 
        className="flex-1 p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
    </div>

    <div className="flex items-center">
      <label className="text-lg font-semibold text-gray-700 w-32">Horas:</label>
      <input type="number" placeholder="Horas completadas" 
        className="flex-1 p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"/>
    </div>
    
    <button type="submit" 
      className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
      Enviar
    </button>
  </form>
</div>


</>

  );
  
  
};
