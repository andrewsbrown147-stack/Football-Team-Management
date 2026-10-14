// Football Team Management System

// Array containing player records

let players = [

    {

        id: 1,

        name: "Nana Agyeman",

        number: 1,

        position: "Goalkeeper",

        goals: 0

    },

    {

        id: 2,

        name: "Master Paul",

        number: 4,

        position: "Defender",

        goals: 1

    },

    {

        id: 3,

        name: "Stanley",

        number: 8,

        position: "Midfielder",

        goals: 3

    },

    {

        id: 4,

        name: "Andrews",

        number: 10,

        position: "Forward",

        goals: 5

    }

];

// Select HTML elements

const playerForm = document.getElementById("playerForm");

const playerTable = document.getElementById("playerTable");
const searchInput = document.getElementById("searchInput");

// Display all players

function displayPlayers(playerList = players) {

    playerTable.innerHTML = "";

    playerList.forEach(function(player) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        nameCell.textContent = player.name;

        const numberCell = document.createElement("td");

        numberCell.textContent = player.number;

        const positionCell = document.createElement("td");

        positionCell.textContent = player.position;

        const goalsCell = document.createElement("td");

        goalsCell.textContent = player.goals;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {

            deletePlayer(player.id);

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);

        row.appendChild(numberCell);

        row.appendChild(positionCell);

        row.appendChild(goalsCell);

        row.appendChild(actionCell);

        playerTable.appendChild(row);

    });

    updateStatistics();

}

// Add a new player

playerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("playerName").value.trim();

    const number = Number(document.getElementById("jerseyNumber").value);

    const position = document.getElementById("position").value;

    const goals = Number(document.getElementById("goals").value);

    if (name === "") {

        alert("Please enter the player's name.");

        return;

    }

    if (!Number.isInteger(number) || number < 1 || number > 99) {

        alert("Jersey number must be between 1 and 99.");

        return;

    }

    if (players.some(function(player) {

        return player.number === number;

    })) {

        alert("This jersey number is already in use.");

        return;

    }

    if (!Number.isInteger(goals) || goals < 0) {

        alert("Goals must be zero or more.");

        return;

    }

    const newPlayer = {

        id: Date.now(),

        name: name,

        number: number,

        position: position,

        goals: goals

    };

    // push() adds a new player to the array

    players.push(newPlayer);

    displayPlayers();

    playerForm.reset();

    document.getElementById("goals").value = 0;

    alert("Player added successfully!");

});

// Delete a player

function deletePlayer(id) {

    const confirmed = confirm(

        "Are you sure you want to delete this player?"

    );

    if (!confirmed) {

        return;

    }

    // filter() creates a new array without the selected player

    players = players.filter(function(player) {

        return player.id !== id;

    });

    displayPlayers();

}

// Search for players
searchInput.addEventListener("input", function() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    // filter() selects players whose names match the search

    const results = players.filter(function(player) {

        return player.name.toLowerCase().includes(searchTerm);

    });

    displayPlayers(results);

});

// Calculate team statistics

function updateStatistics() {

    // Display the number of players

    document.getElementById("totalPlayers").textContent =

        players.length;

    // reduce() calculates the total goals

    const totalGoals = players.reduce(function(total, player) {

        return total + player.goals;

    }, 0);

    document.getElementById("totalGoals").textContent =

        totalGoals;

}

// Display the initial player records

displayPlayers();