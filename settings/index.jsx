registerSettingsPage((props) => (
  <Page>
    <Section title="Not Listesi">
      <AdditiveList
        settingsKey="notes_list"
        maxItems="10"
        addAction={
          <TextInput
            label="Not Başlığı ve İçeriği"
            placeholder="Notunuzu buraya yazın..."
          />
        }
      />
    </Section>
    <Section title="Bilgi">
      <Text>Not eklemek için yukarıdaki '+' butonuna basın. Eklediğiniz notun üzerine tıklayarak içeriği düzenleyebilirsiniz.</Text>
    </Section>
  </Page>
));
