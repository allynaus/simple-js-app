let pokemonRepository = (function () {
//array of pokemon types and names
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//other functions remain here

async function loadDetails(item) {
    try {
        let url = item.detailsUrl;
        const response = await fetch(url);
        const details = await response.json();
        //now add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }
    catch(e) {
        console.error(e);
    }
}
function add (pokemon) {
    pokemonList.push(pokemon);
}
function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function (e) {
        console.error(e);
    })
}
 
function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        showModal(pokemon);
    });
}

//function to show the modal with Pokemon info
function showModal(pokemon) {
    let modalContent = document.querySelector(".modal-body");
    modalContent.innerHTML = "";
        let newModal = document.createElement("div");
        newModal.classList.add("newModal");

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement("p");
        contentElement.innerText = "Height;" + pokemon.height;

        let imgPokemon = document.createElement("img");
        imgPokemon.classList.add("pokemon_img");
        imgPokemon.src = pokemon.imageUrl;
        imgPokemon.alt = pokemon.name;

        newModal.appendChild(titleElement);
        newModal.appendChild(contentElement);
        newModal.appendChild(imgPokemon);
        modalContent.appendChild(newModal);

        modalContent.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContent) {
                hideModal();
            }
        });
    }

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}

function addListItem(pokemon) {
    //this selects my <ul class="pokemon-list"> in HTML
    let pokemonList = document.querySelector('.pokemon-list');
    //this creates a <li> tag
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item')
    //this will create a <button> tag
    let button = document.createElement('button');
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    //this adds the pokemon name to the button
    button.innerText = pokemon.name;
    //this will call showDetails when the button is clicked
    button.addEventListener('click', function() {
        showDetails(pokemon)
    })
    //this inserts the <button> tag inside the <li> tag
    //this should look like <li> <button> Bulbasaur </button> </li>
    listItem.appendChild(button)
    //this will put the <li> tag inside the <ul> tag
    //this should look like <ul><li> <button> Bulbasaur </button> </li></ul>
    pokemonList.appendChild(listItem);
}

return {
    loadList,
    addListItem: addListItem,
    showDetails: showDetails,
    add,
    getAll: function() {
        return pokemonList;
    }
};

})();

let listItem = document.createElement('div');

listItem.classList.add('list-group-item')

pokemonRepository.loadList().then(function() {
    //data is now loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
