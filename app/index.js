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
    if (notes && notes[i]) {
      // Metni ve kutuyu görünür yap
      row.rect.style.display = "inline";
      row.txt.style.display = "inline";
      
      // İçeriği ata
      row.txt.text = "NOT " + (i + 1);
      
      row.rect.onclick = () => {
        let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
        detailTitle.text = String(content);
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
      row.txt.style.display = "none";
      row.txt.text = "";
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
