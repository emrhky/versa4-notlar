registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="4"
        addAction={<TextInput label="Yeni Not" placeholder="Notunuzu buraya yazın..." />}
      />
    </Section>
  </Page>
));
