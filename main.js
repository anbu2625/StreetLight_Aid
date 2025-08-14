// main.js
import { createProfileCard } from './profileCard.js';
import greet, { add, multiply } from './mathUtils.js';

// ES6 demo
console.log(greet('Anbu'));
console.log('Add 2+3:', add(2, 3));
console.log('Multiply 2*3:', multiply(2, 3));

// ----- Generic Card Creator -----
const createCardBtn = document.getElementById('createCardBtn');
const cardContainer = document.getElementById('cardContainer');

createCardBtn.addEventListener('click', () => {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = 'New Card';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => card.remove());

  card.appendChild(deleteBtn);
  cardContainer.appendChild(card);
});

// ----- Profile Cards -----
const addProfileBtn = document.getElementById('addProfileBtn');
const profileContainer = document.getElementById('profileContainer');

addProfileBtn.addEventListener('click', () => {
  const name = prompt('Enter Name:');
  const role = prompt('Enter Role:');
  if (name && role) {
    const card = createProfileCard(name, role);
    profileContainer.appendChild(card);
  }
});
