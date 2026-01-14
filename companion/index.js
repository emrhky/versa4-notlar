import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendAll() {
  if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) return;
  
  // 1. Notları Temizle ve Gönder
  const notes = settingsStorage.getItem("notes_list");
  if (notes) {
    const raw = JSON.parse(notes);
    const clean = raw.map(item => {
      let parts = item.name.split('|');
      return { 
        title: parts[0] ? parts[0].trim() : "Başlıksız", 
        content: parts[1] ? parts[1].trim() : "", 
        bgColor: item.bgColor || "black",
        txtColor: item.txtColor || "white",
        timestamp: item.timestamp || ""
      };
    });
    messaging.peerSocket.send(clean);
  }

  // 2. Checklist Verisini Gönder
  const list = settingsStorage.getItem("checklist_data");
  if (list) {
    messaging.peerSocket.send({ type: "checklist", data: JSON.parse(list) });
  }
}

settingsStorage.onchange = sendAll;
messaging.peerSocket.onopen = sendAll;

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data && evt.data.action === "delete") {
    let current = JSON.parse(settingsStorage.getItem("notes_list") || "[]");
    current.splice(evt.data.index, 1);
    settingsStorage.setItem("notes_list", JSON.stringify(current));
    sendAll();
  }
};
