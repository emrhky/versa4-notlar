import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendAll() {
  if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) return;
  
  // Notları Gönder
  const notes = settingsStorage.getItem("notes_list");
  if (notes) {
    const raw = JSON.parse(notes);
    const clean = raw.map(item => {
      let parts = item.name.split('|');
      return { 
        title: parts[0].trim(), 
        content: parts[1] || "", 
        bgColor: item.bgColor || "black" 
      };
    });
    messaging.peerSocket.send(clean);
  }

  // Listeyi Gönder
  const list = settingsStorage.getItem("checklist_data");
  if (list) {
    messaging.peerSocket.send({ type: "checklist", data: JSON.parse(list) });
  }
}

settingsStorage.onchange = sendAll;
messaging.peerSocket.onopen = sendAll;
