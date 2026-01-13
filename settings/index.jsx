registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput
        label="Başlık (Kısa)"
        placeholder="Örn: Market"
        settingsKey="temp_title"
      />
      <TextInput
        label="Not İçeriği"
        placeholder="Örn: Süt ve ekmek al"
        settingsKey="temp_content"
      />
      <Button
        list
        label="Listeye Ekle"
        onClick={() => {
          // Mevcut listeyi al
          let notes = JSON.parse(props.settingsStorage.getItem("notes_list") || "[]");
          // Yeni başlık ve notu al
          let t = props.settingsStorage.getItem("temp_title");
          let c = props.settingsStorage.getItem("temp_content");
          
          if (t && c && notes.length < 5) {
            // Objeyi listeye ekle
            notes.push({ name: `${JSON.parse(t).name} | ${JSON.parse(c).name}` });
            props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
            // Giriş alanlarını temizle
            props.settingsStorage.removeItem("temp_title");
            props.settingsStorage.removeItem("temp_content");
          }
        }}
      />
    </Section>

    <Section title="Mevcut Notlarım">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        renderItem={({ name, index }) => (
           <Text>{name.split('|')[0]}</Text> 
        )}
      />
      <Text italic size="small">Not: En fazla 5 not ekleyebilirsiniz. Silmek için sağdaki çöp kutusuna basın.</Text>
    </Section>
  </Page>
));
