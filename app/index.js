import document from "document";
import * as messaging from "messaging";

// 5 adet not alanı (Daha fazla istersen SVG'ye de eklemelisin)
const noteTexts = [
  document.getElementById("text-0"),
  document.getElementById("text-1"),
  document.getElementById("text-2"),
  document.getElementById("text-3"),
  document.getElementById("text-4")
];

const rects = [
  document.getElementById("rect-0"),
  document.getElementById("rect-1"),
  document.getElementById("rect-2"),
  document.getElementById("rect-3"),
  document.getElementById("rect-4")
];

messaging.peerSocket.onmessage = (evt) => {
  const incomingNotes = evt.data; // Bu bir dizi []
  
  if (Array.isArray(incomingNotes)) {
    for (let i = 0; i < noteTexts.length; i++) {
      if (incomingNotes[i]) {
        noteTexts[i].text = incomingNotes[i].substring(0, 25);
        rects[i].style.display = "inline";
      } else {
        noteTexts[i].text = "";
        rects[i].style.display = "none";
      }
    }
  }
};

messaging.peerSocket.onopen = () => {
  console.log("Bağlantı aktif");
};
