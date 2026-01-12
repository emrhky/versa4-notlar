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
      // Gelen veriyi string'e çevir
      let fullText = String(notes[i]);
      
      // Gri şeritte ilk 15 karakteri göster (Başlık niyetine)
      row.txt.text = fullText.substring(0, 15) + "...";
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        // Detayda tüm metni göster
        detailTitle.text = fullText;
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
