import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Ayarlardan veriyi ham olarak al
    let data = settingsStorage.getItem("not_icerigi");
    if (data) {
      // Fitbit ayarları veriyi bazen {"name":"not"} şeklinde tutar, onu ayıklayalım
      try {
        let parsed = JSON.parse(data);
        let text = typeof parsed === 'object' ? (parsed.name || parsed) : parsed;
        messaging.peerSocket.send(text);
        console.log("Gonderildi: " + text);
      } catch(e) {
        messaging.peerSocket.send(data);
      }
    }
  }
}

settingsStorage.onchange = () => { sendData(); };
messaging.peerSocket.onopen = () => { sendData(); };
