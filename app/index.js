import document from "document";
import * as messaging from "messaging";

let notes = [];
let settings = {
  color: "white",
  textSize: "medium",
  showNumbers: false
};

// UI Elemanları
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");

// 3 satırlık liste alanı (Fitbit Verse 4 uyumlu)
const rows = [
  { rect: document.getElementById("rect-0"), txt: document.getElementById("text-0") },
  { rect: document.getElementById("rect-1"), txt: document.getElementById("text-1") },
  { rect: document.getElementById("rect-2"), txt: document.getElementById("text-2") }
];

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.type === "notes") {
    notes = evt.data.payload;
  }
  if (evt.data.type === "settings") {
    settings = evt.data.payload;
  }
  render();
};

function applySettings(row) {
  // Renk
  row.txt.style.fill = settings.color;

  // Yazı boyutu
  if (settings.textSize === "small") row.txt.style.fontSize = 18;
  if (settings.textSize === "medium") row.txt.style.fontSize = 24;
  if (settings.textSize === "large") row.txt.style.fontSize = 32;
}

function render() {
  rows.forEach((row, i) => {
    if (notes[i]) {
      let content = String(notes[i]);
      
      let prefix = settings.showNumbers ? `${i + 1}. ` : "";
      row.txt.text = prefix + content.substring(0, 20);

      applySettings(row);

      row.rect.style.display = "inline";
      row.rect.onclick = () => {
        detailTitle.text = content;
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
