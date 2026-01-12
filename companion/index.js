import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      const raw = JSON.parse(data);
      const clean = raw.map(item => {
        let full = typeof item === 'object' ? item.name : item;
        let parts = full.split('|');
        return {
          title: parts[0] ? parts[0].trim().substring(0, 20) : "Basliksiz",
          content: parts[1] ? parts[1].trim() : full.trim()
        };
      });
      messaging.peerSocket.send(clean);
    }
  }
}
settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
