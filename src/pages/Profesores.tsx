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
      <div className="contenedor-principal">
        <div className="contenedor-info">
          <p >PERIODO ACADEMICO</p>
          <p>TUTOR PROF.</p>

        </div>
        <div className="contenedor-logo">
          <img className="logo-img" src="/src/assets/imgs/logoPageProf.png" alt="Logo ITSQMET" />
        </div>
      </div>
      {'\n'}
      {'\n'}
      <div className="container">
        <div className="registro-container mx-auto">
          <form className="mx-auto" action="/validar" method="post">
            <h4 className="text-center textF">Registro de Prácticas Vinculación</h4>
            <div className="mb-3 mt-3">
              <label htmlFor="nombre" className="form-label tituloF">Hora inicio:</label>
              <input type="number" className="form-control" name="hI" id="horaI" />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Hora Final: </label>
              <input type="number" className="form-control" name="hF" id="HoraF" />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Entidad Beneficiaria: </label>
              <input type="text" className="form-control" name="eB" id="entidadB" />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Hora Final Visita: </label>
              <input type="number" className="form-control" name="hFv" id="horaFV" />
            </div>
            {'\n'}
            <input type="submit" className="btn-primary" value="Registrar" />
            {'\n'}

          </form>
        </div>
      </div>
    </>
  )
}
