import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendSingleNote() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Sadece ilk notu al veya test mesajı gönder
    let data = settingsStorage.getItem("notes");
    if (data) {
      let notes = JSON.parse(data);
      // Sadece ilk notu dizi içinde gönderiyoruz
      messaging.peerSocket.send([notes[0]]);
      console.log("Not saate gonderildi");
    }
  } else {
    console.log("Baglanti hazır degil, bekleniyor...");
  }
}

// Ayar her degistiginde gonder
settingsStorage.onchange = () => { sendSingleNote(); };

// Baglantı acıldıgında gonder
messaging.peerSocket.onopen = () => { sendSingleNote(); };
