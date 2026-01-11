import document from "document";
import * as messaging from "messaging";

const txt0 = document.getElementById("text-0");

// Saat tarafında baglantı acıldı mı?
messaging.peerSocket.onopen = () => {
  txt0.text = "Baglanti Kuruldu...";
};

// Veri geldiginde
messaging.peerSocket.onmessage = (evt) => {
  if (evt.data && evt.data[0]) {
    txt0.text = evt.data[0].title; // Sadece ilk notun baslıgı
  }
};

messaging.peerSocket.onerror = (err) => {
  txt0.text = "Hata: " + err.code;
};
