import document from "document";
import * as messaging from "messaging";
import * as fs from "fs"; // Saatin hafızasına yazmak için gerekli kütüphane

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
const FILE_NAME = "notlar.json"; // Notların saklanacağı dosya adı
let notes = [];

const rows = [];
for (let i = 0; i < 5; i++) {
  rows.push({
    group: document.getElementById(`group-${i}`),
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  });
}

// --- 1. ADIM: Uygulama açıldığında hafızadaki eski notları yükle ---
try {
  if (fs.existsSync(FILE_NAME)) {
    notes = fs.readFileSync(FILE_NAME, "json");
    console.log("Notlar hafızadan yüklendi.");
  }
} catch (e) {
  console.log("Hafıza okuma hatası: " + e);
  notes = [];
}

// İlk açılışta yüklenen (varsa) notları ekrana bas
render();

// --- 2. ADIM: Telefondan yeni veri geldiğinde hem güncelle hem kaydet ---
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data) {
    notes = evt.data;
    // Gelen yeni veriyi saatin hafızasına kalıcı olarak yaz
    fs.writeFileSync(FILE_NAME, notes, "json");
    console.log("Yeni notlar hafızaya kaydedildi.");
    render();
  }
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      
      row.rect.onclick = () => {
        detailTitle.text = String(notes[i].content);
        detailView.style.display = "inline";
      };
    } else {
      row.group.style.display = "none";
    }
  });
}

btnBack.onclick = () => {
  detailView.style.display = "none";
};
