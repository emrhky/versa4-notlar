messaging.peerSocket.onmessage = (evt) => {
  // Eğer veri newValue içindeyse (bazı SDK sürümlerinde böyle gelir) onu al, yoksa direkt datayı al
  notes = evt.data.newValue ? JSON.parse(evt.data.newValue) : evt.data;
  render();
};

function render() {
  rows.forEach((row, i) => {
    if (notes && notes[i]) {
      // Gelen verinin tipini kontrol et ve metne çevir
      let content = typeof notes[i] === 'object' ? notes[i].name : notes[i];
      
      row.txt.text = String(content).substring(0, 20);
      row.rect.style.display = "inline";
      
      row.rect.onclick = () => {
        detailTitle.text = String(content);
        detailView.style.display = "inline";
      };
    } else {
      row.rect.style.display = "none";
    }
  });
}
