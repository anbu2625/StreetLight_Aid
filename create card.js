// createCard.js
export function initCreateCard(containerId, buttonId) {
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  button.addEventListener("click", () => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<p>New Card</p>`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", () => card.remove());

    card.appendChild(delBtn);
    container.appendChild(card);
  });
}
