function loadLocaleMessages() {
    const locales = require.context(
      "./assets/maplestory",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const messages = {};
    let taskMap = new Map();
    locales.keys().forEach((key) => {
      const matched = key.match(/([a-z0-9]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
    // console.log(messages);
    return messages;
  }


  function loadTask() {
    const locales = require.context(
      "./assets/maplestory",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );
    let taskMap = new Map();

    locales.keys().forEach((key) => {
      const matched = key.match(/([a-z0-9]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        taskMap.set(locale,locales(key));
      }
    });
    console.log(taskMap);
    return taskMap;
  }

export default {
    msdata: loadLocaleMessages(),
    taskMap: loadTask(),
}