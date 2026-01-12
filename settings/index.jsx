registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="10"
        addAction={
          <TextInput
            label="Not Ekle (Başlık | Not şeklinde)"
            placeholder="Örn: Market | Süt ve ekmek al"
          />
        }
      />
    </Section>
  </Page>
));
