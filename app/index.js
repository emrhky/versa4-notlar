import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";

const clockLabel = document.getElementById("clock-label");
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
const btnDeleteInit = document.getElementById("btn-delete-init");
const confirmView = document.getElementById("confirm-view");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");

const FILE_NAME = "notlar.json";
let notes = [];
let currentIdx = -1;

clock.granularity = "minutes";
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = ("0" + today.getHours()).slice(-2);
  let mins = ("0" + today.getMinutes()).slice(-2);
  clockLabel.text = `${hours}:${mins}`;
};

const rows = [];
for (let i = 0; i < 5; i++) {
  rows.push({
    group: document.getElementById(`group-${i}`),
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  });
}

try {
  if (fs.existsSync(FILE_NAME)) {
    notes = fs.readFileSync(FILE_NAME, "json");
    render();
  }
} catch (e) { notes = []; }

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    fs.writeFileSync(FILE_NAME, notes, "json");
    render();
  }
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      row.rect.style.fill = notes[i].bgColor || "#333333";
      row.txt.style.fill = notes[i].txtColor || "#FFFFFF";
      
      row.rect.onclick = () => {
        currentIdx = i;
        detailTitle.text = String(notes[i].content);
        detailTitle.style.fill = notes[i].txtColor || "#00ffff";
        detailView.style.display = "inline";
      };
    } else {
      row.group.style.display = "none";
    }
  });
}

btnBack.onclick = () => { detailView.style.display = "none"; };
btnDeleteInit.onclick = () => { confirmView.style.display = "inline"; };
btnNo.onclick = () => { confirmView.style.display = "none"; };
btnYes.onclick = () => {
  if (currentIdx > -1) {
    notes.splice(currentIdx, 1);
    fs.writeFileSync(FILE_NAME, notes, "json");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send({ action: "delete", index: currentIdx });
    }
    confirmView.style.display = "none";
    detailView.style.display = "none";
    render();
    currentIdx = -1;
  }
};
