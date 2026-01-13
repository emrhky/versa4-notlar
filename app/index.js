import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";

const detailTimestamp = document.getElementById("detail-timestamp");
// ... (diğer tanımlamalar aynı) ...

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      
      // Renk Fix: Doğrudan atama
      row.rect.style.fill = notes[i].bgColor;
      row.txt.style.fill = notes[i].txtColor;
      
      row.rect.onclick = () => {
        currentIdx = i;
        detailHeaderBg.style.fill = notes[i].bgColor;
        detailHeaderTxt.style.fill = notes[i].txtColor;
        detailHeaderTxt.text = String(notes[i].title);
        
        detailTitle.text = String(notes[i].content);
        detailTitle.style.fill = notes[i].txtColor; 
        
        // Zaman damgasını bas
        detailTimestamp.text = String(notes[i].timestamp || "");
        
        detailView.style.display = "inline";
      };
    } else {
      row.group.style.display = "none";
    }
  });
}
// ... (geri kalan kodlar aynı) ...
