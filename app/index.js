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
  notes.forEach((note, i) => {
    if (rows[i]) {
      // Listede başlığı göster (Beyaz)
      rows[i].txt.text = String(note.title);
      rows[i].rect.style.display = "inline";
      
      rows[i].rect.onclick = () => {
        // Detayda mavi başlık ve beyaz içerik
        detailTitle.text = String(note.title);
        detailText.text = String(note.content);
        detailView.style.display = "inline";
      };
    }
  });
}

btnBack.onclick = () => { detailView.style.display = "none"; };
