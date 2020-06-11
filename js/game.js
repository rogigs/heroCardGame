function game(id_list, intelligence, strength, speed, durability, power, combat, forceUser) {
    removeElement(id_list)
    var id = getRandom(1, 731)
    let url = BASE_URL + API_KEY + "/" + id
    getJSON(url, (status, response) => {
        var openent = new Hero(
            4,
            response.name,
            response.powerstats.intelligence >= 0 ? response.powerstats.intelligence : 0,
            response.powerstats.strength >= 0 ? response.powerstats.strength : 0,
            response.powerstats.speed >= 0 ? response.powerstats.speed : 0,
            response.powerstats.durability >= 0 ? response.powerstats.durability : 0,
            response.powerstats.power >= 0 ? response.powerstats.power : 0,
            response.powerstats.combat >= 0 ? response.powerstats.combat : 0,
            response.image.url
        )

        document.getElementById("heroes").innerHTML +=
            `<article id="4" class="animate__animated animate__fadeInUp">
        <img src="${openent.image}" alt="Imagem do personagem" onClick="newCard(${openent.id_list}, ${openent.intelligence}, ${openent.strength}, ${openent.speed}, ${openent.durability}, ${openent.power}, ${openent.combat})"/>
        <h1> ${openent.name}</h1>
        <p>Intelligence: </p> <div id="intelligence" style='width:${openent.intelligence}%; background-color:#fff09b;'></div>
        <p>Strength: </p> <div id="strength" style='width:${openent.strength}%; background-color:#ffc400;'></div>
        <p>Speed: </p> <div id="speed" style='width:${openent.speed}%; background-color:#ff824b'></div>
        <p>Durability: </p> <div id="durability" style='width:${openent.durability}%; background-color:#93b0ff;'></div>
        <p>Power: </p> <div id="power" style='width:${openent.power}%; background-color:#343ac6'></div>
        <p>Combat: </p> <div id="combat" style='width:${openent.combat}%; background-color:#ba00ff'></div>
    </article>`

        document.getElementById("reset").innerHTML = `<button onClick="location.reload()">Play again</button>`

        var forceMachine = openent.soma()


        compare(intelligence, openent.intelligence, "intelligence")
        compare(strength, openent.strength, "strength")
        compare(speed, openent.speed, "speed")
        compare(durability, openent.durability, "durability")
        compare(power, openent.power, "power")
        compare(combat, openent.combat, "combat")

        var winner = document.getElementById("winner")

        if (forceUser > forceMachine) {
            winner.textContent = "You win"
        }
        if (forceUser < forceMachine) {
            winner.textContent = "You loser"
        }
        if (forceUser == forceMachine) {
            winner.textContent = "Tied"
        }

    })
}

function removeElement(id_list) {
    var one = document.getElementById("1")
    var two = document.getElementById("2")
    var three = document.getElementById("3")

    if (id_list === 1) {
        two.remove()
        three.remove()
    }
    if (id_list === 2) {
        one.remove()
        three.remove()
    }
    if (id_list === 3) {
        two.remove()
        one.remove()
    }
}

function compare(user, machine, id) {
    var elementDiv = document.querySelector(`#${id}`)

    if (machine > user) {
        elementDiv.style.backgroundColor = "#31FF4E"
    }
    if (machine < user) {
        elementDiv.style.backgroundColor = "#FF0F0F"
    }
    if(machine == user){
        elementDiv.style.backgroundColor = "#FFFA00"
    }
}
