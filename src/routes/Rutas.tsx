import { Routes, Route } from 'react-router-dom';
import { MainForm } from '../pages/MainForm';

import { Estudiantes } from '../pages/Estudiantes';
import { Profesores } from '../pages/Profesores';
import { Admin } from '../pages/Admin';


const AppRoutes = () => {
  return (
    <Routes >
      {/**aqui como es la raiz se pone la pagina principal */}
      <Route path="/" element={<MainForm />} />
      <Route path='/estudiantes' element={<Estudiantes />} />
      <Route path='/profesores' element={<Profesores />} />
      <Route path='/admin' element={<Admin />} />

    </Routes>
  );
};

export default AppRoutes;
