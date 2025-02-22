interface Props {
    carrera: string | undefined;
}

export const IconPageEstudiante = ({ carrera }: Props) => {
    const buscarImagen = (): string => {
        let ruta: string;
        if (carrera === 'Desarrollo de Software') {
            ruta = '/src/assets/imgs/iconSoftware.jpg';
        } else if (carrera === 'Estética') {
            ruta = '/src/assets/imgs/iconEstetica.jpeg';
        } else if (carrera === 'Redes y Telecomunicaciones') {
            ruta = '/src/assets/imgs/iconRedes.jpeg';
        } else {
            ruta = '/src/assets/imgs/iconEnfermeria.jpeg';
        }
        return ruta;
    }
    return (
        <div className="flex justify-center">
            <img className="rounded-full w-60 h-60 shadow-lg"
                src={buscarImagen()} alt="image description" />
        </div>
    )
}
