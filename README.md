​📝 Fitbit Versa 4 Notes App (V3.71)
​Fitbit Versa 4 (Hera) akıllı saatler için geliştirilmiş, hafif, kararlı ve şık bir not defteri uygulamasıdır. Bu proje, kullanıcıların telefonları üzerinden not eklemelerine ve bu notları saatleri üzerinde internet bağlantısı olmasa dahi görüntülemelerine olanak tanır.
​✨ Öne Çıkan Özellikler
​5 Not Kapasitesi: Saat ekranının ergonomisine uygun olarak optimize edilmiş 5 adet dinamik not slotu.
​Modern Tasarım: * Soft Renk Paleti: Göz yormayan pastel tonlarda özelleştirilebilir başlık alanları.
​Defter Görünümü: Not detay ekranında yer alan açık gri çizgiler ve "Paper White" (kağıt beyazı) zemin rengi.
​Akıllı Renk Yönetimi: Yazı rengi "Beyaz" seçildiğinde, açık renkli kağıt üzerinde okunabilirliği artırmak için otomatik olarak Siyah yazı tipine geçiş yapar.
​Zaman Damgası: Her notun eklendiği tarih ve saat bilgisini (SS:DD, GG/AA/YYYY) otomatik olarak kaydeder.
​Kalıcı Hafıza (Offline Mode): Notlar saatin dahili hafızasına (notlar.json) kaydedilir; telefon bağlantısı kopsa dahi notlarınıza erişebilirsiniz.
​Çift Yönlü Senkronizasyon: Saatten silinen notlar, telefon ayarlarından da eş zamanlı olarak silinir.
​🛠 Teknik Detaylar
​Platform: Fitbit SDK 6.0+
​Cihaz: Versa 4 (Hera)
​Dil: SVG (Arayüz), JavaScript (Mantık), JSX (Ayarlar)
​Veri Yönetimi: * messaging API ile telefon-saat arası veri transferi.
​fs (File System) API ile yerel dosya depolama.
​user-settings ile saat entegrasyonu.
​📂 Dosya Yapısı
​app/index.js: Saatin ana mantığı, saat gösterimi, tıklama olayları ve render işlemleri.
​resources/index.view: SVG tabanlı kullanıcı arayüzü ve detay ekranı hiyerarşisi.
​companion/index.js: Telefon tarafındaki veri köprüsü ve veri temizleme (sanitization) işlemleri.
​settings/index.jsx: Telefonun Fitbit uygulamasındaki ayarlar arayüzü ve renk seçim paleti.
​🚀 Kurulum ve Build
​Gerekli SDK araçlarını yükleyin: npm install -g @fitbit/sdk-cli
​Depoyu klonlayın ve klasöre girin.
​Terminalde npx fitbit komutunu çalıştırın.
​build komutu ile projeyi derleyin.
​install komutu ile bağlı olan saate veya simülatöre yükleyin.
​⚠️ Önemli Notlar (V3.71)
​Bu sürüm projenin en kararlı halidir. Kaydırılabilir liste (scroll) veya çok satırlı giriş alanları, performans ve stabilite nedenleriyle bu sürümde yer almamaktadır.