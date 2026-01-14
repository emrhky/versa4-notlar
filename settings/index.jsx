registerSettingsPage((props) => (
  <Page>
    <Section title="1. Not Ekleme (Düz Metin)">
      <TextInput label="Başlık" placeholder="Örn: Hafta Sonu" settingsKey="temp_title" />
      <TextInput label="İçerik" placeholder="Notunuzu yazın..." settingsKey="temp_content" multiline={false} />
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[{color: 'black'}, {color: 'grey'}, {color: 'red'}, {color: 'blue'}, {color: 'green'}]}
      />
      <Button
        list
        label="NOTU KAYDET"
        onClick={() => {
          const t = props.settingsStorage.getItem("temp_title");
          const c = props.settingsStorage.getItem("temp_content");
          const bg = props.settingsStorage.getItem("temp_bg_color") || '{"color":"black"}';
          if (t && c) {
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            if (notes.length < 5) {
              const now = new Date();
              const ts = `${now.getHours()}:${now.getMinutes()}, ${now.getDate()}/${now.getMonth()+1}`;
              notes.push({
                name: `${JSON.parse(t).name} | ${JSON.parse(c).name}`,
                bgColor: JSON.parse(bg).color || "black",
                txtColor: "white",
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

    <Section title="2. Hızlı Liste (Tik Atılabilir)">
      <TextInput label="Madde 1" settingsKey="li1" />
      <TextInput label="Madde 2" settingsKey="li2" />
      <TextInput label="Madde 3" settingsKey="li3" />
      <TextInput label="Madde 4" settingsKey="li4" />
      <TextInput label="Madde 5" settingsKey="li5" />
      <Button
        list
        label="LİSTEYİ GÜNCELLE"
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

    <Section title="Mevcut Notlar">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name }) => <Text>{name.split('|')[0]}</Text>}
      />
    </Section>
  </Page>
));
