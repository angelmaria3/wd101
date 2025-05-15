const form = document.getElementById("registrationForm");
const entriesTable = document.querySelector("#entriesTable tbody");
const message = document.getElementById("message");

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    entriesTable.innerHTML = "";
    entries.forEach(entry => {
        const row = entriesTable.insertRow();
        row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.terms}</td>
    `;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    message.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        message.textContent = "Age must be between 18 and 55.";
        return;
    }

    if (!terms) {
        message.textContent = "You must accept the terms and conditions.";
        return;
    }

    const entry = { name, email, password, dob, terms };
    let entries = JSON.parse(localStorage.getItem("userEntries")) || [];
    entries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(entries));

    form.reset();
    loadEntries();
});

window.onload = loadEntries;
