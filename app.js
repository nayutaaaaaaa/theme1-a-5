const dateInput = document.getElementById("date-input");
const timeInput = document.getElementById("time-input");
const shiftNameInput = document.getElementById("shift-name");
const addButton = document.getElementById("add-button");
const shiftList = document.getElementById("shift-list");

addButton.addEventListener("click", () => {
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();
  const shiftName = shiftNameInput.value.trim();

  if (!date || !time || !shiftName) return;

  const li = document.createElement("li");
  li.textContent = `${date} ${time} ${shiftName}`;
  shiftList.appendChild(li);

  dateInput.value = "";
  timeInput.value = "";
  shiftNameInput.value = "";
});