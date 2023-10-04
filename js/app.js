const URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const lista = document.getElementById("lista");
const button = document.getElementById("btnBuscar");

let getJSONData = function (url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

document.addEventListener("DOMContentLoaded", () => {

    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            button.addEventListener("click", () => {
                buscarPelicula(resultObj.data)
            })
        }
    })
})

function buscarPelicula(array) {
    let input = document.getElementById("inputBuscar").value;
    let resultado = array.filter(element => element.title == input || element.tagline == input || element.overview == input || element.genres.some(genre => genre.name.includes(input)))
    resultado.forEach(element => {
        const offcanvasID = `offcanvasTop-${element.id}`;
        lista.innerHTML += `
        <div class="card" style="width: 18rem;" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasID}" aria-controls="${offcanvasID}">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${element.tagline}</h6>
                <p class="card-text">${mostrarEstrellas(element.vote_average)}</p>
            </div>
        </div>
            
        <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasID}" aria-labelledby="${offcanvasID}">
            <div class="offcanvas-header">
                <h4 class="offcanvas-title" id="${offcanvasID}">${element.title}</h4>
                <div class="offcanvas-body">
                    <p>${element.overview}</p>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
        
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Info
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">Year: ${element.release_date.substring(0, 4)}</li>
                    <li class="dropdown-item">Runtime: ${element.runtime} mins</li>
                    <li class="dropdown-item">Budget: ${element.budget}</li>
                    <li class="dropdown-item">Revenue: ${element.revenue}</li>
                </ul>
            </div>
        </div>
        `
    })
}

function mostrarEstrellas(puntaje) {
    let estrellas = []
    for (let i = 0; i < parseInt(puntaje, 10); i++) {
        estrellas.push("<span class='fa fa-star checked'></span>");
    }
    for (let j = 0; j < (10 - parseInt(puntaje, 10)); j++) {
        estrellas.push("<span class='fa fa-star'></span>");
    }
    return estrellas.join("")
}