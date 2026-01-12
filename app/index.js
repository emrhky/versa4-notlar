import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

const rows = [];
for (let i = 0; i < 4; i++) {
  rows.push({
    rect: document.getElementById("rect-" + i),
    txt: document.getElementById("text-" + i)
  });
}

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    render();
  }
};

function render() {
  rows.forEach((row, i) => {
    if (notes[i]) {
      // Listeye 1-2-3-4 yazdırıyoruz (Garantili görünürlük)
      row.txt.text = "NOT " + (i + 1);
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        // Detay ekranına içeriği basıyoruz
        let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
        detailTitle.text = String(content).substring(0, 120); 
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
      row.txt.text = "";
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
