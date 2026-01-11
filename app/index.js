import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

// Dosyadan notları yükle
function loadNotes() {
  try {
    if (fs.existsSync("notes.json")) {
      notes = fs.readFileSync("notes.json", "json");
    }
  } catch (e) {
    notes = [];
  }
}

function updateUI() {
  for (let i = 0; i < 4; i++) { // Kaç buton yaptıysan o kadar (şu an 4)
    let btn = document.getElementById(`btn-${i}`);
    if (btn) {
      if (notes && notes[i]) {
        btn.style.display = "inline";
        btn.text = notes[i].title || "Basliksiz";
        btn.onclick = () => {
          detailTitle.text = notes[i].title;
          detailText.text = notes[i].content;
          detailView.style.display = "inline";
        };
      } else {
        btn.style.display = "none";
      }
    }
  }
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};

// Telefon bağlantısı
messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  try {
    fs.writeFileSync("notes.json", notes, "json");
  } catch(e) {}
  updateUI();
};

// Başlangıç
loadNotes();
updateUI();
