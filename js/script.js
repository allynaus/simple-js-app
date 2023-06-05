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

return {
    add: function(pokemon) {
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }

function addList(pokemonList) {

   let pokemonList = document.querySelector('.pokemon-list');
   let button = document.createElement('button');
   button.innerText = "Click Me";
   container.appendChild(button);
}
};
})();

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Bulbasaur' });
console.log(pokemonRepository.getAll()); // [ { name: 'Bulbasaur' } ]

//adding a forEach loop to create a list of pokemon and their attributes
pokemonRepository.getAll().forEach(function(pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' this tall. ');
});