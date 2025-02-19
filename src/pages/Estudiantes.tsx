import { useEffect, useState } from "react"


export const Estudiantes = () => {
  interface Estudiante {
    ci_estudiante: string;
    email: string;
    contrasenia: string;
    primer_nombre: string
    primer_apellido: string;
  }

  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  //metodo para hacer un fetch al servidor
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/estudiantes');
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      const data = await response.json();
      setEstudiantes(data);
    } catch (error) {
      console.log('Error al obtener los estudiantes')
    }
  }
  //useEffect para gestionar la peticion del servidor
  useEffect(() => {
    fetchEstudiantes();

  }, []);
  console.log(estudiantes)

  return (
    <div className="container m-5">
      <h1>Lista estudiante</h1>
      <div className="container">
        {estudiantes.map((elemento) => (
          <div className="card" key={elemento.ci_estudiante}>
            <h3>{elemento.ci_estudiante}</h3>
            <h3>{elemento.primer_nombre.concat(' ', elemento.primer_apellido)}</h3>

          </div>))

        }

      </div>
      <hr />
    </div>
  )
}
