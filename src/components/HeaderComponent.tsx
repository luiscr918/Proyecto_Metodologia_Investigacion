import { Link } from "react-router-dom"
interface Props {
  title: string;
}

export const HeaderComponent = ({title}:Props) => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Link to={'/'}>
        <img src="/src/assets/imgs/logoStudents.png" alt="Logo" className="h-15 w-45 " />
      </Link>
    </header>
  )
}
