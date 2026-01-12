registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <Text italic>Format: Başlık | Notun Kendisi</Text>
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        addAction={
          <TextInput
            label="Yeni Not"
            placeholder="Başlık | İçerik şeklinde yazın..."
          />
        }
      />
    </Section>
  </Page>
));
