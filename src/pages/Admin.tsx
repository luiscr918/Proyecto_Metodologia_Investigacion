import { useEffect, useState } from "react";
import { FooterComponent } from "../components/FooterComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { Estudiante } from "./Estudiantes";

export const Admin = () => {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
    const [cedulaSeleccionada, setCedulaSeleccionada] = useState("");

    // Método para obtener la lista de estudiantes
    const fetchEstudiantes = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/estudiantes");
            if (!response.ok) {
                throw new Error("Error al obtener los datos del servidor");
            }
            const data = await response.json();
            setEstudiantes(data);
        } catch (error) {
            console.log("Error al obtener los estudiantes:", error);
        }
    };

    // useEffect para obtener los datos al cargar la página
    useEffect(() => {
        fetchEstudiantes();
    }, []);

    // Manejar selección
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCedulaSeleccionada(event.target.value);
    };

    // Manejar envío del formulario de estudiante
    const handleSubmitEstudiante = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            ci_estudiante: formData.get("ciE"),
            primer_nombre: formData.get("nE"),
            primer_apellido: formData.get("aE"),
            entidad_beneficiaria: formData.get("eB"),
            carrera: formData.get("carr"),
            rol: formData.get("rE"),
            periodo_academico: formData.get("pA"),
            email: formData.get("emailEs"),
            contrasenia: formData.get("passwordEs"),
        };

        try {
            const response = await fetch("http://localhost:3001/api/estudiantes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Estudiante registrado exitosamente.");
                fetchEstudiantes(); // Actualizar la lista de estudiantes
            } else {
                throw new Error("Error al registrar el estudiante");
            }
        } catch (error) {
            console.error("Error al registrar el estudiante:", error);
            alert("Error al registrar el estudiante");
        }
    };

    // Manejar envío del formulario de profesor
    const handleSubmitProfesor = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            ci_profesor: formData.get("ciP"),
            ci_estudiante: cedulaSeleccionada,
            primer_nombre: formData.get("nP"),
            primer_apellido: formData.get("apellP"),
            rol: formData.get("rP"),
            email: formData.get("eP"),
            contrasenia: formData.get("pasP"),
        };

        try {
            const response = await fetch("http://localhost:3001/api/profesores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Profesor registrado exitosamente.");
                fetchEstudiantes(); // Actualizar la lista de estudiantes
            } else {
                throw new Error("Error al registrar el profesor");
            }
        } catch (error) {
            console.error("Error al registrar el profesor:", error);
            alert("Error al registrar el profesor");
        }
    };

    return (
        <>
            <HeaderComponent title="Welcome Admin" />
            <h1 className="text-2xl font-bold mt-1 mb-6 text-center">Registration Page</h1>
            <div className="container mx-auto py-8">
                {/* form para añadir nuevo estudiante */}
                <h1 className="text-2xl font-bold mb-6 text-center">Registration Form to Student</h1>
                <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" onSubmit={handleSubmitEstudiante}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciE">Cedula</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="ciE" name="ciE" placeholder="1745...." />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameE">Nombre</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="nameE" name="nE" placeholder="firstname" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellidoE">Apellido</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="apellidoE" name="aE" placeholder="lastname" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entidadB">Entidad Beneficiaria</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="entidadB" name="eB" placeholder="Empresa.." />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carrera">Carrera</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="carrera" name="carr">
                            <option value="">Seleccione...</option>
                            <option value="Desarrollo de Software">Desarrollo de Software</option>
                            <option value="Estética">Estética</option>
                            <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                            <option value="Enfermería">Enfermería</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rolE">Rol</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={'estudiante'}
                            type="text" id="rolE" name="rE" readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pAc">Periodo Académico</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="pAc" name="pA" placeholder="2024-2025" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailE">Email</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email" id="emailE" name="emailEs" placeholder="john@example.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordE">Password</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="passwordE" name="passwordEs" placeholder="********" />
                    </div>

                    <button
                        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        type="submit">Register</button>
                </form>
                <br />
                <h1 className="text-2xl font-bold mb-6 text-center">Registration Form to Teacher</h1>
                {/* //form para añadir nuevo profesor */}
                <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md m-11" onSubmit={handleSubmitProfesor}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciP">Cedula</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="ciP" name="ciP" placeholder="1715...." />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="esAsig">Estudiante Asignado</label>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-gray-700">Selecciona un estudiante:</label>
                            <select
                                className="p-2 border rounded-md"
                                value={cedulaSeleccionada}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione...</option>
                                {estudiantes.map((est) => (
                                    <option key={est.ci_estudiante} value={est.ci_estudiante}>
                                        {est.primer_nombre.concat(' ', est.primer_apellido)}
                                    </option>
                                ))}
                            </select>
                            {cedulaSeleccionada && (
                                <p className="text-sm text-gray-500">Cédula seleccionada: {cedulaSeleccionada}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameP">Nombre</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="nameP" name="nP" placeholder="firstname" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apP">Apellido</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="apP" name="apellP" placeholder="lastname" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rolP">Rol</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={'profesor'}
                            type="text" id="rolP" name="rP" placeholder="John Doe" readOnly />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailP">Email</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email" id="emailP" name="eP" placeholder="john@example.com" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordP">Password</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="passwordP" name="pasP" placeholder="********" />
                    </div>

                    <button
                        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        type="submit">Register</button>
                </form>
            </div>
            <FooterComponent />
        </>
    );
};
