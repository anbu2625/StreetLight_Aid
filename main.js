// main.js
import { createProfileCard } from './profileCard.js';

const container = document.getElementById("profileContainer");
const addProfileBtn = document.getElementById("addProfile");

addProfileBtn.addEventListener("click", () => {
  const name = prompt("Enter Name:");
  const role = prompt("Enter Role:");

  if (name && role) {
    const card = createProfileCard(name, role);
    container.appendChild(card);
  } else {
    alert("Please enter both name and role!");
  }
});
