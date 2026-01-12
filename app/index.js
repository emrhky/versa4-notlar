import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

const rows = [];
for (let i = 0; i < 4; i++) {
  rows.push({
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
    if (notes[i]) {
      // Metni String'e zorla ve ata
      let content = String(notes[i]);
      row.txt.text = content.substring(0, 20);
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        detailTitle.text = content;
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
      row.txt.text = ""; // Eski metni temizle
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
