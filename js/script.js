class Hero {
    constructor(id_list, name, intelligence, strength, speed, durability, power, combat, image) {
        this.id_list = id_list
        this.name = name
        this.intelligence = intelligence
        this.strength = strength
        this.speed = speed
        this.durability = durability
        this.power = power
        this.combat = combat
        this.image = image
    }

    present() {
        return this.name + ": (" + this.intelligence + ")"
    }

    soma() {
        let force = parseInt(this.intelligence) + parseInt(this.strength) + parseInt(this.speed) + parseInt(this.durability) + parseInt(this.combat)
        return force
    }
}

const BASE_URL = "https://superheroapi.com/api.php/"
const API_KEY = "1611505948999710"

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest
    xhr.open("GET", url, true)
    xhr.responseType = "json"
    xhr.onload = () => {
        let status = xhr.status
        if (status == 200) {
            callback(status, xhr.response)
        }
        else {
            console.log(status);
        }
    }
    xhr.send()
}

function createCard(hero, force) {
    document.getElementById("heroes").innerHTML +=
        `<article id="${hero.id_list}"  class="animate__animated animate__fadeInUp">
        <img src="${hero.image}" alt="Imagem do personagem" onClick="game(${hero.id_list}, ${hero.intelligence}, ${hero.strength}, ${hero.speed}, ${hero.durability}, ${hero.power}, ${hero.combat}, ${force})"/>
        <h1> ${hero.name}</h1>
        <p>Intelligence: </p> <div style='width:${hero.intelligence}%; background-color:#fff09b;'></div>
        <p>Strength: </p> <div style='width:${hero.strength}%; background-color:#ffc400;'></div>
        <p>Speed: </p> <div style='width:${hero.speed}%; background-color:#ff824b'></div>
        <p>Durability: </p> <div style='width:${hero.durability}%; background-color:#93b0ff;'></div>
        <p>Power: </p> <div style='width:${hero.power}%; background-color:#343ac6'></div>
        <p>Combat: </p> <div style='width:${hero.combat}%; background-color:#ba00ff'></div>
    </article>`

}


function getHero(id, id_list) {
    let url = BASE_URL + API_KEY + "/" + id
    getJSON(url, (status, response) => {
        var hero = new Hero(
            id_list,
            response.name,
            response.powerstats.intelligence >= 0 ? response.powerstats.intelligence : 0,
            response.powerstats.strength >= 0 ? response.powerstats.strength : 0,
            response.powerstats.speed >= 0 ? response.powerstats.speed : 0,
            response.powerstats.durability >= 0 ? response.powerstats.durability : 0,
            response.powerstats.power >= 0 ? response.powerstats.power : 0,
            response.powerstats.combat >= 0 ? response.powerstats.combat : 0,
            response.image.url
        )
        var force = hero.soma()
        createCard(hero, force)
    })
}



window.onload = () => {
    for (let i = 1; i <= 3; i++) {
        getHero(getRandom(1, 731), i);
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min
}

