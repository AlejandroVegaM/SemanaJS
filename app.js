const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*Para los celulares

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* para los celulares

async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`) 
    const pokemonDataJSON = await res.json()

    const allItems = []; 
    const result = []; //*Guardaremos la respuesta en el array

    for (let pokemonInfo in pokemonDataJSON) { //*Convertimos el objeto JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result); //Para ver el arreglo

   

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default; //*Imagen pokemon

    //*Nombre de pokemon e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Pokemon ${result[10][1]} -  ID ${result[6][1]}`; 

    //*Tipo de pokemon
    const pokemonType = document.createElement('h3');
    pokemonType.innerText = `tipo: ${result[16][1][0].type.name}`; 

    //* Pokemon HP
    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`; 
    hp.classList.add('pokemonStats');

    //* Ataque
    const attack = document.createElement('p');
    attack.innerText = `Attack: ${result[15][1][1].base_stat}`; 
    attack.classList.add('pokemonStats');

    //* Defensa
    const defense = document.createElement('p');
    defense.innerText = `Defense: ${result[15][1][2].base_stat}`; 
    defense.classList.add('pokemonStats');   

    //* Velocidad
    const speed = document.createElement('p');
    speed.innerText = `Speed: ${result[15][1][5].base_stat}`; 
    speed.classList.add('pokemonStats');

    //* Contenerdor de estadisticas
    const stats = document.createElement('div');
    stats.append(hp, attack, defense,  speed);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("No es un nombre o id Valido, Intenta de nuevo!");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}
