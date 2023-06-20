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
        console.log(pokemon);
    });
}

function showModal(pokemon) {
    
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = pokemon,name;

    
    let pokemonHeight = document.querySelector(".pokemon-height");
    pokemonHeight.innerText = pokemon.height 
}


function addListItem(pokemon) {
    //this selects my <ul class="pokemon-list"> in HTML
    let pokemonList = document.querySelector('.pokemon-list');
    //this creates a <li> tag
    let listItem = document.createElement('li');
    //this will create a <button> tag
    let button = document.createElement('button');
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

pokemonRepository.loadList().then(function() {
    //data is now loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
