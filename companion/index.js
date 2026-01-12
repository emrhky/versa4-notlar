import { settingsStorage } from "settings";
import * as messaging from "messaging";

// Saat ile JSON halinde notları paylaş
function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");

    if (data) {
      try {
        const raw = JSON.parse(data);

        // Settings'teki format:
        // { name: "Başlık", value: "İçerik" }
        const formatted = raw.map(item => ({
          title: item.name || "",
          content: item.value || ""
        }));

        messaging.peerSocket.send({
          key: "notes",
          newValue: JSON.stringify(formatted)
        });

      } catch (e) {
        console.log("Parse error:", e);
      }
    }
  }
}

// Settings değişince → saati güncelle
settingsStorage.onchange = sendData;

// Saat bağlantı açınca → veriyi gönder
messaging.peerSocket.onopen = sendData;
