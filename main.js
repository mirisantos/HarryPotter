//Registrar el SW

if ('serviceWorker' in  navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        let boton = document.getElementById("btnAcceder")
        boton.addEventListener('click', () => {
            fetch('https://www.google.com')
        })
    })
}

window.addEventListener("load", function(event) {
    getCharacters();
  });


  function getCharacters(){

    let url = "https://hp-api.herokuapp.com/api/characters";
    var element=document.getElementById("personajes");
    let html = "";
    
    fetch(url)
  .then(response => response.json())
  .then(personajes => {

    personajes.forEach(per => {
        console.log("Personaje", per);
        //html+="<div class='col-md-2'><img style='width:200px;max-height:200px' src='"+per.image+"' alt='Imagen'></div>";
       html+= '<div class="col-md-3"> <div class="card card-personaje" >'+
        '<img src="'+per.image+'" class="card-img-top" alt="...">'+
        '<div class="card-body">'+
          '<h5 class="card-title"> '+per.name+'</h5>'+
          '<p class="card-text">Género: '+per.gender+'</p>'+
          '<p class="card-text">Especies: '+per.species+'</p>'+
          '<p class="card-text">Fecha de nacimiento: '+per.dateOfBirth+'</p>'+
        '</div>'+
      '</div></div>';
    });

    element.innerHTML = html;

    /*for (const product of data.products) {
      let listItem = document.createElement('li');
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = product.Name;
      listItem.append(
        ` can be found in ${
          product.Location
        }. Cost: `
      );
      listItem.appendChild(
        document.createElement('strong')
      ).textContent = `£${product.Price}`;
      myList.appendChild(listItem);
    }*/
  })
  .catch(console.error);
  /*  fetch(url).then(function(response) {
        if(response.ok) {
            console.log("response");
            console.log(response);
               let personajes = response.json(); 
                for(let personaje of personajes){
                    console.log(personaje);
                }
        } else {
          console.log('Respuesta de red OK pero respuesta HTTP no OK');
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });*/

  }

