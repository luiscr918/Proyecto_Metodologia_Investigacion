

export const Profesores = () => {
  return (
    <>
      <div className="contenedor-principal">
        <div className="contenedor-info">
          <p >PERIODO ACADEMICO</p>
          <p>TUTOR PROF.</p>

        </div>
        <div className="contenedor-logo">
          <img className="logo-img" src="/src/assets/imgs/logoPageProf.png" alt="Logo ITSQMET" />
        </div>
      </div>
      {'\n'}
      {'\n'}
      <div className="container">
        <div className="registro-container mx-auto">
          <form className="mx-auto" action="/validar" method="post">
            <h4 className="text-center textF">Registro de Prácticas Vinculación</h4>
            <div className="mb-3 mt-3">
              <label htmlFor="nombre" className="form-label tituloF">Hora inicio:</label>
              <input type="number" className="form-control" name="hI" id="horaI" />
            </div>
            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Hora Final: </label>
              <input type="number" className="form-control" name="hF" id="HoraF" />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Entidad Beneficiaria: </label>
              <input type="text" className="form-control" name="eB" id="entidadB" />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label tituloF">Hora Final Visita: </label>
              <input type="number" className="form-control" name="hFv" id="horaFV" />
            </div>
            {'\n'}
            <input type="submit" className="btn-primary" value="Registrar" />
            {'\n'}

          </form>
        </div>
      </div>
    </>
  )
}
