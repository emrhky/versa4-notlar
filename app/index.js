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
      // BAŞLIĞI GÜVENLİ ŞEKİLDE AL
      // Eğer başlık varsa onu, yoksa içeriğin ilk 15 harfini al
      let displayTitle = notes[i].title && notes[i].title !== "Başlıksız" 
                         ? notes[i].title 
                         : String(notes[i].content).substring(0, 15);

      row.txt.text = String(displayTitle);
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        // İÇERİĞİ GÜVENLİ ŞEKİLDE AL
        detailTitle.text = String(notes[i].content);
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
