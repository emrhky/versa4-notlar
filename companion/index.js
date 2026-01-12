import { settingsStorage } from "settings";
import * as messaging from "messaging";

// Notları gönder
function sendNotes() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");

    if (data) {
      const raw = JSON.parse(data);
      const clean = raw.map(item => typeof item === "object" ? item.name : item);

      messaging.peerSocket.send({
        type: "notes",
        payload: clean
      });
    }
  }
}

// Ayarları gönder
function sendSettings() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      type: "settings",
      payload: {
        color: JSON.parse(settingsStorage.getItem("note_color") || `"white"`),
        textSize: JSON.parse(settingsStorage.getItem("note_text_size") || `"medium"`),
        showNumbers: JSON.parse(settingsStorage.getItem("show_numbers") || "false")
      }
    });
  }
}

// Tüm değişikliklerde gönder
settingsStorage.onchange = () => {
  sendNotes();
  sendSettings();
};

// Bağlanınca gönder
messaging.peerSocket.onopen = () => {
  sendNotes();
  sendSettings();
};
