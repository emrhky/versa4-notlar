registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput 
        label="Başlık" 
        placeholder="Örn: Alışveriş Listesi" 
        settingsKey="temp_title" 
      />
      {/* TextArea kullanımı gerçek çok satırlı girişi (Enter) sağlar */}
      <TextArea
        label="Not İçeriği"
        placeholder="Buraya notunuzu yazın (Alt satıra geçebilirsiniz)..."
        settingsKey="temp_content"
      />
      
      <Text bold italic>Başlık Rengi (Liste)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: 'black'}, {color: 'grey'}, {color: 'yellow'}, 
          {color: 'red'}, {color: 'orange'}, {color: 'green'}
        ]}
      />
      
      <Text bold italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: 'black'}, {color: 'white'}, {color: 'red'}, 
          {color: 'green'}, {color: 'blue'}
        ]}
      />

      <Button
        list
        label="Notu Listeye Ekle"
        onClick={() => {
          const t = props.settingsStorage.getItem("temp_title");
          const c = props.settingsStorage.getItem("temp_content");
          const bg = props.settingsStorage.getItem("temp_bg_color");
          const txt = props.settingsStorage.getItem("temp_txt_color");
          
          if (t && c) {
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            if (notes.length < 5) {
              const now = new Date();
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;

              // Renk verilerini garantili string formatına çevirme
              let bgVal = "black";
              let txtVal = "white";
              
              if (bg) {
                const parsedBg = JSON.parse(bg);
                bgVal = typeof parsedBg === 'object' ? parsedBg.color : parsedBg;
              }
              if (txt) {
                const parsedTxt = JSON.parse(txt);
                txtVal = typeof parsedTxt === 'object' ? parsedTxt.color : parsedTxt;
              }

              notes.push({
                name: `${JSON.parse(t).name} | ${JSON.parse(c).name}`,
                bgColor: String(bgVal),
                txtColor: String(txtVal),
                timestamp: ts
              });
              
              props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
              // Formu temizle
              props.settingsStorage.removeItem("temp_title");
              props.settingsStorage.removeItem("temp_content");
            }
          }
        }}
      />
    </Section>

    <Section title="Mevcut Notlarım">
      {/* Ekleme butonunu tamamen kaldırmak için addAction eklemiyoruz */}
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
