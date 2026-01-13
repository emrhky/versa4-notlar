registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput label="Başlık" placeholder="Örn: Market" settingsKey="temp_title" />
      <TextInput label="Not İçeriği" placeholder="Örn: Süt al" settingsKey="temp_content" />
      
      <Text bold italic>Başlık Arka Plan (Liste)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: '#000000'}, {color: '#808080'}, {color: '#A2E4B8'}, 
          {color: '#AEC6CF'}, {color: '#FFB6C1'}, {color: '#FF6961'}
        ]}
      />
      
      <Text bold italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: '#000000'}, {color: '#FFFFFF'}, {color: '#FF0000'}, 
          {color: '#FFFF00'}, {color: '#00FF00'}, {color: '#0000FF'}
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
              // Zaman damgası oluşturma (SS:DD, GG/AA/YYYY)
              const now = new Date();
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;

              // Renk objelerini güvenli çözümleme
              let bgParsed = "#000000";
              let txtParsed = "#FFFFFF";
              try { if(bg) bgParsed = JSON.parse(bg).color || JSON.parse(bg); } catch(e) {}
              try { if(txt) txtParsed = JSON.parse(txt).color || JSON.parse(txt); } catch(e) {}

              notes.push({
                name: `${JSON.parse(t).name} | ${JSON.parse(c).name}`,
                bgColor: bgParsed,
                txtColor: txtParsed,
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
