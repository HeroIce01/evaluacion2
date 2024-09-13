
import { personajes } from './db.js';
function mostrarPersonaje(personaje) {
    return `
      <div class="profile">
            <div class="character-profile">
                <div class="character-head">
                    <h1>${personaje.name}</h1>
                    <h1>${personaje.race}</h1>
                </div>

                <img src=${personaje.img} />
                <div class="character-stats">
                    <div class="character-stats-abilities">
                        <div class="character-stats">
                            <ul>
                                <li>Health: ${personaje.health}</li>
                                <li>Attack: ${personaje.attack}</li>
                                <li>Defense: ${personaje.defense}</li>
                                <li>KI Restore Speed: ${personaje.kiRestoreSpeed}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}
function mostrarTodosPersonajes() {
    const container = document.getElementById('container');
    container.innerHTML = personajes.map(personaje => mostrarPersonaje(personaje)).join('');
}
function filtrarPersonajes(criterio) {
    const personajesFiltrados = personajes.filter(personaje => {
        switch(criterio) {
            case 'Filtrar Saiyayines':
                return personaje.race.toLowerCase().includes('saiyan');
            case 'Filtrar Androides':
                return personaje.race.toLowerCase().includes('android');
            case 'Menor poder de todos':
                return personaje === personajes.reduce((min, p) => p.attack < min.attack ? p : min);
            case 'Mayor poder de todos':
                return personaje === personajes.reduce((max, p) => p.attack > max.attack ? p : max);
            case 'Personajes femeninos':
                return personaje.gender.toLowerCase() === 'Female';
            default:
                return true;
        }
    });

    const container = document.getElementById('container');
    container.innerHTML = personajesFiltrados.map(personaje => mostrarPersonaje(personaje)).join('');
}
function filtrarSaiyans() {
    let saiyans = personajes.filter(personaje => personaje.race === "Saiyan");
    mostrarFiltro(saiyans);
}

function buscarPersonaje(nombre) {
    const personajeEncontrado = personajes.find(personaje => 
        personaje.name.toLowerCase().includes(nombre.toLowerCase())
    );

    const container = document.getElementById('container');
    container.innerHTML = personajeEncontrado ? mostrarPersonaje(personajeEncontrado) : 'No se encontró el personaje';
}

function encontrarGohan() {
    const gohan = personajes.find(personaje => personaje.name.toLowerCase() === 'gohan');
    const container = document.getElementById('container');
    container.innerHTML = gohan ? mostrarPersonaje(gohan) : 'No se encontró a Gohan';
}

function posicionVegeta() {
    const posicion = personajes.findIndex(personaje => personaje.name.toLowerCase() === 'vegeta') + 1;
    const container = document.getElementById('container');
    container.innerHTML = `Vegeta está en la posición ${posicion} de la lista de personajes`;
}

function poderTotal() {
    const total = personajes.reduce((sum, personaje) => sum + personaje.attack, 0);
    const container = document.getElementById('container');
    container.innerHTML = `El poder total de todos los personajes es: ${total}`;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarTodosPersonajes();

    const characterList = document.querySelector('.character-list ul');
    characterList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const criterio = e.target.textContent.trim();
            switch(criterio) {
                case 'Mostrar personajes':
                    mostrarTodosPersonajes();
                    break;
                case 'Encontrar a Gohan':
                    encontrarGohan();
                    break;
                case 'Posición de Vegueta':
                    posicionVegeta();
                    break;
                case 'Total poder de todos personajes':
                    poderTotal();
                    break;
                default:
                    filtrarPersonajes(criterio);
            }
        }
    });

    const searchInput = document.querySelector('.search-characters');
    searchInput.addEventListener('input', (e) => {
        buscarPersonaje(e.target.value);
    });
});