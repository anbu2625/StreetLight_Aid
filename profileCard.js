// profileCard.js
export function createProfileCard(name, role) {
  const card = document.createElement('div');
  card.className = 'profile-card';
  card.innerHTML = `<h3>${name}</h3><p>${role}</p>`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => card.remove());

  card.appendChild(removeBtn);
  return card;
}
