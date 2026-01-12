import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");

let notes = [];

// 3 satırlık liste elemanları
const rows = [
  { rect: document.getElementById("rect-0"), txt: document.getElementById("text-0") },
  { rect: document.getElementById("rect-1"), txt: document.getElementById("text-1") },
  { rect: document.getElementById("rect-2"), txt: document.getElementById("text-2") }
];

// Companion'dan veri geldiğinde
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.key === "notes") {
    try {
      notes = JSON.parse(evt.data.newValue);
    } catch (e) {
      console.log("JSON Parse Error:", e);
      notes = [];
    }
    render();
  }
};

// Listeyi ekrana çiz
function render() {
  rows.forEach((row, i) => {
    if (notes[i]) {
      const item = notes[i];

      // Başlık varsa title, yoksa ilk 20 karakter
      const title = item.title
        ? item.title.substring(0, 20)
        : String(item).substring(0, 20);

      row.txt.text = title;
      row.rect.style.display = "inline";

      row.rect.onclick = () => {
        detailTitle.text = item.content || item.title || String(item);
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
    }
  });
}

// Geri butonu
btnBack.onclick = () => {
  detailView.style.display = "none";
};
