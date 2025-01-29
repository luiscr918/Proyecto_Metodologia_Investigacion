import { Routes, Route } from 'react-router-dom';
import { MainForm } from '../pages/MainForm';
import { NavBarRutas } from './NavBarRutas';
import { Estudiantes } from '../pages/Estudiantes';
import { Profesores } from '../pages/Profesores';


const AppRoutes = () => {
  return (
    <Routes>
      {/**aqui como es la raiz se pone la pagina principal */}
      <Route path="/" element={<MainForm />} />
      {/* aqui van todas mis rutitas de la barra de navegacion*/}
      {/* <Route path="/navbar/*" element={<NavBarRutas />} /> */}
      
      <Route path='/estudiantes' element={<Estudiantes/>}/>
      <Route path='/profesores' element={<Profesores/>}/>

    </Routes>
  );
};

export default AppRoutes;
