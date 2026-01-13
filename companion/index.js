import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      try {
        const raw = JSON.parse(data);
        const clean = raw.map(item => {
          let fullText = typeof item === 'object' ? item.name : item;
          let parts = fullText.split('|');
          return {
            // Başlığı 20 karakterle sınırlıyoruz (saat ekranı için)
            title: parts[0] ? parts[0].trim().substring(0, 20) : "Başlıksız",
            content: parts[1] ? parts[1].trim() : fullText.trim()
          };
        });
        messaging.peerSocket.send(clean);
      } catch(e) {
        console.log("Gönderim hatası");
      }
    }
  }
}

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
