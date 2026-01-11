import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";

const list = document.getElementById("list");
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

try {
  notes = fs.readFileSync("notes.json", "json");
} catch (e) {
  notes = [];
}

function updateUI() {
  for (let i = 0; i < 10; i++) {
    let item = document.getElementById(`note-${i}`);
    let btn = document.getElementById(`btn-${i}`);
    if (notes[i]) {
      item.style.display = "inline";
      btn.text = notes[i].title;
      btn.onclick = () => showDetail(i);
    } else {
      item.style.display = "none";
    }
  }
}

function showDetail(index) {
  detailTitle.text = notes[index].title;
  detailText.text = notes[index].content;
  detailView.style.display = "inline";
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};

messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  fs.writeFileSync("notes.json", notes, "json");
  updateUI();
};

updateUI();
