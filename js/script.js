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
    //select the modal container element
    let modalContainer = document.querySelector('#modal-container');
    //clear the contents of the modal container
    modalContainer.innerHTML = '';

    //create the modal element
    let modal = document.createElement('div');
    modal.classList.add('modal');

    //create the close button element
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    //create the title element and set its text to the Pokemen name
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    //create the content element and set its text to the Pokemon height
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;
    
   // Append the close button, title, and content elements to the modal
   modal.appendChild(closeButtonElement);
   modal.appendChild(titleElement);
   modal.appendChild(contentElement);

// Check if the pokemon has an image URL
if (pokemon.imageUrl) {
    //create an image element and set its attributes
    let imagePokemon = document.createElement('img');
    imagePokemon.setAttribute('src', pokemon.imageUrl);
    imagePokemon.setAttribute('height', '230');
    imagePokemon.setAttribute('width', '300');
    imagePokemon.setAttribute('alt', 'Pokemon Image');
    //append the image element to the modal
    modal.appendChild(imagePokemon);
}

//append the modal to the modal container
modalContainer.appendChild(modal);

//add the 'is-visible' class to the modal contianer to show it
modalContainer.classList.add('is-visible');

//add an event listener to the close button to hide the modal
closeButtonElement.addEventListener('click', hideModal);

//add an event listener to the window to hide the modal when the 'Escape' key is pressed
window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

// add an event listener to the modal contianer to hide the modal when clicked outside the modal
modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
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

let listItem = document.createElement('li');

listItem.classList.add('list-group-item')

pokemonRepository.loadList().then(function() {
    //data is now loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
