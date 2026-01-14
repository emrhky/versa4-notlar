import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";

// Ana Değişkenler
const FILE_NOTES = "notlar.json";
const FILE_LIST = "checklist.json";
let notes = [];
let checklist = [];
let currentIdx = -1;

// Elementler
const clockLabel = document.getElementById("clock-label");
const emptyLabel = document.getElementById("empty-label");
const detailView = document.getElementById("detail-view");
const checklistView = document.getElementById("checklist-view");
const btnOpenList = document.getElementById("btn-open-list");

// Saat Ayarı
clock.granularity = "minutes";
clock.ontick = (evt) => {
  clockLabel.text = ("0" + evt.date.getHours()).slice(-2) + ":" + ("0" + evt.date.getMinutes()).slice(-2);
};

// Hafızadan Veri Yükleme
try {
  if (fs.existsSync(FILE_NOTES)) notes = fs.readFileSync(FILE_NOTES, "json");
  if (fs.existsSync(FILE_LIST)) checklist = fs.readFileSync(FILE_LIST, "json");
} catch(e) { console.log("Hafıza hatası"); }

// Telefon Mesajlarını Yakala
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

function render() {
  // Notlar Bölümü
  for (let i = 0; i < 5; i++) {
    let group = document.getElementById(`group-${i}`);
    if (notes[i]) {
      group.style.display = "inline";
      document.getElementById(`text-${i}`).text = notes[i].title;
      document.getElementById(`rect-${i}`).style.fill = notes[i].bgColor;
      document.getElementById(`text-${i}`).style.fill = notes[i].txtColor;
      document.getElementById(`rect-${i}`).onclick = () => openNote(i);
    } else {
      group.style.display = "none";
    }
  }
  
  // Eğer not yoksa uyarı, varsa liste butonu kontrolü
  emptyLabel.style.display = (notes.length === 0 && checklist.length === 0) ? "inline" : "none";
  btnOpenList.style.display = (checklist.length > 0) ? "inline" : "none";
}

function openNote(idx) {
  currentIdx = idx;
  document.getElementById("detail-header-bg").style.fill = notes[idx].bgColor;
  document.getElementById("detail-header-txt").style.fill = notes[idx].txtColor;
  document.getElementById("detail-header-txt").text = notes[idx].title;
  document.getElementById("detail-title").text = notes[idx].content;
  document.getElementById("detail-timestamp").text = notes[idx].timestamp || "";
  
  // Beyaz yazı okuma ayarı
  document.getElementById("detail-title").style.fill = (notes[idx].txtColor === "white" || notes[idx].txtColor === "#FFFFFF") ? "black" : notes[idx].txtColor;
  
  detailView.style.display = "inline";
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
        fs.writeFileSync(FILE_LIST, checklist, "json"); // Durumu kaydet
        renderChecklist();
      };
    } else { g.style.display = "none"; }
  }
}

// Buton Atamaları
btnOpenList.onclick = () => {
  renderChecklist();
  checklistView.style.display = "inline";
};
document.getElementById("btn-list-back").onclick = () => checklistView.style.display = "none";
document.getElementById("btn-back").onclick = () => detailView.style.display = "none";

// Silme İşlemi (Notlar için)
document.getElementById("btn-delete-init").onclick = () => { document.getElementById("confirm-view").style.display = "inline"; };
document.getElementById("btn-no").onclick = () => { document.getElementById("confirm-view").style.display = "none"; };
document.getElementById("btn-yes").onclick = () => {
  if (currentIdx > -1) {
    notes.splice(currentIdx, 1);
    fs.writeFileSync(FILE_NOTES, notes, "json");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send({ action: "delete", index: currentIdx });
    }
    document.getElementById("confirm-view").style.display = "none";
    detailView.style.display = "none";
    render();
  }
};

render();
