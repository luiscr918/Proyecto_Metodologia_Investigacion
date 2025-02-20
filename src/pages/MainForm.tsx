import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
interface Login {
    email: string;
    password: string;
}

export const MainForm = () => {
    //hook useState para mostrar u ocultar la constrasenia
    const [showPassword, setShowpassword] = useState<boolean>(false);
    //navigate para navegar entre paginas
    const navigate = useNavigate();
    //usando useState para manejar inputs
    const [form, setForm] = useState<Login>({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>("");
    //funcion para el cambio de valores del input
    const handleChangeForm = (name: string, value: string): void => {
        setForm({ ...form, [name]: value });
    }


    //Inicio de sesion
    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault(); // Evitar recarga de página
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, contrasenia: form.password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Guardar usuario
                if (data.user.rol === "estudiante") {
                    localStorage.setItem("ci_estudiante", data.user.ci_estudiante); // Guardar CI del estudiante
                    navigate("/estudiantes");
                } else if (data.user.rol === "profesor") {
                    localStorage.setItem("ci_profesor", data.user.ci_profesor); // Guardar CI del profesor
                    navigate("/profesores");
                }
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Error de conexión con el servidor.");
        }

    }


    return (
        <div className='fondoMaster'>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <form className="space-y-4 md:space-y-6 relative" onSubmit={loginUser}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email"
                                        onChange={(e) => handleChangeForm('email', e.target.value)}
                                        className="transition-all duration-300 hover:bg-blue-100  bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type={showPassword ? 'password' : 'text'}
                                        onChange={(e) => handleChangeForm('password', e.target.value)}
                                        name="password" id="password" placeholder="••••••••"
                                        className="transition-all duration-300 hover:bg-blue-100  bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    {/* //botoncito de mostrar contraseña */}

                                    <button
                                        type="button"
                                        className=" absolute right-5 bottom-1/3 transform translate-y-1/4  text-gray-500"
                                        onClick={() => setShowpassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-6 h-6" />
                                        ) : (
                                            <EyeIcon className="w-6 h-6 " />
                                        )}

                                    </button>

                                </div>

                                <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                                  font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-500 dark:bg-blue-700
                                 dark:hover:bg-blue-400 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
