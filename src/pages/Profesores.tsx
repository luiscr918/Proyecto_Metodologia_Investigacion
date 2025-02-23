import { useEffect, useState } from "react";
import { FooterComponent } from "../components/FooterComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import { Estudiante } from "./Estudiantes";

//no borrar esto, es lo que me permite obtener datos del profesor desde la DB
interface Profesor {
  ci_profesor: string;
  ci_estudiante: string;
  email: string;
  contrasenia: string;
  primer_nombre: string;
  primer_apellido: string;
}

export const Profesores = () => {
  //Manejo de datos de Estudiante asignado
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  //para el calculo de horas
  const [horaInicio, setHoraInicio] = useState<string>('');
  const [horaFin, setHoraFin] = useState<string>('');
  const [tiempoTotal, setTiempoTotal] = useState<number | null>(null);
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
  // useEffect para obtener los datos del profesor al cargar la página
  useEffect(() => {
    fetchProfesor();
  }, []);

  // Nuevo useEffect para obtener los datos del estudiante cuando `profesor` cambie
  useEffect(() => {
    const fetchEstudiante = async () => {
      if (profesor?.ci_estudiante) {
        try {
          const response = await fetch(`http://localhost:3001/api/estudiantes/${profesor.ci_estudiante}`);
          if (!response.ok) {
            throw new Error("Error al obtener los datos del estudiante");
          }
          const data = await response.json();
          setEstudiante(data);
        } catch (error) {
          console.log("Error al obtener el Estudiante:", error);
        }
      }
    };
    fetchEstudiante();
  }, [profesor]); // Se ejecuta cada vez que `profesor` cambie
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
        () => {
          setError('No se pudo obtener la ubicación');
        }
      );
    } else {
      setError('La geolocalización no es compatible con este navegador');
    }
  };
  //funcion para calculo de horas
  const calcularTiempoTotal = () => {
    if (horaInicio && horaFin) {
      // Convertir las horas de inicio y fin a números
      const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
      const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

      // Calcular la diferencia en horas y minutos
      let diferenciaHoras = horaFinHoras - horaInicioHoras;
      let diferenciaMinutos = horaFinMinutos - horaInicioMinutos;

      // Ajustar las horas y minutos si los minutos son negativos
      if (diferenciaMinutos < 0) {
        diferenciaHoras -= 1;
        diferenciaMinutos += 60;
      }

      // Convertir la diferencia a horas en formato decimal
      const horasDecimales = diferenciaHoras + (diferenciaMinutos / 60);

      // Actualizar el estado del tiempo total
      setTiempoTotal(parseFloat(horasDecimales.toFixed(2)));
    } else {
      setTiempoTotal(null);
    }
  };
  //Usa un useEffect para llamar a la función calcularTiempoTotal cada vez que cambien horaInicio o horaFin.
  useEffect(() => {
    calcularTiempoTotal();
  }, [horaInicio, horaFin]);
  //funcion para editar informacion en la tabla de profesores BD
  const handleSubmitProfesor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tiempoTotal || !ubicacion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/profesores/${profesor?.ci_profesor}`, {
        total_tiempo_visita: tiempoTotal,
        ubicacion_visita: ubicacion,
      });

      if (response.status === 200) {
        alert("Datos del profesor actualizados exitosamente.");
      }
    } catch (error) {
      const err = error as any;
      console.error("Error al actualizar los datos del profesor:", err.response ? err.response.data : err.message);
      alert(`Hubo un error al actualizar los datos del profesor frontend: ${err.response ? err.response.data.error : err.message}`);
    }
  };
  //funcion para editar informacion de la tabla de estudiantes BD
  const handleSubmitEstudiante = async (e: React.FormEvent) => {
    e.preventDefault();

    const horasVinculacion = e.currentTarget.querySelector<HTMLInputElement>('input[name="horasVinculacion"]')?.value;

    if (!horasVinculacion) {
      alert("Por favor, ingresa las horas de vinculación.");
      return;
    }

    // Convertir el valor a número
    const horasVinculacionNumero = parseFloat(horasVinculacion);

    if (isNaN(horasVinculacionNumero)) {
      alert("Por favor, ingresa un valor numérico válido.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/estudiantes/${estudiante?.ci_estudiante}`, {
        horas_totales: horasVinculacionNumero, // Enviar el valor convertido a número
      });

      if (response.status === 200) {
        alert("Horas de vinculación actualizadas exitosamente.");
      }
    } catch (error) {
      const err = error as any;
      console.error("Error al actualizar las horas de vinculación:", err.response ? err.response.data : err.message);
      alert(`Hubo un error al actualizar las horas de vinculación: ${err.response ? err.response.data.error : err.message}`);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-full p-6 bg-gray-900 shadow-md">
          <div >
            <div className="flex flex-row gap-4 ">
              <p className="text-lg font-semibold text-white ">PERIODO ACADÉMICO</p>
              <input value={estudiante?.periodo_academico}
                type="text" className="bg-white pl-2" readOnly name="periodoAcademico" id="periodoAcademico"
              />
            </div>
            <br />
            <div className="flex flex-row gap-4">
              <p className="text-lg text-white mr-4 ">NOMBRE DEL TUTOR</p>
              <input type="text" className="bg-white pl-2" readOnly
                value={profesor?.primer_nombre.concat(' ', profesor.primer_apellido)} name="nombreTutor" id="nombreTutor"
              />
            </div>

          </div>


          <div className="flex justify-center">
            <Link to={'/'}>
              <img className="h-16" src="/src/assets/imgs/logoStudents.png" alt="Logo ITSQMET" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full max-w-lg p-6 mt-6 bg-white shadow-lg rounded-lg lg:mr-16">
            <form onSubmit={handleSubmitProfesor} >
              <h4 className="text-center text-xl font-bold text-gray-700 mb-6">Registro de Prácticas Vinculación/Profesor</h4>
              <div className="mb-4">
                <label htmlFor="estudianteAsignado" className="block text-gray-700 font-semibold mb-1" >Estudiante Asignado:</label>
                <input type="text"
                  value={estudiante?.primer_nombre.concat(' ', estudiante.primer_apellido)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" readOnly name="estudianteAsignado" id="estudianteAsignado" />
              </div>

              <div className="mb-4">
                <label htmlFor="ubicacion" className="block text-gray-700 font-semibold mb-1" >Ubicación:</label>
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
                <label htmlFor="horaInicio" className="block text-gray-700 font-semibold mb-1">Hora de Inicio de la visita:</label>
                <input type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="horaInicio" id="horaInicio" />
              </div>

              <div className="mb-4">
                <label htmlFor="horaFin" className="block text-gray-700 font-semibold mb-1">Hora Final de la visita:</label>
                <input type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="horaFin" id="horaFin" />
              </div>


              <div className="mb-4">
                <label htmlFor="horaFV" className="block text-gray-700 font-semibold mb-1">Tiempo total de  Visita:</label>
                <input type="number"
                  value={tiempoTotal || ''}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" name="horaFV" id="horaFV" readOnly />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                Registrar
              </button>
            </form>
          </div>
          <div className="w-full max-w-lg p-6 mt-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmitEstudiante} >
              <h4 className="text-center text-xl font-bold text-gray-700 mb-6">Registro de Prácticas Vinculación/Estudiante</h4>

              <div className="mb-4">
                <label htmlFor="ciEstudiante" className="block text-gray-700 font-semibold mb-1">Cédula del estudiante:</label>
                <input
                  type="text"
                  value={estudiante?.ci_estudiante}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  name="ciEstudiante"
                  id="ciEstudiante"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="entidadBeneficiaria" className="block text-gray-700 font-semibold mb-1">Entidad Beneficiaria:</label>
                <input
                  type="text"
                  value={estudiante?.entidad_beneficiaria}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  readOnly
                  name="entidadBeneficiaria"
                  id="entidadBeneficiaria"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="horasVinculacion" className="block text-gray-700 font-semibold mb-1">Registro de horas de vinculación:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  name="horasVinculacion"
                  id="horasVinculacion"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}
