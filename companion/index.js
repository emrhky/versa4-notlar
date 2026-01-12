import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendNotes() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      const raw = JSON.parse(data);
      const clean = raw.map(item => (typeof item === "object" ? item.name : item));
      messaging.peerSocket.send({ type: "notes", payload: clean });
    }
  }
}

function sendSettings() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Ayarları güvenli bir şekilde çekelim
    const getSetting = (key) => {
      let val = settingsStorage.getItem(key);
      try { return JSON.parse(val); } catch(e) { return null; }
    };

    const colorObj = getSetting("note_color");
    const sizeObj = getSetting("note_text_size");
    const numToggle = getSetting("show_numbers");

    messaging.peerSocket.send({
      type: "settings",
      payload: {
        color: colorObj ? colorObj.values[0].value : "white",
        textSize: sizeObj ? sizeObj.values[0].value : "medium",
        showNumbers: numToggle === true
      }
    });
  }
}

settingsStorage.onchange = () => { sendNotes(); sendSettings(); };
messaging.peerSocket.onopen = () => { sendNotes(); sendSettings(); };
