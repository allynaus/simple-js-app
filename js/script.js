let pokemonRepository = (function () {
//array of pokemon types and names
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//other functions remain here

function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
       json.results.forEach(finction (item) {
        let pokemon = {
            name: item.name,
            detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
        console.error(e);
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadlist
    };
})();

pokemonRepository.loadList().then(function() {
    // data is now loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

let pokemonRepository = (function() {
    //other functions here

    function loadDetails(item) {
        let url = item.detailsUrl;
        const response = await fetch(url);
        const details = await response.json();
        //now add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;catch(function (e) {
            console.error(e);
        });
    }
  return {
    add: add,
    getAll: getAll,
    loadList: loadlist,
    loadDetails: loadDetails
  };
})();

console.log(pokemonList);

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
}

function addListItem(pokemon) {
    //this will select my <ul class="pokemon-list"> in HTML
    let pokemonList = document.querySelector('.pokemon-list');
    //this creates a <li> tag
    let listItem = document.createElement('li');
    //this will create a <button> tag
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    //this will call showDetails when the button is clicked
    button.addEventListener('click', function() {
        showDetails(pokemon)
    })
    //this inserts the <button> tag inside the <li> tag
    //this should look like <li> <button> Bulbaraur </button> </li>
    listItem.appendChild(button)
    //this will put the <li> tag inside the <ul> tag
    //this should look like <ul><li> <button> Bulbasaur </button> </li></ul>
    pokemonList.appendChild(listItem);

}

return {
    addListItem: addListItem,
    showDetails: showDetails,
    add: function(pokemon) {
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }
};
})();

console.log(pokemonRepository.getAll()); // [ { name: 'Bulbasaur' } ]

//adding a forEach loop to create a list of pokemon and their attributes
pokemonRepository.getAll().forEach(pokemonRepository.addListItem); 