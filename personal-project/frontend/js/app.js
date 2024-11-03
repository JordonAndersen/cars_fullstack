// window.onload = () => {
//   const baseUrl ="http://3.144.22.80:8000" 

//   const listBtn = document.querySelector("#listBtn")
//   const userSelect = document.querySelector("#userSelect")
//   const userContainer = document.querySelector("#userContainer")

//   // Generate options for the user dropdown dynamically
//   for (let i = 1; i <= 100; i++) {
//       const option = document.createElement('option');
//       option.value = i;
//       option.text = i;
//       userSelect.appendChild(option);
//   }

//   const doFetch = async (url) => {
//     const result = await fetch(url)
//     const resultJson = await result.json()
//     return resultJson
//   }

//   const getPeople = async () => {
//     const url = `${baseUrl}/all`
//     const fetchResult = await doFetch(url)
//     const people = fetchResult.people
//     people.forEach( p => createHtmlPerson(p))
//   }

//   const getPerson = async (id) => {
//     const url = `${baseUrl}/${id}` 
//     const fetchResult = await doFetch(url)
//     const person = fetchResult.person
//     createHtmlPerson(person)
//   }

//   const removeUsers = () => {
//     while(userContainer.firstChild) {
//       userContainer.removeChild(userContainer.firstChild)
//     }
//   }

//   const createHtmlPerson = (person) => {
//     const div = document.createElement("div")
//     const h3 = document.createElement("h3")
//     const p1 = document.createElement("p")
//     const p2 = document.createElement("p")

//     h3.innerText = `name: ${person[1]}`
//     p1.innerText = `email: ${person[2]}`
//     p2.innerText = `favorite animal: ${person[3]}`

//     div.appendChild(h3)
//     div.appendChild(p1)
//     div.appendChild(p2)

//     div.className = "item"

//     userContainer.appendChild(div)
//   }


//   userSelect.addEventListener("change" ,(e) => {
//       removeUsers()
//       getPerson(e.target.value)
//     })
  
//   listBtn.addEventListener("click" ,() => {
//       removeUsers()
//       getPeople()
//     })
// }

let snowing = false;
let raining = false;
let showers = false;
let windy = false;
let normalday = false;

//event listner for when the page is loaded 

