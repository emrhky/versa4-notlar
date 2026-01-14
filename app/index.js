import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";
import { locale } from "user-settings";

// --- Dil Ayarları (Güvenli Kontrol) ---
const getLang = () => {
  try {
    return (locale.language && locale.language.indexOf("tr") === 0) ? "tr" : "en";
  } catch (e) { return "en"; }
};

const ui = {
  tr: { empty: "Henüz bir notunuz yok. Lütfen telefondan ekleyin.", back: "GERİ", del: "SİL", conf: "Silinsin mi?", yes: "EVET", no: "HAYIR" },
  en: { empty: "No notes yet. Please add a note from the phone app.", back: "BACK", del: "DELETE", conf: "Delete note?", yes: "YES", no: "NO" }
}[getLang()];

// --- Elementleri Tanımla ---
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

// UI Metinlerini Güvenli Ata
const setUI = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.text = text;
};

setUI("empty-label", ui.empty);
setUI("txt-back", ui.back);
setUI("txt-del", ui.del);
setUI("txt-conf", ui.conf);
setUI("txt-yes", ui.yes);
setUI("txt-no", ui.no);

// --- Saat İşlemi (En Üstte Olmalı) ---
clock.granularity = "minutes";
clock.ontick = (evt) => {
  if (clockLabel) {
    clockLabel.text = ("0" + evt.date.getHours()).slice(-2) + ":" + ("0" + evt.date.getMinutes()).slice(-2);
  }
};

const FILE_NAME = "notlar.json";
let notes = [];
let currentIdx = -1;

const rows = [];
for (let i = 0; i < 5; i++) {
  const r = {
    group: document.getElementById(`group-${i}`),
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  };
  if (r.group) rows.push(r);
}

// --- Dosya Sistemi ---
const loadNotes = () => {
  try {
    if (fs.existsSync(FILE_NAME)) {
      notes = fs.readFileSync(FILE_NAME, "json");
      render();
    }
  } catch (e) { notes = []; render(); }
};

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    fs.writeFileSync(FILE_NAME, notes, "json");
    render();
  }
};

function render() {
  if (emptyLabel) emptyLabel.style.display = (notes.length === 0) ? "inline" : "none";

  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      row.rect.style.fill = String(notes[i].bgColor);
      row.txt.style.fill = String(notes[i].txtColor);
      
      row.rect.onclick = () => {
        currentIdx = i;
        if (detailHeaderBg) detailHeaderBg.style.fill = String(notes[i].bgColor);
        if (detailHeaderTxt) {
          detailHeaderTxt.style.fill = String(notes[i].txtColor);
          detailHeaderTxt.text = String(notes[i].title);
        }
        if (detailTitle) {
          detailTitle.text = String(notes[i].content);
          detailTitle.style.fill = (notes[i].txtColor === "white" || notes[i].txtColor === "#FFFFFF") ? "black" : String(notes[i].txtColor);
        }
        if (detailTimestamp) detailTimestamp.text = String(notes[i].timestamp || "");
        if (detailView) detailView.style.display = "inline";
      };
    } else {
      row.group.style.display = "none";
    }
  });
}

if (btnBack) btnBack.onclick = () => { detailView.style.display = "none"; };
if (btnDeleteInit) btnDeleteInit.onclick = () => { confirmView.style.display = "inline"; };
if (btnNo) btnNo.onclick = () => { confirmView.style.display = "none"; };
if (btnYes) btnYes.onclick = () => {
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

loadNotes();
