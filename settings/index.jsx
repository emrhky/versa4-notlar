registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        addAction={
          <TextInput
            label="Yeni Not"
            placeholder="Notunuzu yazın..."
          />
        }
      />
    </Section>
  </Page>
));
