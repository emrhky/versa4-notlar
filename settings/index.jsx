registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput label="Başlık" placeholder="Örn: Market" settingsKey="temp_title" />
      <TextInput label="Not İçeriği" placeholder="Örn: Süt al" settingsKey="temp_content" />
      
      <Text bold italic>Başlık Rengi (Liste)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: 'black'}, {color: 'grey'}, {color: 'red'}, 
          {color: 'blue'}, {color: 'green'}, {color: 'purple'}
        ]}
      />
      
      <Text bold italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: 'white'}, {color: 'yellow'}, {color: 'cyan'}, 
          {color: 'lime'}, {color: 'orange'}, {color: 'black'}
        ]}
      />

      <Button
        list
        label="Listeye Ekle"
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

              // Renk ayıklama (Objeden sadece renk metnini alıyoruz)
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
              props.settingsStorage.removeItem("temp_title");
              props.settingsStorage.removeItem("temp_content");
            }
          }
        }}
      />
    </Section>

    <Section title="Mevcut Notlar">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
