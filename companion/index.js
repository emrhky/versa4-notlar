import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { locale } from "user-settings";

function sendData() {
  // Dil bilgisini settings tarafı için kaydedelim
  settingsStorage.setItem("locale", locale.language);

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    const data = settingsStorage.getItem("notes_list");
    if (data) {
      try {
        const raw = JSON.parse(data);
        const clean = raw.map(item => {
          let parts = (item.name || "").split('|');
          return {
            title: parts[0] ? parts[0].trim().substring(0, 20) : "Untitled",
            content: parts[1] ? parts[1].trim() : (item.name || "").trim(),
            bgColor: item.bgColor || "#D3D3D3",
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
    currentList.splice(evt.data.index, 1);
    settingsStorage.setItem("notes_list", JSON.stringify(currentList));
    sendData();
  }
};

settingsStorage.onchange = sendData;
messaging.peerSocket.onopen = sendData;
