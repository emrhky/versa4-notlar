import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendAllNotes() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      try {
        const rawNotes = JSON.parse(data);
        // Fitbit AdditiveList formatını sade metin dizisine çeviriyoruz
        const cleanNotes = rawNotes.map(item => {
          return typeof item === 'object' ? (item.name || JSON.stringify(item)) : item;
        });
        messaging.peerSocket.send(cleanNotes);
      } catch(e) {
        console.log("Dönüştürme hatası");
      }
    }
  }
}

settingsStorage.onchange = () => { sendAllNotes(); };
messaging.peerSocket.onopen = () => { sendAllNotes(); };
