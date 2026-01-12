import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
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
  if (evt.data) {
    notes = evt.data;
    render();
  }
};

function render() {
  rows.forEach((row, i) => {
    if (notes[i]) {
      row.txt.text = String(notes[i].title); // Listede başlığı göster
      row.rect.style.display = "inline";
      row.rect.onclick = () => {
        detailTitle.text = String(notes[i].title);
        detailText.text = String(notes[i].content); // Detayda içeriği göster
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
    }
  });
}

btnBack.onclick = () => { detailView.style.display = "none"; };
