import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

// Satırları diziye alalım
const rows = [];
for (let i = 0; i < 4; i++) {
  rows.push({
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  });
}

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    render();
  }
};

function render() {
  notes.forEach((noteContent, i) => {
    if (rows[i]) {
      let safeText = String(noteContent).trim();
      rows[i].txt.text = safeText.substring(0, 20); // İlk 20 karakter
      rows[i].rect.style.display = "inline";
      
      rows[i].rect.onclick = () => {
        detailTitle.text = safeText; // Detayda tamamı
        detailView.style.display = "inline";
      };
    }
  });
}

if (btnBack) {
  btnBack.onclick = () => {
    detailView.style.display = "none";
  };
}
