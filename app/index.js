import document from "document";
import * as messaging from "messaging";

// Elemanları güvenli bir şekilde al
const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

function updateUI() {
  try {
    for (let i = 0; i < 3; i++) {
      let rct = document.getElementById("rect-" + i);
      let txt = document.getElementById("text-" + i);
      
      if (rct && txt) {
        if (notes && notes[i]) {
          txt.text = notes[i].title || "Adsiz Not";
          rct.style.display = "inline";
          rct.onclick = () => {
            if (detailTitle) detailTitle.text = notes[i].title || "";
            if (detailText) detailText.text = notes[i].content || "";
            if (detailView) detailView.style.display = "inline";
          };
        } else {
          rct.style.display = "none";
          txt.text = "";
        }
      }
    }
  } catch (e) {
    console.log("UI Hatasi: " + e);
  }
}

// Mesajlaşma kanalı kontrolü
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    updateUI();
  }
};

if (btnBack) {
  btnBack.onclick = () => { 
    if (detailView) detailView.style.display = "none"; 
  };
}

// Başlangıçta ekranın siyah kalmaması için statik bir yazı yazdıralım
if (detailTitle) detailTitle.text = "Not bekleniyor...";
updateUI();
