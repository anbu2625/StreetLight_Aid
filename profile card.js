// profileCard.js
export function initProfileCard(containerId, buttonId) {
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  button.addEventListener("click", () => {
    const name = prompt("Enter Name:");
    const role = prompt("Enter Role:");

    if (name && role) {
      const profileCard = document.createElement("div");
      profileCard.className = "profile-card";
      profileCard.innerHTML = `<h3>${name}</h3><p>${role}</p>`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
      removeBtn.addEventListener("click", () => profileCard.remove());

      profileCard.appendChild(removeBtn);
      container.appendChild(profileCard);
    } else {
      alert("Please enter both name and role!");
    }
  });
}
