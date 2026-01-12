import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendCleanNotes() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      try {
        const raw = JSON.parse(data);
        // Objeleri metne dönüştür: [{"name":"Not1"}] -> ["Not1"]
        const clean = raw.map(item => (typeof item === 'object' ? item.name : item));
        messaging.peerSocket.send(clean);
      } catch(e) { console.log("Hata: " + e); }
    }
  }
}

settingsStorage.onchange = sendCleanNotes;
messaging.peerSocket.onopen = sendCleanNotes;
