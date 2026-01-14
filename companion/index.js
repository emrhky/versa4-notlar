import { settingsStorage } from "settings";
import * as messaging from "messaging";

function sendData() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      try {
        const raw = JSON.parse(data);
        const clean = raw.map(item => {
          let fullText = item.name || "";
          let parts = fullText.split('|');
          return {
            title: parts[0] ? parts[0].trim().substring(0, 20) : "Başlıksız",
            content: parts[1] ? parts[1].trim() : fullText.trim(),
            bgColor: item.bgColor || "black",
            txtColor: item.txtColor || "white",
            timestamp: item.timestamp || ""
          };
        });
        messaging.peerSocket.send(clean);
      } catch(e) {}
    }
  }
}

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data && evt.data.action === "delete") {
    let currentList = JSON.parse(settingsStorage.getItem("notes_list") || "[]");
    if (currentList.length > evt.data.index) {
      currentList.splice(evt.data.index, 1);
      settingsStorage.setItem("notes_list", JSON.stringify(currentList));
      sendData();
    }
  }
};

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
