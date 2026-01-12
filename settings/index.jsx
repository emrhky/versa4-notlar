registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <Text italic>Kullanım: Başlık | İçerik</Text>
      <AdditiveList
        settingsKey="notes_list"
        maxItems="5"
        addAction={<TextInput label="Yeni Not" placeholder="Örn: Market | Süt al" />}
      />
    </Section>
  </Page>
));
