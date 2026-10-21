const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const shiftNameInput = document.getElementById("shift-name");
const addButton = document.getElementById("add-button");
const shiftTableBody = document.querySelector("#shift-list tbody");

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

function getWeekdayLabel(dateString) {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const d = new Date(dateString);
  return Number.isNaN(d.getTime()) ? "" : days[d.getDay()];
}

function renderShiftItems(items) {
  shiftTableBody.innerHTML = "";
  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${getWeekdayLabel(item.date)}</td>
      <td>${item.time}</td>
      <td>${item.shiftName}</td>
    `;
    shiftTableBody.appendChild(tr);
  });
}

let shiftItems = loadShiftItems();
renderShiftItems(shiftItems);

addButton.addEventListener("click", () => {
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();
  const shiftName = shiftNameInput.value.trim();

  if (!date || !time || !shiftName) return;

  shiftItems.push({ date, time, shiftName });
  saveShiftItems(shiftItems);
  renderShiftItems(shiftItems);

  dateInput.value = "";
  timeInput.value = "";
  shiftNameInput.value = "";
});