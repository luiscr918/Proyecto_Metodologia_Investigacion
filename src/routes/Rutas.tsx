import { Routes, Route } from 'react-router-dom';
import { MainForm } from '../pages/MainForm';
import { NavBarRutas } from './NavBarRutas';


const AppRoutes = () => {
  return (
    <Routes>
      {/**aqui como es la raiz se pone la pagina principal */}
      <Route path="/" element={<MainForm />} />
      {/* aqui van todas mis rutitas de la barra de navegacion*/}
      <Route path="/navbar/*" element={<NavBarRutas />} />

    </Routes>
  );
};

export default AppRoutes;
