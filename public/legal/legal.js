(() => {
  "use strict";

  const supportedLanguages = ["en", "zh-Hans", "zh-Hant"];
  const documentName = document.documentElement.dataset.document;
  const content = document.getElementById("legal-content");
  const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
  const searchParams = new URLSearchParams(location.search);
  const isEmbedded = searchParams.get("embed") === "1";
  const requestedLanguage = searchParams.get("lang");
  const isLanguageLocked = searchParams.get("locked") === "1" && supportedLanguages.includes(requestedLanguage);
  let blocks = [];

  if (isEmbedded) document.documentElement.classList.add("embedded");
  if (isLanguageLocked) document.documentElement.classList.add("language-locked");

  const chromeCopy = {
    en: {
      privacy: "Privacy", terms: "Terms", support: "Support", privacyPolicy: "Privacy Policy", termsOfUse: "Terms of Use",
      skip: "Skip to content", language: "Language", navigation: "Site navigation", copyright: "Copyright 2026 yehuanwei", error: "This page could not be loaded. Please try again later or update PackCalm.",
      titles: { "privacy-policy": "PackCalm Privacy Policy", "terms-of-use": "PackCalm Terms of Use", support: "PackCalm Support" },
    },
    "zh-Hans": {
      privacy: "隐私", terms: "条款", support: "支持", privacyPolicy: "隐私政策", termsOfUse: "使用条款",
      skip: "跳到正文", language: "语言", navigation: "站点导航", copyright: "版权所有 2026 yehuanwei", error: "页面暂时无法加载，请稍后重试或更新 PackCalm。",
      titles: { "privacy-policy": "PackCalm 隐私政策", "terms-of-use": "PackCalm 使用条款", support: "PackCalm 支持" },
    },
    "zh-Hant": {
      privacy: "隱私", terms: "條款", support: "支援", privacyPolicy: "隱私權政策", termsOfUse: "使用條款",
      skip: "跳到正文", language: "語言", navigation: "網站導覽", copyright: "版權所有 2026 yehuanwei", error: "頁面暫時無法載入，請稍後重試或更新 PackCalm。",
      titles: { "privacy-policy": "PackCalm 隱私權政策", "terms-of-use": "PackCalm 使用條款", support: "PackCalm 支援" },
    },
  };

  const escapeHTML = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const renderInline = (value) => escapeHTML(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)]+|(?:privacy-policy|terms-of-use|support)\.html(?:#[^)]+)?)\)/g,
      '<a href="$2">$1</a>'
    );

  const slug = (value) => value
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");

  const renderMarkdown = (markdown) => {
    const lines = markdown.trim().split(/\r?\n/);
    const html = [];
    let paragraph = [];
    let listOpen = false;
    let sectionOpen = false;

    const flushParagraph = () => {
      if (paragraph.length > 0) {
        html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    };

    const closeList = () => {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
    };

    const closeSection = () => {
      if (sectionOpen) {
        html.push("</section>");
        sectionOpen = false;
      }
    };

    for (const line of lines) {
      const heading = line.match(/^(#{1,2})\s+(.+)$/);
      const listItem = line.match(/^[-*]\s+(.+)$/);

      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        if (level === 2) {
          closeSection();
          html.push('<section class="legal-section">');
          sectionOpen = true;
        }
        html.push(`<h${level} id="${slug(heading[2])}">${renderInline(heading[2])}</h${level}>`);
      } else if (listItem) {
        flushParagraph();
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${renderInline(listItem[1])}</li>`);
      } else if (line.trim() === "") {
        flushParagraph();
        closeList();
      } else {
        paragraph.push(line.trim());
      }
    }

    flushParagraph();
    closeList();
    closeSection();
    return html.join("\n");
  };

  const bestInitialLanguage = () => {
    if (supportedLanguages.includes(requestedLanguage)) return requestedLanguage;
    const hashLanguage = decodeURIComponent(location.hash.slice(1));
    if (supportedLanguages.includes(hashLanguage)) return hashLanguage;
    const browserLanguage = navigator.language || "en";
    if (browserLanguage.startsWith("zh-Hant") || browserLanguage === "zh-TW" || browserLanguage === "zh-HK") return "zh-Hant";
    if (browserLanguage.startsWith("zh")) return "zh-Hans";
    return "en";
  };

  const localizeChrome = (language) => {
    const copy = chromeCopy[language] || chromeCopy.en;
    const skipLink = document.querySelector(".skip-link");
    const languagePicker = document.querySelector(".language-picker");
    const siteNavigation = document.querySelector(".site-nav");
    const copyright = document.querySelector(".site-footer-inner > span");
    if (skipLink) skipLink.textContent = copy.skip;
    if (languagePicker) languagePicker.setAttribute("aria-label", copy.language);
    if (siteNavigation) siteNavigation.setAttribute("aria-label", copy.navigation);
    if (copyright) copyright.textContent = copy.copyright;
    document.title = copy.titles[documentName] || "PackCalm";

    for (const link of document.querySelectorAll('a[href]')) {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("http")) continue;
      const target = new URL(rawHref, location.href);
      const fileName = target.pathname.split("/").pop();
      if (!["privacy-policy.html", "terms-of-use.html", "support.html"].includes(fileName)) continue;
      target.searchParams.set("lang", language);
      if (isLanguageLocked) target.searchParams.set("locked", "1");
      else target.searchParams.delete("locked");
      target.hash = language;
      link.setAttribute("href", `${fileName}${target.search}${target.hash}`);
      if (link.closest(".site-nav")) {
        link.textContent = fileName === "privacy-policy.html" ? copy.privacy : fileName === "terms-of-use.html" ? copy.terms : copy.support;
      } else if (link.closest(".footer-links")) {
        link.textContent = fileName === "privacy-policy.html" ? copy.privacyPolicy : fileName === "terms-of-use.html" ? copy.termsOfUse : copy.support;
      }
    }
  };

  const selectLanguage = (language) => {
    const index = Math.max(0, supportedLanguages.indexOf(language));
    const selectedLanguage = supportedLanguages[index];
    document.documentElement.lang = selectedLanguage;
    content.innerHTML = renderMarkdown(blocks[index] || blocks[0]);
    localizeChrome(selectedLanguage);

    for (const button of languageButtons) {
      const selected = button.dataset.language === selectedLanguage;
      button.setAttribute("aria-current", selected ? "true" : "false");
    }

    const currentURL = new URL(location.href);
    currentURL.searchParams.set("lang", selectedLanguage);
    currentURL.hash = selectedLanguage;
    history.replaceState(null, "", `${currentURL.pathname}${currentURL.search}${currentURL.hash}`);
    content.focus({ preventScroll: true });
  };

  for (const button of languageButtons) {
    button.addEventListener("click", () => selectLanguage(button.dataset.language));
  }

  const source = window.PACKCALM_LEGAL_SOURCE
    ? Promise.resolve(window.PACKCALM_LEGAL_SOURCE)
    : fetch(`${documentName}.md`).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      });

  source
    .then((sourceText) => {
      const withoutFrontMatter = sourceText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
      blocks = withoutFrontMatter.split(/\r?\n---\r?\n/).map((block) => block.trim()).filter(Boolean);
      if (blocks.length < 3) throw new Error("Missing localized legal content");
      selectLanguage(bestInitialLanguage());
    })
    .catch(() => {
      const language = bestInitialLanguage();
      document.documentElement.lang = language;
      localizeChrome(language);
      content.innerHTML = `<p class="error">${chromeCopy[language].error}</p>`;
    });
})();
