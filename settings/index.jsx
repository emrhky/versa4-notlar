registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput label="Başlık" placeholder="Örn: Alışveriş" settingsKey="temp_title" />
      
      <Text bold>Not İçeriği (Satır Satır):</Text>
      <TextInput label="Satır 1" settingsKey="line1" />
      <TextInput label="Satır 2" settingsKey="line2" />
      <TextInput label="Satır 3" settingsKey="line3" />
      <TextInput label="Satır 4" settingsKey="line4" />
      
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
          const l1 = props.settingsStorage.getItem("line1");
          const l2 = props.settingsStorage.getItem("line2");
          const l3 = props.settingsStorage.getItem("line3");
          const l4 = props.settingsStorage.getItem("line4");
          const bg = props.settingsStorage.getItem("temp_bg_color");
          const txt = props.settingsStorage.getItem("temp_txt_color");
          
          if (t && (l1 || l2 || l3 || l4)) {
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            if (notes.length < 5) {
              const now = new Date();
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`;

              // Satırları birleştirme
              let combinedContent = "";
              [l1, l2, l3, l4].forEach(line => {
                if (line) combinedContent += JSON.parse(line).name + "\n";
              });

              let bgVal = bg ? JSON.parse(bg).color : "black";
              let txtVal = txt ? JSON.parse(txt).color : "white";

              notes.push({
                name: `${JSON.parse(t).name} | ${combinedContent.trim()}`,
                bgColor: String(bgVal),
                txtColor: String(txtVal),
                timestamp: ts
              });
              
              props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
              
              // Formu temizle
              ["temp_title", "line1", "line2", "line3", "line4"].forEach(k => props.settingsStorage.removeItem(k));
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
