import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = () => {
  let notesData = [];
  for (let i = 0; i < 10; i++) {
    let title = settingsStorage.getItem(`title_${i}`);
    let content = settingsStorage.getItem(`content_${i}`);
    if (title && content) {
      notesData.push({
        title: JSON.parse(title).name || "Basliksiz",
        content: JSON.parse(content).name || ""
      });
    }
  }
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(notesData);
  }
};
