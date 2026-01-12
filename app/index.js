import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const btnBack = document.getElementById("btn-back");
let notes = [];

const rows = [];
for (let i = 0; i < 5; i++) {
  rows.push({
    group: document.getElementById(`group-${i}`),
    rect: document.getElementById(`rect-${i}`),
    txt: document.getElementById(`text-${i}`)
  });
}

messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  render();
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.rect.onclick = () => {
        let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
        
        // Textarea içeriğini String olarak güvenli bir boyutta atıyoruz
        detailTitle.text = String(content).substring(0, 300); 
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
