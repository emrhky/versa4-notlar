import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

// Kayıtlı notları oku
try {
  notes = fs.readFileSync("notes.json", "json") || [];
} catch (e) {
  notes = [];
}

function updateUI() {
  for (let i = 0; i < 10; i++) {
    let item = document.getElementById(`note-${i}`);
    let btn = document.getElementById(`btn-${i}`);
    
    // Eğer XML'de bu slot varsa işlem yap
    if (item && btn) {
      if (notes[i]) {
        item.style.display = "inline";
        btn.text = notes[i].title;
        btn.onclick = () => showDetail(i);
      } else {
        item.style.display = "none";
      }
    }
  }
}

function showDetail(index) {
  if (notes[index]) {
    detailTitle.text = notes[index].title;
    detailText.text = notes[index].content;
    detailView.style.display = "inline";
  }
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};

// Telefondan mesaj geldiğinde
messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  try {
    fs.writeFileSync("notes.json", notes, "json");
  } catch(e) {}
  updateUI();
};

// Açılışta çalıştır
updateUI();
