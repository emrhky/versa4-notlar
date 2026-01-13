registerSettingsPage((props) => (
  <Page>
    <Section title="Yeni Not Ekle">
      <TextInput label="Başlık" placeholder="Örn: Market" settingsKey="temp_title" />
      <TextInput label="Not İçeriği" placeholder="Örn: Süt al" settingsKey="temp_content" />
      
      <Text bold italic>Arka Plan Rengi</Text>
      <ColorSelect
        settingsKey="temp_bg_color"
        colors={[
          {color: '#333333'}, {color: '#4E5D6C'}, {color: '#005500'}, 
          {color: '#550000'}, {color: '#000055'}, {color: '#555500'}
        ]}
      />
      
      <Text bold italic>Metin Rengi</Text>
      <ColorSelect
        settingsKey="temp_txt_color"
        colors={[
          {color: '#FFFFFF'}, {color: '#00FFFF'}, {color: '#FFFF00'}, 
          {color: '#FFA500'}, {color: '#FFC0CB'}, {color: '#ADFF2F'}
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
              const titleVal = JSON.parse(t).name;
              const contentVal = JSON.parse(c).name;
              // Renk seçilmediyse varsayılan renkleri ata
              const bgVal = bg ? JSON.parse(bg) : "#333333";
              const txtVal = txt ? JSON.parse(txt) : "#FFFFFF";

              notes.push({
                name: `${titleVal} | ${contentVal}`,
                bgColor: bgVal.color || bgVal, // Hem obje hem string durumunu kapsar
                txtColor: txtVal.color || txtVal
              });
              props.settingsStorage.setItem("notes_list", JSON.stringify(notes));
              // Alanları temizle
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
