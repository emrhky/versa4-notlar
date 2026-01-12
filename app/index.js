import document from "document";
import * as messaging from "messaging";

let notes = [];
let settings = { color: "white", textSize: "medium", showNumbers: false };

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");

const rows = [
  { rect: document.getElementById("rect-0"), txt: document.getElementById("text-0") },
  { rect: document.getElementById("rect-1"), txt: document.getElementById("text-1") },
  { rect: document.getElementById("rect-2"), txt: document.getElementById("text-2") }
];

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.type === "notes") {
    notes = evt.data.payload;
  } else if (evt.data.type === "settings") {
    settings = evt.data.payload;
  }
  render();
};

function render() {
  rows.forEach((row, i) => {
    if (notes[i]) {
      let content = typeof notes[i] === "object" ? notes[i].name : notes[i];
      let prefix = settings.showNumbers ? `${i + 1}. ` : "";
      
      row.txt.text = prefix + String(content).substring(0, 20);
      row.txt.style.fill = settings.color || "white";
      
      row.rect.style.display = "inline";
      row.rect.onclick = () => {
        detailTitle.text = String(content);
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
    }
  });
}

btnBack.onclick = () => { detailView.style.display = "none"; };
