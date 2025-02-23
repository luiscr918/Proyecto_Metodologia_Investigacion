import { useEffect, useState } from "react"
import { FooterComponent } from "../components/FooterComponent";
import { Link } from "react-router-dom";
import axios from "axios";


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
  //para la ubicacion
  const [ubicacion, setUbicacion] = useState<string>('');
  const [error, setError] = useState<string>('');
  const API_KEY = '97939a9d8984473087efe91bfb06f64d'; // Sustituye con tu clave de API de OpenCage
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
  // Método para obtener la ubicación
  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Realizar la geocodificación inversa con la API de OpenCage
          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            );
            if (response.data.status.code === 200) {
              const direccion = response.data.results[0].formatted;
              setUbicacion(direccion);
            } else {
              setError('No se pudo obtener la dirección');
            }
          } catch (error) {
            setError('Error al obtener la dirección');
          }
        },
        (err) => {
          setError('No se pudo obtener la ubicación');
        }
      );
    } else {
      setError('La geolocalización no es compatible con este navegador');
    }
  };
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-full p-6 bg-gray-900 shadow-md">
          <div >
            <div className="flex flex-row gap-4 ">
              <p className="text-lg font-semibold text-white ">PERIODO ACADÉMICO</p>
              <input type="text" className="bg-white pl-2" readOnly
              />
            </div>
            <br />
            <div className="flex flex-row gap-4">
              <p className="text-lg text-white mr-4 ">NOMBRE DEL TUTOR</p>
              <input type="text" className="bg-white pl-2" readOnly
                value={profesor?.primer_nombre.concat(' ', profesor.primer_apellido)}
              />
            </div>

          </div>


          <div className="flex justify-center">
            <Link to={'/'}>
              <img className="h-16" src="/src/assets/imgs/logoStudents.png" alt="Logo ITSQMET" />
            </Link>
          </div>
        </div>
        <div className="w-full max-w-lg p-6 mt-6 bg-white shadow-lg rounded-lg">
          <form action="/validar" method="post">
            <h4 className="text-center text-xl font-bold text-gray-700 mb-6">Registro de Prácticas Vinculación</h4>
            <div className="mb-4">
              <label htmlFor="entidadB" className="block text-gray-700 font-semibold mb-1">Estudiante Asignado:</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="eB" id="entidadB" />
            </div>

            <div className="mb-4">
              <label htmlFor="entidadB" className="block text-gray-700 font-semibold mb-1">Entidad Beneficiaria:</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="eB" id="entidadB" />
            </div>
            <div className="mb-4">
              <label htmlFor="ubicacion" className="block text-gray-700 font-semibold mb-1">Ubicación:</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                name="ubicacion"
                id="ubicacion"
                value={ubicacion}
                readOnly
              />
              <button
                type="button"
                className="mt-2 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                onClick={obtenerUbicacion}
              >
                Obtener Ubicación
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="horaI" className="block text-gray-700 font-semibold mb-1">Hora de Inicio de la visita:</label>
              <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hI" id="horaI" />
            </div>

            <div className="mb-4">
              <label htmlFor="horaF" className="block text-gray-700 font-semibold mb-1">Hora Final de la visita:</label>
              <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hF" id="horaF" />
            </div>


            <div className="mb-4">
              <label htmlFor="horaFV" className="block text-gray-700 font-semibold mb-1">Tiempo total de  Visita:</label>
              <input type="time" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="hFv" id="horaFV" />
            </div>
            <div className="mb-4">
              <label htmlFor="entidadB" className="block text-gray-700 font-semibold mb-1">Registro de horas de vinculación:</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="eB" id="entidadB" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
              Registrar
            </button>
          </form>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}
