registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput
        label="Başlık"
        placeholder="Örn: Market"
        settingsKey="temp_title"
      />
      <TextInput
        label="Not İçeriği"
        placeholder="Örn: Süt almayı unutma"
        settingsKey="temp_content"
      />
      <Button
        list
        label="Listeye Ekle"
        onClick={() => {
          const t = props.settingsStorage.getItem("temp_title");
          const c = props.settingsStorage.getItem("temp_content");
          
          if (t && c) {
            const titleObj = JSON.parse(t);
            const contentObj = JSON.parse(c);
            let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
            
            if (notes.length < 5) {
              notes.push({ name: `${titleObj.name} | ${contentObj.name}` });
              props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
              // Temizleme
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
