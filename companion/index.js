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
          
          // Notu ":" karakterine göre bölmeye çalış (Başlık: İçerik mantığı)
          let parts = fullText.split(':');
          if (parts.length > 1) {
            return {
              title: parts[0].trim(),
              content: parts.slice(1).join(':').trim()
            };
          } else {
            return {
              title: fullText.substring(0, 20), // İlk 20 karakter başlık
              content: fullText
            };
          }
        });
        messaging.peerSocket.send(clean);
      } catch(e) { console.log("Hata: " + e); }
    }
  }
}

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
