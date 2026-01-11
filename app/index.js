import document from "document";

console.log("Uygulama baslatildi!");

let bg = document.getElementById("background");
let statusText = document.getElementById("statusText");

if (bg) bg.fill = "blue"; // Ekran maviyse grafik motoru çalışıyor demektir
if (statusText) statusText.text = "Sistem Calisiyor";
