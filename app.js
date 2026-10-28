//各変数たちにhtml側のユーザー入力を代入
const dateInput = document.getElementById("date-input");
const startTimeInput = document.getElementById("start-time-input");
const endTimeInput = document.getElementById("end-time-input");
const shiftNameInput = document.getElementById("shift-name");
const addButton = document.getElementById("add-button");
const shiftTableBody = document.querySelector("#shift-list tbody");

//ブラウザ上で保存するための変数
const STORAGE_KEY = "shiftItems";

//保存したデータをロードする関数
function loadShiftItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

//入力されたデータを保存する関数
function saveShiftItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

//入力された日付から曜日を計算する関数
function getWeekdayLabel(dateString) {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const d = new Date(dateString);
  return Number.isNaN(d.getTime()) ? "" : days[d.getDay()];
}

//保存されたデータをロードする関数
function renderShiftItems(items) {
  shiftTableBody.innerHTML = "";
  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${getWeekdayLabel(item.date)}</td>
      <td>${item.startTime}</td>
      <td>${item.endTime}</td>
      <td>${item.shiftName}</td>
    `;
    shiftTableBody.appendChild(tr);
  });
}

let shiftItems = loadShiftItems();
renderShiftItems(shiftItems);   

function addShiftItem() {
  const date = dateInput.value.trim();
  const startTime = startTimeInput.value.trim();
  const endTime = endTimeInput.value.trim();
  const shiftName = shiftNameInput.value.trim();

  if (!date || !startTime || !endTime || !shiftName) return;

  shiftItems.push({ date, startTime, endTime, shiftName });
  saveShiftItems(shiftItems);
  renderShiftItems(shiftItems);

  dateInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  shiftNameInput.value = "";
}

addButton.addEventListener("click", addShiftItem);