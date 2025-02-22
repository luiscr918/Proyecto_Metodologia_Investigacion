
export const FooterComponent = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 text-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-2xl font-semibold">ITSQMET</h2>
                    <p className="mt-2">
                        &copy; <span className="text-yellow-500">2025</span>. Todos los derechos reservados.{' '}
                        <span className="text-yellow-500">ITSQMET</span>.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://www.facebook.com/@ITSQMET.UIO" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <i className="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://www.instagram.com/itsqmet/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="https://www.twitter.com/itsqmet/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <i className="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="https://www.tiktok.com/@itsqmet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <i className="fab fa-tiktok text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
