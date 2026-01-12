import document from "document";
import * as messaging from "messaging";

const txt0 = document.getElementById("text-0");

messaging.peerSocket.onopen = () => {
  txt0.text = "Baglanti OK. Not Yaziniz...";
};

messaging.peerSocket.onmessage = (evt) => {
  // Gelen veri ne olursa olsun ekrana yaz
  if (evt.data) {
    txt0.text = evt.data.substring(0, 30); // Ekrana sığması için kısıtla
  }
};
