import { Route, Routes } from "react-router-dom"
import { Hola } from "../Hola"


export const NavBarRutas = () => {
    return (
        <Routes>
            <Route path="hola" element={<Hola />} />
        </Routes>
    )
}
