registerSettingsPage((props) => {
  const maxNotes = 10;

  return (
    <Page>
      <Section title="Notlar">
        <AdditiveList
          settingsKey="notes_list"
          maxItems={maxNotes}
          addAction={
            <TextInput
              label="Yeni Not"
              placeholder="Notunuzu yazın…"
            />
          }
        />
      </Section>

      <Section title="Görünüm Ayarları">
        <Select
          label="Not Rengi"
          settingsKey="note_color"
          options={[
            { name: "Beyaz", value: "white" },
            { name: "Sarı", value: "yellow" },
            { name: "Mavi", value: "blue" },
            { name: "Yeşil", value: "green" },
            { name: "Kırmızı", value: "red" }
          ]}
        />

        <Select
          label="Metin Boyutu"
          settingsKey="note_text_size"
          options={[
            { name: "Küçük", value: "small" },
            { name: "Orta", value: "medium" },
            { name: "Büyük", value: "large" }
          ]}
        />

        <Toggle
          settingsKey="show_numbers"
          label="Numaralı Liste Göster"
        />
      </Section>

      <Section title="Toplu İşlemler">
        <Button
          label="Tüm Notları Sil"
          onClick={() => {
            props.settingsStorage.setItem("notes_list", JSON.stringify([]));
          }}
        />
      </Section>
    </Page>
  );
});
