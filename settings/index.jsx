registerSettingsPage((props) => (
  <Page>
    <Section title="1. Not Defteri (Düz Metin)">
      <TextInput label="Başlık" placeholder="Örn: Hafta Sonu" settingsKey="temp_title" />
      <TextInput label="İçerik" placeholder="Notunuzu buraya yazın..." settingsKey="temp_content" />
      
      <Text bold italic>Başlık Rengi (Liste)</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[{color: 'black'}, {color: 'grey'}, {color: 'yellow'}, {color: 'red'}, {color: 'orange'}, {color: 'green'}]}
      />
      
      <Text bold italic>Yazı Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[{color: 'black'}, {color: 'white'}, {color: 'red'}, {color: 'green'}, {color: 'blue'}]}
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

              let bgVal = bg ? JSON.parse(bg).color : "black";
              let txtVal = txt ? JSON.parse(txt).color : "white";

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

    <Section title="2. Alışveriş Listesi (Tik Atılabilir)">
      <TextInput label="Madde 1" settingsKey="li1" />
      <TextInput label="Madde 2" settingsKey="li2" />
      <TextInput label="Madde 3" settingsKey="li3" />
      <TextInput label="Madde 4" settingsKey="li4" />
      <TextInput label="Madde 5" settingsKey="li5" />
      <Button
        list
        label="LİSTEYİ SAATE GÖNDER"
        onClick={() => {
          const items = [];
          for(let i=1; i<=5; i++) {
            const val = props.settingsStorage.getItem(`li${i}`);
            if(val) items.push({text: JSON.parse(val).name, checked: false});
          }
          props.settingsStorage.setItem("checklist_data", JSON.stringify(items));
        }}
      />
    </Section>

    <Section title="Kayıtlı Notlar">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
