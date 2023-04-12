function loadLocaleMessages() {
    const locales = require.context(
      "./assets/maplestory",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};
    locales.keys().forEach((key) => {
      const matched = key.match(/([a-z0-9]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
    console.log(messages);
    return messages;
  }

export default {
    msdata: loadLocaleMessages()
}