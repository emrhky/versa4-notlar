import document from "document";
import * as messaging from "messaging";
import * as fs from "fs";
import clock from "clock";

const FILE_NOTES = "notes.json";
const FILE_CHECK = "check.json";
let notes = [];
let checklistObj = { title: "LİSTEM", items: [] };
let currentIdx = -1;

clock.granularity = "minutes";
clock.ontick = (evt) => {
  document.getElementById("clock-label").text = ("0" + evt.date.getHours()).slice(-2) + ":" + ("0" + evt.date.getMinutes()).slice(-2);
};

// Yükleme
try {
  if (fs.existsSync(FILE_NOTES)) notes = fs.readFileSync(FILE_NOTES, "json");
  if (fs.existsSync(FILE_CHECK)) checklistObj = fs.readFileSync(FILE_CHECK, "json");
} catch(e) {}

messaging.peerSocket.onmessage = (evt) => {
  if (evt.data.type === "checklist") {
    checklistObj = evt.data.data;
    fs.writeFileSync(FILE_CHECK, checklistObj, "json");
  } else {
    notes = evt.data;
    fs.writeFileSync(FILE_NOTES, notes, "json");
  }
  render();
};

function render() {
  for (let i = 0; i < 5; i++) {
    let group = document.getElementById(`group-${i}`);
    if (notes[i]) {
      group.style.display = "inline";
      let r = document.getElementById(`rect-${i}`);
      let t = document.getElementById(`text-${i}`);
      t.text = notes[i].title;
      r.style.fill = notes[i].bgColor;
      t.style.fill = notes[i].txtColor;
      r.onclick = () => {
        currentIdx = i;
        document.getElementById("detail-header-bg").style.fill = notes[i].bgColor;
        document.getElementById("detail-header-txt").style.fill = notes[i].txtColor;
        document.getElementById("detail-header-txt").text = notes[i].title;
        document.getElementById("detail-title").text = notes[i].content;
        document.getElementById("detail-timestamp").text = notes[i].timestamp || "";
        document.getElementById("detail-view").style.display = "inline";
      };
    } else { group.style.display = "none"; }
  }

  // Dinamik Liste Butonu
  const showList = checklistObj.items && checklistObj.items.length > 0;
  document.getElementById("btn-open-list").style.display = showList ? "inline" : "none";
  document.getElementById("txt-open-list").style.display = showList ? "inline" : "none";
  document.getElementById("txt-open-list").text = checklistObj.title + " 🛒";
  
  document.getElementById("empty-label").style.display = (notes.length === 0 && !showList) ? "inline" : "none";
}

function renderChecklist() {
  document.getElementById("checklist-title-label").text = checklistObj.title;
  for (let i = 0; i < 5; i++) {
    let g = document.getElementById(`li-${i}`);
    if (checklistObj.items[i]) {
      g.style.display = "inline";
      document.getElementById(`lit-${i}`).text = checklistObj.items[i].text;
      document.getElementById(`box-${i}`).style.fill = checklistObj.items[i].checked ? "lime" : "white";
      document.getElementById(`chk-area-${i}`).onclick = () => {
        checklistObj.items[i].checked = !checklistObj.items[i].checked;
        fs.writeFileSync(FILE_CHECK, checklistObj, "json");
        renderChecklist();
      };
    } else { g.style.display = "none"; }
  }
}

document.getElementById("btn-open-list").onclick = () => {
  renderChecklist();
  document.getElementById("checklist-view").style.display = "inline";
};

document.getElementById("btn-back").onclick = () => { document.getElementById("detail-view").style.display = "none"; };
document.getElementById("btn-list-back").onclick = () => { document.getElementById("checklist-view").style.display = "none"; };
document.getElementById("btn-delete-init").onclick = () => { document.getElementById("confirm-view").style.display = "inline"; };
document.getElementById("btn-no").onclick = () => { document.getElementById("confirm-view").style.display = "none"; };
document.getElementById("btn-yes").onclick = () => {
  notes.splice(currentIdx, 1);
  fs.writeFileSync(FILE_NOTES, notes, "json");
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({ action: "delete", index: currentIdx });
  }
  document.getElementById("confirm-view").style.display = "none";
  document.getElementById("detail-view").style.display = "none";
  render();
};

render();
