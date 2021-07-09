pokedex();

function pokedex(){
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        alert(error);
    })

    document.createElement("li")
            
};