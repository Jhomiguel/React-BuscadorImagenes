import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";

function App() {
  //guardar el termino digitado por el usuario en el formulario
  const [dato, guardarDato] = useState("");
  //guardar los datos retornados de la api
  const [listaimagenes, guardarListaImagenes] = useState([]);
  //state para control de la pagina en la que se encuentra el usuario
  const [paginaactual, guardarPaginaActual] = useState(1);
  //state para guardar el total de paginas
  const [totalpaginas, guardarTotalPaginas] = useState(1);
  useEffect(() => {
    const consultarApi = async () => {
      if (dato === "") return null;
      const imagenesPorPag = 30;
      const apiKey = "15831749-3ef76530ddf36a6bcaaad8b3f";
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${dato}&per_page=${imagenesPorPag}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarListaImagenes(resultado.hits);
      console.log(resultado);

      //Calcular el total de paginas que tendra la app // Math.ceil redondea hacia arriba
      const calcularTotalpaginas = Math.ceil(
        resultado.totalHits / imagenesPorPag
      );
      guardarTotalPaginas(calcularTotalpaginas);

      //Mover la pantalla hacia arriba cuando se pasa pagina // queryselector selecciona el div de jumbotron
      const jumbotron = document.querySelector(".jumbotron");
      //hace que haga un scroll con animacion smooth
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    consultarApi();
  }, [dato, paginaactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario guardarDato={guardarDato} />
      </div>
      <div className="row justify-content-center">
        <ListaImagenes imagenes={listaimagenes} />
        {paginaactual === 1 ? null : (
          <button className="btn btn-info mr-1" onClick={paginaAnterior}>
            &laquo; Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button className="btn btn-info" onClick={paginaSiguiente}>
            Siguinte &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
