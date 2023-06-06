let pokemonRepository = (function () {
//array of pokemon types and names
let pokemonList = [
    {
     name: 'Bulbasaur',
     height: '0.7',
     type: 'Poison'
    },
    {
     name: 'Squirtle',
     height: '0.5',
     type: 'Water'
    },
    {
     name: 'Ponyta',
     height: '1',
     type: 'fire'
    }
];

console.log(pokemonList);

function showDetails(pokemon) {
    console.log(pokemon);
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