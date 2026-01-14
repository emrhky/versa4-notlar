import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";
import { locale } from "user-settings";

// Dil Sözlüğü
const isTr = locale.language.startsWith("tr");
const ui = {
  empty: isTr ? "Henüz bir notunuz yok. Lütfen telefon uygulamasından ekleyin." : "No notes yet. Please add a note from the phone app.",
  back: isTr ? "GERİ" : "BACK",
  del: isTr ? "SİL" : "DELETE",
  conf: isTr ? "Silinsin mi?" : "Delete note?",
  yes: isTr ? "EVET" : "YES",
  no: isTr ? "HAYIR" : "NO"
};

const clockLabel = document.getElementById("clock-label");
const emptyLabel = document.getElementById("empty-label");
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailHeaderBg = document.getElementById("detail-header-bg");
const detailHeaderTxt = document.getElementById("detail-header-txt");
const detailTimestamp = document.getElementById("detail-timestamp");

const btnBack = document.getElementById("btn-back");
const btnDeleteInit = document.getElementById("btn-delete-init");
const confirmView = document.getElementById("confirm-view");
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");

// UI Metinlerini dile göre ata
emptyLabel.text = ui.empty;
document.getElementById("txt-back").text = ui.back;
document.getElementById("txt-del").text = ui.del;
document.getElementById("txt-conf").text = ui.conf;
document.getElementById("txt-yes").text = ui.yes;
document.getElementById("txt-no").text = ui.no;

const FILE_NAME = "notlar.json";
let notes = [];
let currentIdx = -1;

clock.granularity = "minutes";
clock.ontick = (evt) => {
  let today = evt.date;
  clockLabel.text = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);
};

// V3.71 - 5 Slot
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
} catch (e) { notes = []; render(); }

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    fs.writeFileSync(FILE_NAME, notes, "json");
    render();
  }
};

function render() {
  emptyLabel.style.display = (notes.length === 0) ? "inline" : "none";

  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      row.rect.style.fill = String(notes[i].bgColor);
      row.txt.style.fill = String(notes[i].txtColor);
      
      row.rect.onclick = () => {
        currentIdx = i;
        detailHeaderBg.style.fill = String(notes[i].bgColor);
        detailHeaderTxt.style.fill = String(notes[i].txtColor);
        detailHeaderTxt.text = String(notes[i].title);
        detailTitle.text = String(notes[i].content);
        
        // Beyaz yazı istisnası (V3.71)
        if (notes[i].txtColor === "white" || notes[i].txtColor === "#FFFFFF") {
           detailTitle.style.fill = "black";
        } else {
           detailTitle.style.fill = String(notes[i].txtColor);
        }
        
        detailTimestamp.text = String(notes[i].timestamp || "");
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