window.onload = () => {
  const baseUrl ="http://18.220.110.232:8000" 
    // Just shows that the page is fully loaded 
    console.log("page is fully loaded");
    //checks any ip address 

    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=47e48734a6fc4571b20ab08b9c4e2fd4", {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const ip = data.ip_address;
            console.log(ip);
            const ipcity = data.city;
            console.log(ipcity);
            const ipcountry = data.country
            console.log(ipcountry);
            const iplatitude = String(data.latitude)
            console.log(iplatitude)
            const iplongitude = String(data.longitude)
            console.log(iplongitude)

            const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${iplatitude}&longitude=${iplongitude}&current=is_day,precipitation,rain,showers,snowfall&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1`

            //testing somewhere that is different then my local area. 
            // const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=45.7833&longitude=-108.5007&current=is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&forecast_days=1"
            console.log(weatherURL)
            fetch(weatherURL)
                .then(response => response.json())
                .then(weatherdata => {
                    console.log(weatherdata)
                    const isDay = weatherdata.current.is_day
                    console.log(isDay)
                    if (isDay === 1) {
                        console.log("its day time")
                    }
                    else {
                        console.log("its night time")
                    }
     
                    const issnow = weatherdata.current.snowfall 
                    const israining = weatherdata.current.rain 
                    const isshowering = weatherdata.current.showers

                    if (israining > 0) {
                        console.log("its Raining")
                        raining = true;
                        if (weatherdata.current.wind_speed_10m > 0.0) {
                            console.log("its windy")
                            windy = true;
                        }
                    }
                    else if (issnow > 0) {
                        console.log("its snowing")
                        snowing = true;
                        if (weatherdata.current.wind_speed_10m > 0.0) {
                            console.log("its windy")
                            windy = true;
                        }
                    }
                    else if (isshowering > 0) {
                        console.log("its showering")
                        showers = true;
                        if (weatherdata.current.wind_speed_10m > 0.0) {
                            console.log("its windy")
                            windy = true;
                        }
                    }
                    else{
                        normalday = true

                    }

                });


        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });



    //add an address to the reference 
    //     const options = {method: 'GET'};

    // fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=47e48734a6fc4571b20ab08b9c4e2fd4&ip_address=67.61.3.12&city,country', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));

};





function generateTeam() {
    if (snowing === true) {
        const pokieUrl = 'https://pokeapi.co/api/v2/type/15/';
        fetch(pokieUrl)
            .then(Response => Response.json())
            .then(data => {                
                let randomNum = Math.floor(Math.random() * data.pokemon.length);
                console.log(randomNum)
                console.log(data.pokemon)
                const pickpokemoon = data.pokemon[randomNum]
                console.log(pickpokemoon.pokemon.name)           

            
                
    
                const indivPokieURL = pickpokemoon.pokemon.url
                console.log(indivPokieURL)
                fetch(indivPokieURL)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.types[0].type.name)
                     
                        let typeName = 'Type'
                        for (let i = 0; i < data.types.length; i++) {
                            typeName += ` ${data.types[i].type.name}`;
    
                        }
                        console.log(typeName);
                        spriteImageURL = data.sprites.front_default
                        console.log(spriteImageURL)
    
                        let res = document.getElementById("results1")
                        const resimage = document.createElement('img')
                        resimage.src = spriteImageURL
                        console.log(resimage)
                        res.appendChild(resimage)
    
    
    
    
                    })
    
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            })
    }
    else if(raining === true){
        const pokieUrl = 'https://pokeapi.co/api/v2/type/11/';
        fetch(pokieUrl)
            .then(Response => Response.json())
            .then(data => {                
                let randomNum = Math.floor(Math.random() * data.pokemon.length);
                console.log(randomNum)
                console.log(data.pokemon)
                const pickpokemoon = data.pokemon[randomNum]
                console.log(pickpokemoon.pokemon.name)        

            
                
    
                const indivPokieURL = pickpokemoon.pokemon.url
                console.log(indivPokieURL)
                fetch(indivPokieURL)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.types[0].type.name)
                     
                        let typeName = 'Type'
                        for (let i = 0; i < data.types.length; i++) {
                            typeName += ` ${data.types[i].type.name}`;
    
                        }
                        console.log(typeName);
                        spriteImageURL = data.sprites.front_default
                        console.log(spriteImageURL)
    
                       
                        let gridContainer = document.getElementById("pokiemon");
                        let gridItem = document.createElement('div');
                        gridContainer.style.backgroundColor = "#2a75bb"
                        gridItem.style.backgroundColor = '#AAB09F'
                        gridItem.style.border = 'thick solid #ffde00'
                        gridItem.style.minHeight = '250px'
                        gridItem.style.borderRadius = '15px'
                        gridItem.style.objectFit = "cover"
                        gridItem.style.textAlign = "center"
                        
                        gridItem.classList.add('grid-item');
                       
                        const resimage = document.createElement('img')
                        resimage.src = spriteImageURL
                        gridItem.appendChild(resimage)
                        const typetext = document.createElement('p')
                        typetext.innerHTML = typeName                    
                        
                        gridItem.appendChild(typetext)
                      
                        
                        
                      
                        gridContainer.appendChild(gridItem)
    
    
    
                    })
    
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            })
    }
    else if(showers === true){
        const pokieUrl = 'https://pokeapi.co/api/v2/type/12/';
        fetch(pokieUrl)
            .then(Response => Response.json())
            .then(data => {                
                let randomNum = Math.floor(Math.random() * data.pokemon.length);
                console.log(randomNum)
                console.log(data.pokemon)
                const pickpokemoon = data.pokemon[randomNum]
                console.log(pickpokemoon.pokemon.name)           

            
                
    
                const indivPokieURL = pickpokemoon.pokemon.url
                console.log(indivPokieURL)
                fetch(indivPokieURL)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.types[0].type.name)
                     
                        let typeName = 'Type'
                        for (let i = 0; i < data.types.length; i++) {
                            typeName += ` ${data.types[i].type.name}`;
    
                        }
                        console.log(typeName);
                        spriteImageURL = data.sprites.front_default
                        console.log(spriteImageURL)
    
                        let res = document.getElementById("results1")
                        const resimage = document.createElement('img')
                        resimage.src = spriteImageURL
                        console.log(resimage)
                        res.appendChild(resimage)
    
    
    
    
                    })
    
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            })
    }
    else if(windy === true){
        const pokieUrl = 'https://pokeapi.co/api/v2/type/2/';
        fetch(pokieUrl)
            .then(Response => Response.json())
            .then(data => {                
                let randomNum = Math.floor(Math.random() * data.pokemon.length);
                console.log(randomNum)
                console.log(data.pokemon)
                const pickpokemoon = data.pokemon[randomNum]
                console.log(pickpokemoon.pokemon.name)           

            
                
    
                const indivPokieURL = pickpokemoon.pokemon.url
                console.log(indivPokieURL)
                fetch(indivPokieURL)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.types[0].type.name)
                     
                        let typeName = 'Type'
                        for (let i = 0; i < data.types.length; i++) {
                            typeName += ` ${data.types[i].type.name}`;
    
                        }
                        console.log(typeName);
                        spriteImageURL = data.sprites.front_default
                        console.log(spriteImageURL)
    
                       
                        let gridContainer = document.getElementById("pokiemon");
                        let gridItem = document.createElement('div');
                        gridContainer.style.backgroundColor = "#2a75bb"
                        gridItem.style.backgroundColor = '#AAB09F'
                        gridItem.style.border = 'thick solid #ffde00'
                        gridItem.style.minHeight = '250px'
                        gridItem.style.borderRadius = '15px'
                        gridItem.style.objectFit = "cover"
                        gridItem.style.textAlign = "center"
                        
                        gridItem.classList.add('grid-item');
                       
                        const resimage = document.createElement('img')
                        resimage.src = spriteImageURL
                        gridItem.appendChild(resimage)
                        const typetext = document.createElement('p')
                        typetext.innerHTML = typeName                    
                        
                        gridItem.appendChild(typetext)
                      
                        
                        
                      
                        gridContainer.appendChild(gridItem)
    
    
    
                    })
    
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            })
    }
    else if(normalday === true){
        const pokieUrl = 'https://pokeapi.co/api/v2/type/1/';
        fetch(pokieUrl)
            .then(Response => Response.json())
            .then(data => {                
                let randomNum = Math.floor(Math.random() * data.pokemon.length);
                console.log(randomNum)
                console.log(data.pokemon)
                const pickpokemoon = data.pokemon[randomNum]
                console.log(pickpokemoon.pokemon.name)           

            
                
    
                const indivPokieURL = pickpokemoon.pokemon.url
                console.log(indivPokieURL)
                fetch(indivPokieURL)
                    .then(Response => Response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.types[0].type.name)
                     
                        let typeName = 'Type'
                        for (let i = 0; i < data.types.length; i++) {
                            typeName += ` ${data.types[i].type.name}`;
    
                        }
                        console.log(typeName);
                        spriteImageURL = data.sprites.front_default
                        console.log(spriteImageURL)
    
                       
                        let gridContainer = document.getElementById("pokiemon");
                        let gridItem = document.createElement('div');
                        gridContainer.style.backgroundColor = "#2a75bb"
                        gridItem.style.backgroundColor = '#AAB09F'
                        gridItem.style.border = 'thick solid #ffde00'
                        gridItem.style.minHeight = '250px'
                        gridItem.style.borderRadius = '15px'
                        gridItem.style.objectFit = "cover"
                        gridItem.style.textAlign = "center"
                        
                        gridItem.classList.add('grid-item');
                       
                        const resimage = document.createElement('img')
                        resimage.src = spriteImageURL
                        gridItem.appendChild(resimage)
                        const typetext = document.createElement('p')
                        typetext.innerHTML = typeName                    
                        
                        gridItem.appendChild(typetext)
                      
                        
                        
                      
                        gridContainer.appendChild(gridItem)
    
    
                    })
    
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            })
    }
}

