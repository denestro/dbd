const modal = document.getElementById("modal");
const openBtn = document.querySelector(".btn");
const closeBtn = document.getElementById("closeModal");

const form = document.getElementById("killForm");


/* =========================
   OPEN MANUAL (KILL BUTTON)
========================= */
if (modal && openBtn) {
    openBtn.addEventListener("click", () => {
        modal.classList.add("active");
    });
}


/* =========================
   CLOSE MODAL
========================= */
function closeModal() {
    modal.classList.remove("active");
    sessionStorage.setItem("modalClosed", "true");
}

if (modal && closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}


/* =========================
   AUTO OPEN AFTER 10 SEC
========================= */

if (modal) {

    const alreadyClosed = sessionStorage.getItem("modalClosed");

    if (!alreadyClosed) {

        setTimeout(() => {
            modal.classList.add("active");
        }, 10000);

    }
}


/* =========================
   FORM SUBMIT
========================= */

if (form) {

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nickname = document.getElementById("nickname").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        const role = document.querySelector('input[name="role"]:checked');

        if (!nickname || !email || !phone || !role) {
            alert("Complete the trial form!");
            return;
        }

        alert(`${nickname}, welcome to the ${role.value} realm`);

        form.reset();

        closeModal();
    });

}