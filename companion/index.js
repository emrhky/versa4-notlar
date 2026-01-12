import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      const raw = JSON.parse(data);
      // Hem ismi hem içeriği paketliyoruz
      const clean = raw.map(item => ({
        title: item.name || "Başlıksız",
        // Eğer içerik için ayrı alan yoksa name'i kullan, varsa ek alanı kullan
        content: item.value || item.name 
      }));
      messaging.peerSocket.send(clean);
    }
  }
}

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
