const grid = document.getElementById("grid");

let allSurvivors = [];
let allKillers = [];

// загрузка сурвов
fetch("../data/survivors.json")
    .then(res => res.json())
    .then(data => {
        allSurvivors = data;
        render(data);
    });

// загрузка киллеров
fetch("../data/killers.json")
    .then(res => res.json())
    .then(data => {
        allKillers = data;
    });

function render(data) {
    grid.innerHTML = "";

    data.forEach(char => {
        grid.innerHTML += `
            <div class="character_card">
                <img src="${char.image}">
                <h3>${char.name}</h3>
                <p>${char.description}</p>
            </div>
        `;
    });
}

// фильтры
document.getElementById("allBtn").onclick = () => {
    render([...allSurvivors, ...allKillers]);
};

document.getElementById("survivorsBtn").onclick = () => {
    render(allSurvivors);
};

document.getElementById("killersBtn").onclick = () => {
    render(allKillers);
};