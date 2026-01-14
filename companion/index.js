import { settingsStorage } from "settings";
import * as messaging from "messaging";

function send() {
  if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) return;
  
  const notes = settingsStorage.getItem("notes_list");
  if (notes) {
    const raw = JSON.parse(notes);
    const clean = raw.map(item => {
      let p = item.name.split('|');
      return { 
        title: p[0].trim(), content: p[1] || "", 
        bgColor: item.bgColor || "grey", txtColor: item.txtColor || "white",
        timestamp: item.timestamp || ""
      };
    });
    messaging.peerSocket.send(clean);
  }

  const check = settingsStorage.getItem("checklist_data");
  if (check) {
    messaging.peerSocket.send({ type: "checklist", data: JSON.parse(check) });
  }
}

settingsStorage.onchange = send;
messaging.peerSocket.onopen = send;
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.action === "delete") {
    let c = JSON.parse(settingsStorage.getItem("notes_list") || "[]");
    c.splice(evt.data.index, 1);
    settingsStorage.setItem("notes_list", JSON.stringify(c));
    send();
  }
};
