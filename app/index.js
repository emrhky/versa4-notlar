import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

// Grupları yakalıyoruz
const rows = [];
for (let i = 0; i < 4; i++) {
  rows.push({
    group: document.getElementById(`group-${i}`),
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  });
}

messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  render();
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      // Sadece grubu görünür yapıyoruz, içindekiler (rect ve text) zaten hazır
      row.group.style.display = "inline";
      
      // Tıklama olayını kutuya bağlıyoruz
      row.rect.onclick = () => {
        let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
        detailTitle.text = String(content);
        detailView.style.display = "inline";
      };
    } else {
      // Not yoksa grubu komple gizle
      row.group.style.display = "none";
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
