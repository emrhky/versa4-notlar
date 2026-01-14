registerSettingsPage((props) => (
  <Page>
    <Section title="1. Not Defteri Ekle">
      <TextInput label="Başlık" settingsKey="temp_title" />
      <TextInput label="İçerik" settingsKey="temp_content" />
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
        label="NOTU KAYDET"
        onClick={() => {
          const t = props.settingsStorage.getItem("temp_title");
          const c = props.settingsStorage.getItem("temp_content");
          const bg = props.settingsStorage.getItem("temp_bg_color") || '{"color":"black"}';
          const txt = props.settingsStorage.getItem("temp_txt_color") || '{"color":"white"}';
          if (t && c) {
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            if (notes.length < 5) {
              const now = new Date();
              const ts = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
              notes.push({
                name: `${JSON.parse(t).name} | ${JSON.parse(c).name}`,
                bgColor: JSON.parse(bg).color,
                txtColor: JSON.parse(txt).color,
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

    <Section title="2. Özel Liste (Tik Atılabilir)">
      <TextInput label="Liste İsmi (Örn: Market)" settingsKey="list_title" />
      <TextInput label="Madde 1" settingsKey="li1" />
      <TextInput label="Madde 2" settingsKey="li2" />
      <TextInput label="Madde 3" settingsKey="li3" />
      <TextInput label="Madde 4" settingsKey="li4" />
      <TextInput label="Madde 5" settingsKey="li5" />
      <Button
        list
        label="LİSTEYİ GÜNCELLE"
        onClick={() => {
          const title = props.settingsStorage.getItem("list_title") || '{"name":"LİSTEM"}';
          const items = [];
          for(let i=1; i<=5; i++) {
            const val = props.settingsStorage.getItem(`li${i}`);
            if(val) items.push({text: JSON.parse(val).name, checked: false});
          }
          props.settingsStorage.setItem("checklist_data", JSON.stringify({
            title: JSON.parse(title).name,
            items: items
          }));
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
