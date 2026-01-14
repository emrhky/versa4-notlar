import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";

// Elementler
const detailView = document.getElementById("detail-view");
const checklistView = document.getElementById("checklist-view");
const btnOpenList = document.getElementById("btn-open-list");
const btnListBack = document.getElementById("btn-list-back");

let notes = [];
let checklist = [];
const FILE_NOTES = "notlar.json";
const FILE_LIST = "checklist.json";

// Saat
clock.granularity = "minutes";
clock.ontick = (evt) => {
  document.getElementById("clock-label").text = ("0" + evt.date.getHours()).slice(-2) + ":" + ("0" + evt.date.getMinutes()).slice(-2);
};

// --- YÜKLEME ---
try {
  if (fs.existsSync(FILE_NOTES)) notes = fs.readFileSync(FILE_NOTES, "json");
  if (fs.existsSync(FILE_LIST)) checklist = fs.readFileSync(FILE_LIST, "json");
} catch(e) {}

// --- MESAJLAŞMA ---
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.type === "checklist") {
    checklist = evt.data.data;
    fs.writeFileSync(FILE_LIST, checklist, "json");
  } else {
    notes = evt.data;
    fs.writeFileSync(FILE_NOTES, notes, "json");
  }
  render();
};

// --- RENDER FONKSİYONLARI ---
function render() {
  // Notlar
  for (let i = 0; i < 5; i++) {
    let g = document.getElementById(`group-${i}`);
    if (notes[i]) {
      g.style.display = "inline";
      document.getElementById(`text-${i}`).text = notes[i].title;
      document.getElementById(`rect-${i}`).style.fill = notes[i].bgColor;
      document.getElementById(`rect-${i}`).onclick = () => openNote(i);
    } else { g.style.display = "none"; }
  }
  // Liste Butonu
  btnOpenList.style.display = (checklist.length > 0) ? "inline" : "none";
}

function renderChecklist() {
  for (let i = 0; i < 5; i++) {
    let g = document.getElementById(`li-${i}`);
    if (checklist[i]) {
      g.style.display = "inline";
      document.getElementById(`lit-${i}`).text = (checklist[i].checked ? "✓ " : "□ ") + checklist[i].text;
      document.getElementById(`chk-${i}`).style.fill = checklist[i].checked ? "#008800" : "#333333";
      document.getElementById(`chk-${i}`).onclick = () => {
        checklist[i].checked = !checklist[i].checked;
        fs.writeFileSync(FILE_LIST, checklist, "json");
        renderChecklist();
      };
    } else { g.style.display = "none"; }
  }
}

// --- OLAYLAR ---
function openNote(idx) {
  document.getElementById("detail-header-bg").style.fill = notes[idx].bgColor;
  document.getElementById("detail-header-txt").text = notes[idx].title;
  document.getElementById("detail-title").text = notes[idx].content;
  detailView.style.display = "inline";
  document.getElementById("btn-back").onclick = () => detailView.style.display = "none";
}

btnOpenList.onclick = () => {
  renderChecklist();
  checklistView.style.display = "inline";
};

btnListBack.onclick = () => checklistView.style.display = "none";

render();
