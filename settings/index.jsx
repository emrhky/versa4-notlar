registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput 
        label="Başlık (Liste İsmi)" 
        placeholder="Örn: Market Listesi" 
        settingsKey="temp_title" 
      />
      
      <Text bold align="center">Not İçeriği (Saat Görünümü)</Text>
      <TextInput
        label="Notunuzu buraya yazın..."
        settingsKey="temp_content"
        multiline={true}
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
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;

              // Renk nesnelerini stringe dönüştür (KRİTİK DÜZELTME)
              let finalBg = "black";
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

    <Section title="Mevcut Notlarım">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
