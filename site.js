(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-set-lang]");
  const titles = {
    zh: document.body.dataset.titleZh,
    en: document.body.dataset.titleEn
  };

  function setLanguage(language) {
    const lang = language === "en" ? "en" : "zh";
    root.dataset.lang = lang;
    root.lang = lang === "zh" ? "zh-CN" : "en";
    if (titles[lang]) document.title = titles[lang];
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });
    try {
      localStorage.setItem("yi-zhu-site-language", lang);
    } catch (error) {
      // The language still changes when storage is unavailable.
    }
  }

  let savedLanguage = "zh";
  try {
    savedLanguage = localStorage.getItem("yi-zhu-site-language") || "zh";
  } catch (error) {
    savedLanguage = "zh";
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  setLanguage(savedLanguage);
})();
