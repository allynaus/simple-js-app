//array of pokemon types and names
let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', type: 'Poison'},
    {name: 'Squirtle', height: '0.5', type: 'Water'},
    {name: 'Ponyta', height: '1', type: 'fire'}
];
console.log(pokemonList);

//adding a loop to create a list of pokemon and their attributes
for (let i=0; i < pokemonList.length; i++) {
    if (pokemonList[i].height <0.10 && pokemonList.height[i].height >0.3){
        document.write(<br> + pokemonList[i].name + " is small" + </br>);
    }else if (pokemonList[i].height <0.7){
        document.write(<br> + pokemonList[i].name + " is medium" + </br>);
    }else {
        document.write(<br> + pokemonList[i].name + " is big" + </br>);
    }
}