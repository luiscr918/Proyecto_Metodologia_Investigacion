import { Link } from "react-router-dom"


export const MainForm = () => {
    return (
        <>
            <h1>este será el main y desde aqui se mandará bien sea a la seccion de alumnos o profesores</h1>
            <Link to='/profesores' className="text-blue-500">ir a profesores</Link>
            <br />
            <Link to='/estudiantes' className="text-blue-500" >ir a estudiantes</Link>
        </>
    )
}
