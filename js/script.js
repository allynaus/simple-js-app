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

//adding a forEach loop to create a list of pokemon and their attributes
pokemonList.forEach(function(pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' this tall. ');
});

