registerSettingsPage((props) => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push(
      <Section title={`Not ${i+1}`}>
        <TextInput label="Baslik" settingsKey={`title_${i}`} />
        <TextInput label="Icerik" settingsKey={`content_${i}`} />
      </Section>
    );
  }
  return <Page>{rows}</Page>;
});
