import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";

// Elementleri en basit yolla alıyoruz
const mainView = document.getElementById("main-view");
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

// Notları yükleme fonksiyonu (Daha güvenli)
function loadNotes() {
  try {
    if (fs.existsSync("notes.json")) {
      notes = fs.readFileSync("notes.json", "json");
    }
  } catch (e) {
    console.log("Not yukleme hatasi: " + e);
    notes = [];
  }
}

function updateUI() {
  for (let i = 0; i < 4; i++) {
    let btn = document.getElementById("btn-" + i);
    if (btn) {
      if (notes && notes[i]) {
        btn.text = notes[i].title || "Not " + (i+1);
        btn.style.display = "inline";
        btn.onclick = function() {
          detailTitle.text = notes[i].title || "";
          detailText.text = notes[i].content || "";
          detailView.style.display = "inline";
        };
      } else {
        btn.style.display = "none";
      }
    }
  }
}

// Geri tuşu kontrolü
if (btnBack) {
  btnBack.onclick = function() {
    detailView.style.display = "none";
  };
}

// Bağlantı kontrolü
messaging.peerSocket.onmessage = function(evt) {
  notes = evt.data;
  try {
    fs.writeFileSync("notes.json", notes, "json");
  } catch(e) {}
  updateUI();
};

// İlk açılış
loadNotes();
updateUI();
