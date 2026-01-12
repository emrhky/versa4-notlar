registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <Text italic>Kullanım: Başlık | Notun Kendisi</Text>
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        addAction={
          <TextInput
            label="Yeni Not"
            placeholder="Market | Süt almayı unutma"
          />
        }
      />
    </Section>
  </Page>
));
