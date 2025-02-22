import { useEffect, useState } from "react"
//no borrar esto, es lo que me permite obtener datos del profesor desde  la DB
interface Profesor {
  ci_profesor: string;
  ci_estudiante: string;
  email: string;
  contrasenia: string;
  primer_nombre: string
  primer_apellido: string;
}

export const Profesores = () => {
//DESDE AQUI TAMPOCO BORRAR
  const [profesor, setProfesor] = useState<Profesor | null>(null);
  // Método para obtener el profesor que ha iniciado sesión
  const fetchProfesor = async () => {
    const ci_profesor = localStorage.getItem("ci_profesor"); // Obtener el ID del profesor logueado

    if (!ci_profesor) {
      console.log("No hay profesor logueado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/profesores/${ci_profesor}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
      const data = await response.json();
      setProfesor(data);
    } catch (error) {
      console.log("Error al obtener el Profesor:", error);
    }
  };
  // useEffect para obtener los datos al cargar la página
  useEffect(() => {
    fetchProfesor();
  }, []);
//HASTA AQUI A PARTIR DE AQUI SI HACER LO QUE SEA
  return (
    <>
      <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full p-6 bg-black shadow-md">
        <div>
          <p className="text-lg font-semibold text-white">PERIODO ACADÉMICO</p>
          <p className="text-lg text-white ">TUTOR PROF.</p>
        </div>
        <div>
          <img className="h-16" src="/src/assets/imgs/logoPageProf.png" alt="Logo ITSQMET" />
        </div>
      </div>
      <div className="w-full max-w-lg p-6 mt-6 bg-white shadow-lg rounded-lg">
        <form action="/validar" method="post">
          <h4 className="text-center text-xl font-bold text-gray-700 mb-6">Registro de Prácticas Vinculación</h4>

          <div className="mb-4">
            <label htmlFor="horaI" className="block text-gray-700 font-semibold mb-1">Hora Inicio:</label>
            <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hI" id="horaI" />
          </div>

          <div className="mb-4">
            <label htmlFor="horaF" className="block text-gray-700 font-semibold mb-1">Hora Final:</label>
            <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hF" id="horaF" />
          </div>

          <div className="mb-4">
            <label htmlFor="entidadB" className="block text-gray-700 font-semibold mb-1">Entidad Beneficiaria:</label>
            <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="eB" id="entidadB" />
          </div>

          <div className="mb-4">
            <label htmlFor="horaFV" className="block text-gray-700 font-semibold mb-1">Hora Final Visita:</label>
            <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hFv" id="horaFV" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            Registrar
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
