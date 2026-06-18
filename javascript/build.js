const perks = document.querySelectorAll(".perk");
const slots = document.querySelectorAll(".slot");

let draggedPerk = null;

/* ================= INFO PANEL ================= */

const infoBox = document.getElementById("perkInfo");

perks.forEach(perk => {

    // drag start
    perk.addEventListener("dragstart", () => {
        draggedPerk = perk;
    });

    // click → show info
    perk.addEventListener("click", () => {
        infoBox.innerHTML = `
            <h3>${perk.dataset.name}</h3>
            <p>${perk.dataset.desc}</p>
        `;
    });

});


/* ================= COUNT + CHECK DUPLICATES ================= */

function getAllSelectedPerks() {
    return document.querySelectorAll(".slot .perk");
}

function isAlreadySelected(name) {
    let found = false;

    getAllSelectedPerks().forEach(p => {
        if (p.dataset.name === name) {
            found = true;
        }
    });

    return found;
}


/* ================= DROP ================= */

slots.forEach(slot => {

    slot.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    slot.addEventListener("drop", () => {

        // 1. лимит 4
        if (getAllSelectedPerks().length >= 4) {
            alert("Max 4 perks!");
            return;
        }

        const perkType = draggedPerk.dataset.type;
        const slotType = slot.closest(".build_box").classList.contains("survivor")
            ? "survivor"
            : "killer";

        // 2. проверка типа (survivor/killer)
        if (perkType !== slotType) {
            alert("Wrong perk type!");
            return;
        }

        // 3. проверка дубля
        if (isAlreadySelected(draggedPerk.dataset.name)) {
            alert("Perk already selected!");
            return;
        }

        // 4. вставка
        const clone = draggedPerk.cloneNode(true);
        clone.setAttribute("draggable", "false");

        slot.appendChild(clone);
    });

});


/* ================= REMOVE ================= */

slots.forEach(slot => {
    slot.addEventListener("click", () => {
        slot.innerHTML = "";
    });
});

const somInput = document.getElementById("som");
const usdInput = document.getElementById("usd");
const cellInput = document.getElementById("cells");

let rates = {
    usd_per_cell: 0,
    som_per_cell: 0
};

fetch("../data/converter.json")
    .then(res => res.json())
    .then(data => {
        rates = data.rates;
        console.log("Auric loaded:", rates);
    })
    .catch(err => {
        console.error("JSON error:", err);
    });


somInput.addEventListener("input", () => {
    const som = +somInput.value;

    const cells = som / rates.som_per_cell;
    const usd = som / 89;

    cellInput.value = cells.toFixed(2);
    usdInput.value = usd.toFixed(2);
});


usdInput.addEventListener("input", () => {
    const usd = +usdInput.value;

    const cells = usd / rates.usd_per_cell;
    const som = usd * 89;

    cellInput.value = cells.toFixed(2);
    somInput.value = som.toFixed(2);
});


cellInput.addEventListener("input", () => {
    const cells = +cellInput.value;

    const usd = cells * rates.usd_per_cell;
    const som = cells * rates.som_per_cell;

    usdInput.value = usd.toFixed(2);
    somInput.value = som.toFixed(2);
});