import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      const raw = JSON.parse(data);
      const clean = raw.map(item => (typeof item === 'object' ? item.name : item));
      messaging.peerSocket.send(clean);
    }
  }
}

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
