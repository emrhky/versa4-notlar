// ... (üst kısımlar Draft dalıyla aynı) ...

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      row.group.style.display = "inline";
      row.txt.text = String(notes[i].title);
      
      row.rect.onclick = () => {
        // Metni textarea'ya basarken 250 karakter sınırı koyuyoruz (XML'deki text-length ile uyumlu)
        let content = String(notes[i].content);
        detailTitle.text = content.substring(0, 250); 
        detailView.style.display = "inline";
      };
    } else {
      row.group.style.display = "none";
    }
  });
}

// ... (Geri dön butonu aynı) ...
