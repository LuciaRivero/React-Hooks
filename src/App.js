
import React, { useState, useEffect, Fragment } from 'react';


function Cita({cita, index, eliminarCita}) { //destructoring

  return (
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas:<span>{cita.sintomas}</span></p>
      <button type="button" 
        onClick={() => eliminarCita(index)}
      className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )}
function Formulario({crearCita}) {
  //state local del formulario inicial
  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha:"",
    hora:"",
    sintomas:""
  }

  //cita = state actual
  //actualizarCita = fn para cambiar el state
  const [cita, actualizarCita] = useState(stateInicial);

  const actualizarState = (e) => {
    //actualiza el state
    actualizarCita({
      ...cita, //tomo una copia de una cita actual
      [e.target.name] : e.target.value
    })
  }

  //pasamos la cita al componente principal (app)
  const enviarCita = (e) => {
    e.preventDefault();
    //pasar la cita hacia el componente principal
    crearCita(cita)
    //reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial)
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={enviarCita}>
        <label>Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora"
          onChange={actualizarState}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
  </Fragment>
  );
}

function App() {
  //cargar las citas de local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    //si hay algo en el local storage el valor se mantiene y si no hay se crea un objeto vacio.
      if(!citasIniciales) {
        citasIniciales = [];
      } 
  //useState retorna 2 funciones (dos piezas)
  //el  state actual = this.state;
  //funcion que actualiza el state this.setState();

  const [citas, guardarCita] = useState(citasIniciales); // [] es para valor inicial, en este caso se modifica para mantener los valores ya almacenados en local storage.

  //agregar las nuevas citas al state

  const crearCita = cita =>  {
    //tomar una copia del state y agregar la cita

    const nuevasCitas = [... citas, cita];

    //almacenamos en el state

    guardarCita(nuevasCitas);

  }
 
  //elimina las citas del state
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas]; //spred operator

    nuevasCitas.splice(index, 1) //quito elemento del state

    guardarCita(nuevasCitas);
  }

  //useEffect
  //se ejecuta cuando inicia la app o cuando se modifica algo; reemplaza a lo que es componentDidMount y componentDidUpdate.
  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if(citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([])); // se ejecuta la primera vez, que no existe citas en local storage, la siguiente vez ya existe el arreglo vacio y toma lo del state y lo convierte en string.
      }
    }, [citas] // se ejecuta el useeffect solo cuando las citas tengan un cambio.
  ) 
    

  //cargar dinamicamente un titulo

  const titulo = Object.keys(citas).length === 0? "No hay citas" : "administrar las citas"; //object key no retorna valores solo las posiciones y es una buena forma de verificar si el arreglo esta vacio.

  return(
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
          <div className="row">
            <div className="one-half column">
            <Formulario
            crearCita={crearCita}/>
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map((cita, index) => (
                <Cita
                 key={index}
                 index={index}
                 cita={cita}
                 eliminarCita={eliminarCita}
                 />
              ))}
            </div>
          </div>
      </div>
    </Fragment>
    
  );
}

export default App;