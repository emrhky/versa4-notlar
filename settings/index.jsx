registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput 
        label="Not Başlığı" 
        placeholder="Örn: Market Listesi" 
        settingsKey="temp_title" 
      />
      <TextInput
        label="Not İçeriği"
        placeholder="Notunuzu yazın..."
        settingsKey="temp_content"
      />
      
      <Text italic>Başlık Rengi (Soft Tonlar)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: '#D3D3D3'}, {color: '#B0C4DE'}, {color: '#E6E6FA'}, 
          {color: '#F5F5DC'}, {color: '#FFF0F5'}, {color: '#F0FFF0'}
        ]}
      />
      
      <Text italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: 'black'}, {color: 'white'}, {color: 'red'}, {color: 'green'}, {color: 'blue'}
        ]}
      />

      <Button
        list
        label="NOTU KAYDET VE GÖNDER"
        onClick={() => {
          const t = props.settingsStorage.getItem("temp_title");
          const c = props.settingsStorage.getItem("temp_content");
          const bg = props.settingsStorage.getItem("temp_bg_color");
          const txt = props.settingsStorage.getItem("temp_txt_color");
          
          if (t && c) {
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            // Kapasite 10'a çıkarıldı
            if (notes.length < 10) {
              const now = new Date();
              const ts = now.getHours().toString().padStart(2, '0') + ":" + 
                         now.getMinutes().toString().padStart(2, '0') + ", " + 
                         now.getDate().toString().padStart(2, '0') + "/" + 
                         (now.getMonth() + 1).toString().padStart(2, '0') + "/" + 
                         now.getFullYear();

              let finalBg = "#D3D3D3";
              let finalTxt = "white";
              
              if (bg) { finalBg = JSON.parse(bg).color; }
              if (txt) { finalTxt = JSON.parse(txt).color; }

              notes.push({
                name: JSON.parse(t).name + " | " + JSON.parse(c).name,
                bgColor: String(finalBg),
                txtColor: String(finalTxt),
                timestamp: ts
              });
              
              props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
              props.settingsStorage.removeItem("temp_title");
              props.settingsStorage.removeItem("temp_content");
            }
          }
        }}
      />
    </Section>

    <Section title="Kayıtlı Notlarım">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="10"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
