const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const shiftNameInput = document.getElementById("shift-name");
const addButton = document.getElementById("add-button");
const shiftList = document.getElementById("shift-list");

const STORAGE_KEY = "shiftItems";

function loadShiftItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveShiftItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderShiftItems(items) {
  shiftList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.date} ${item.time} ${item.shiftName}`;
    shiftList.appendChild(li);
  });
}

let shiftItems = loadShiftItems();
renderShiftItems(shiftItems);

addButton.addEventListener("click", () => {
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();
  const shiftName = shiftNameInput.value.trim();

  if (!date || !time || !shiftName) return;

  const newItem = { date, time, shiftName };
  shiftItems.push(newItem);

  saveShiftItems(shiftItems);
  renderShiftItems(shiftItems);

  dateInput.value = "";
  timeInput.value = "";
  shiftNameInput.value = "";
});