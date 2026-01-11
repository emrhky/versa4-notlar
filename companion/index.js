import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

// Ayarlar değiştiğinde saate gönder
settingsStorage.onchange = (evt) => {
  sendData();
};

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const notesData = settingsStorage.getItem("notes");
    if (notesData) {
      messaging.peerSocket.send(JSON.parse(notesData));
    }
  }
}

// Bağlantı kurulduğunda veriyi gönder
messaging.peerSocket.onopen = () => {
  sendData();
};
