//各変数たちにhtml側のユーザー入力を代入
const dateInput = document.getElementById("date-input");              //日付入力欄
const startTimeInput = document.getElementById("start-time-input");   //開始時間入力欄
const endTimeInput = document.getElementById("end-time-input");     //終了時間入力欄
const shiftNameInput = document.getElementById("shift-name");         //シフト名入力欄
const addButton = document.getElementById("add-button");              //追加ボタン
const shiftTableBody = document.querySelector("#shift-list tbody");   //シフト一覧のtbody
const saveMessage = document.getElementById("save-message");          //保存メッセージ表示欄

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

//保存されたデータを実際の表に表示する関数
function renderShiftItems(items) {
  shiftTableBody.innerHTML = "";
  items.forEach((item) => {              //配列の要素を一つずつ取り出して、順番に処理する
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

let shiftItems = loadShiftItems();      //保存されているシフト一覧を読み込んで、変数 shiftItems に入れる
renderShiftItems(shiftItems);   

function showSaveMessage(message, isSuccess = true) {
  saveMessage.textContent = message;
  saveMessage.style.color = isSuccess ? "#1d7a39" : "#c0392b";
  saveMessage.style.fontWeight = "bold";
  saveMessage.style.display = "block";
}

function addShiftItem() {
  const date = dateInput.value.trim();
  const startTime = startTimeInput.value.trim();
  const endTime = endTimeInput.value.trim();
  const shiftName = shiftNameInput.value.trim();

  if (!date || !startTime || !endTime || !shiftName) return;

  shiftItems.push({ date, startTime, endTime, shiftName });
  saveShiftItems(shiftItems);
  renderShiftItems(shiftItems);

  showSaveMessage(`${shiftName} を登録しました。`);

  dateInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  shiftNameInput.value = "";
// 2秒後にメッセージを非表示にする
  setTimeout(() => {
    saveMessage.textContent = "";
    saveMessage.style.display = "none";
  }, 2000);
}

addButton.addEventListener("click", addShiftItem);