registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="10"
        addAction={
          <Block>
            <TextInput label="Başlık" placeholder="Başlık girin..." settingsKey="temp_title" />
            <TextInput label="Not İçeriği" placeholder="Notu buraya yazın..." settingsKey="temp_content" />
          </Block>
        }
      />
    </Section>
  </Page>
));
