const allPokemon = [];
const listPokemon = document.querySelector(".listPokemon");
const searchInput = document.querySelector(".pokemonSearch input");
let index = 21;

const typeCouleur = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
};

fetchPokedex();

function fetchPokedex() {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.results.forEach(function (pokemon) {
        fetchPokemon(pokemon);
      });
    })
    .catch(function (error) {
      alert(error);
    });
}

function fetchPokemon(pokemon) {
  let objPokemon = {};
  let url = pokemon.url;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data2) {
      objPokemon.img = data2.sprites.front_default;
      objPokemon.type = data2.types[0].type.name;
      objPokemon.id = data2.id;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
        .then(function (res) {
          return res.json();
        })
        .then(function (nomPokemon) {
          objPokemon.name = nomPokemon.names[4].name;
          allPokemon.push(objPokemon);

          if (allPokemon.length === 151) {
            allPokemonTrie = allPokemon
              .sort(function (a, b) {
                return a.id - b.id;
              })
              .slice(0, 21);
            createCard(allPokemonTrie);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    })
    .catch(function (error) {
      alert(error);
    });
}

function createCard(array) {
  for (let i = 0; i < array.length; i++) {
    const carte = document.createElement("li");

    let couleur = typeCouleur[array[i].type];
    carte.style.background = couleur;

    const nomCarte = document.createElement("h4");
    nomCarte.innerText = array[i].name;

    const idCarte = document.createElement("p");
    idCarte.innerText = `ID# ${array[i].id}`;

    const imgCarte = document.createElement("img");
    imgCarte.src = array[i].img;

    carte.appendChild(imgCarte);
    carte.appendChild(nomCarte);
    carte.appendChild(idCarte);

    listPokemon.appendChild(carte);
  }
}

window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 20) {
    addPoke(6);
  }
});

function addPoke(nombre) {
  if (index > 151) {
    return;
  } else {
    const arrayToAdd = allPokemon.slice(index, index + nombre);
    createCard(arrayToAdd);
    index += nombre;
  }
}

searchInput.addEventListener("keyup", recherche);

function recherche(){

  if(index < 151) {
      addPoke(130);
  }

  let filter, allLi, titleValue, allTitles;
  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll('li');
  allTitles = document.querySelectorAll('li > h4');
  
  
  for(i = 0; i < allLi.length; i++) {

      titleValue = allTitles[i].innerText;

      if(titleValue.toUpperCase().indexOf(filter) > -1) {
          allLi[i].style.display = "flex";
      } else {
          allLi[i].style.display = "none";
      }

  }

}
