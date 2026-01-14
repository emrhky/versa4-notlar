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
        placeholder="Notunuzu buraya yazın..."
        settingsKey="temp_content"
      />
      
      <Text italic>Başlık Rengi (Soft Tonlar)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: '#D3D3D3'}, // Açık Gri
          {color: '#B0C4DE'}, // Soft Mavi
          {color: '#E6E6FA'}, // Lavanta
          {color: '#F5F5DC'}, // Bej
          {color: '#FFF0F5'}, // Soft Pembe
          {color: '#F0FFF0'}  // Soft Yeşil
        ]}
      />
      
      <Text italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: 'black'}, 
          {color: 'white'}, 
          {color: 'red'}, 
          {color: 'green'}, 
          {color: 'blue'},
          {color: 'yellow'} // Sarı eklendi
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
            if (notes.length < 5) {
              const now = new Date();
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}`;

              let finalBg = "#D3D3D3";
              let finalTxt = "white";
              
              if (bg) {
                const parsedBg = JSON.parse(bg);
                finalBg = typeof parsedBg === 'object' ? parsedBg.color : parsedBg;
              }
              if (txt) {
                const parsedTxt = JSON.parse(txt);
                finalTxt = typeof parsedTxt === 'object' ? parsedTxt.color : parsedTxt;
              }

              notes.push({
                name: `${JSON.parse(t).name} | ${JSON.parse(c).name}`,
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
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
