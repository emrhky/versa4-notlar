import document from "document";
import * as messaging from "messaging";

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailText = document.getElementById("detail-text");
const btnBack = document.getElementById("btn-back");

let notes = [];

function updateUI() {
  for (let i = 0; i < 2; i++) {
    let rct = document.getElementById("rect-" + i);
    let txt = document.getElementById("text-" + i);
    if (notes[i] && rct && txt) {
      txt.text = notes[i].title || "Not " + (i+1);
      rct.onclick = () => {
        detailTitle.text = notes[i].title || "";
        detailText.text = notes[i].content || "";
        detailView.style.display = "inline";
      };
    }
  }
}

messaging.peerSocket.onmessage = (evt) => {
  notes = evt.data;
  updateUI();
};

if (btnBack) {
  btnBack.onclick = () => { detailView.style.display = "none"; };
}
