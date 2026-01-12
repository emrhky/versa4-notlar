import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

const rows = [
  { rect: document.getElementById("rect-0"), txt: document.getElementById("text-0") },
  { rect: document.getElementById("rect-1"), txt: document.getElementById("text-1") },
  { rect: document.getElementById("rect-2"), txt: document.getElementById("text-2") }
];

messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  render();
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
      // "Geri Dön" yazısı gibi net görünecek
      row.txt.text = "NOT " + (i + 1); 
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        detailTitle.text = String(content).substring(0, 100);
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
      row.txt.text = "";
    }
  });
}

btnBack.onclick = () => { detailView.style.display = "none"; };
