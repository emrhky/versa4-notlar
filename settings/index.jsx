registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="10"
        addAction={
          <TextInput
            label="Yeni Not Ekle"
            placeholder="Notunuzu yazın..."
          />
        }
      />
    </Section>
  </Page>
));
