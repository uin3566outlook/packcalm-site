(() => {
  "use strict";

  const supportedLanguages = ["en", "zh-Hans", "zh-Hant", "ja", "ko", "es", "pt-BR", "fr", "id", "th", "vi", "ar"];
  const languageLabels = {"en": "English", "zh-Hans": "简体中文", "zh-Hant": "繁體中文", "ja": "日本語", "ko": "한국어", "es": "Español", "pt-BR": "Português (Brasil)", "fr": "Français", "id": "Bahasa Indonesia", "th": "ไทย", "vi": "Tiếng Việt", "ar": "العربية"};
  const chromeCopy = {"en": {"privacy": "Privacy", "terms": "Terms", "support": "Support", "privacyPolicy": "Privacy Policy", "termsOfUse": "Terms of Use", "skip": "Skip to content", "language": "Language", "navigation": "Site navigation", "error": "This page could not be loaded. Please try again later.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "PackGo Privacy Policy", "terms-of-use": "PackGo Terms of Use", "support": "PackGo Support"}}, "zh-Hans": {"privacy": "隐私", "terms": "条款", "support": "支持", "privacyPolicy": "隐私政策", "termsOfUse": "使用条款", "skip": "跳到正文", "language": "语言", "navigation": "站点导航", "error": "页面暂时无法加载，请稍后重试。", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "PackGo 隐私政策（简体中文）", "terms-of-use": "PackGo 使用条款（简体中文）", "support": "PackGo 支持（简体中文）"}}, "zh-Hant": {"privacy": "隱私", "terms": "條款", "support": "支援", "privacyPolicy": "隱私權政策", "termsOfUse": "使用條款", "skip": "跳到正文", "language": "語言", "navigation": "網站導覽", "error": "頁面暫時無法載入，請稍後重試。", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "PackGo 隱私政策（繁體中文）", "terms-of-use": "PackGo 使用條款（繁體中文）", "support": "PackGo 支援（繁體中文）"}}, "ja": {"privacy": "プライバシー", "terms": "利用規約", "support": "サポート", "language": "言語", "navigation": "メインナビゲーション", "privacyPolicy": "プライバシーポリシー", "termsOfUse": "利用規約", "skip": "本文へ移動", "error": "法的文書を読み込めませんでした。PackGoを更新するか、再インストールしてください。", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "PackGo プライバシーポリシー", "terms-of-use": "PackGo 利用規約", "support": "PackGo サポート"}}, "ko": {"privacy": "개인정보 처리방침", "terms": "이용약관", "support": "지원", "language": "언어", "navigation": "주요 탐색", "privacyPolicy": "개인정보 처리방침", "termsOfUse": "이용 약관", "skip": "본문으로 건너뛰기", "error": "법적 문서를 불러오지 못했습니다. PackGo를 업데이트하거나 재설치해 주세요.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "PackGo 개인정보 처리방침", "terms-of-use": "PackGo 이용 약관", "support": "PackGo 지원"}}, "es": {"privacy": "Privacidad", "terms": "Términos", "support": "Soporte", "language": "Idioma", "navigation": "Navegación principal", "privacyPolicy": "Política de privacidad", "termsOfUse": "Términos de uso", "skip": "Ir al contenido", "error": "No se pudo cargar el documento legal. Actualiza o reinstala PackGo.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "Política de privacidad de PackGo", "terms-of-use": "Términos de uso de PackGo", "support": "Soporte de PackGo"}}, "pt-BR": {"privacy": "Privacidade", "terms": "Termos", "support": "Suporte", "language": "Idioma", "navigation": "Navegação principal", "privacyPolicy": "Política de Privacidade", "termsOfUse": "Termos de Uso", "skip": "Pular para o conteúdo", "error": "Não foi possível carregar o documento legal. Atualize ou reinstale o PackGo.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "Política de Privacidade do PackGo", "terms-of-use": "Termos de Uso do PackGo", "support": "Suporte do PackGo"}}, "fr": {"privacy": "Confidentialité", "terms": "Conditions", "support": "Assistance", "language": "Langue", "navigation": "Navigation principale", "privacyPolicy": "Politique de confidentialité", "termsOfUse": "Conditions d’utilisation", "skip": "Aller au contenu", "error": "Impossible de charger le document juridique. Mettez PackGo à jour ou réinstallez l’app.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "Politique de confidentialité de PackGo", "terms-of-use": "Conditions d’utilisation de PackGo", "support": "Assistance PackGo"}}, "id": {"privacy": "Privasi", "terms": "Ketentuan", "support": "Dukungan", "language": "Bahasa", "navigation": "Navigasi utama", "privacyPolicy": "Kebijakan privasi", "termsOfUse": "Ketentuan penggunaan", "skip": "Langsung ke konten", "error": "Dokumen hukum tidak dapat dimuat. Perbarui atau pasang ulang PackGo.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "Kebijakan Privasi PackGo", "terms-of-use": "Ketentuan Penggunaan PackGo", "support": "Dukungan PackGo"}}, "th": {"privacy": "ความเป็นส่วนตัว", "terms": "ข้อกำหนด", "support": "ความช่วยเหลือ", "language": "ภาษา", "navigation": "การนำทางหลัก", "privacyPolicy": "นโยบายความเป็นส่วนตัว", "termsOfUse": "ข้อกำหนดการใช้งาน", "skip": "ข้ามไปยังเนื้อหา", "error": "โหลดเอกสารทางกฎหมายไม่ได้ โปรดอัปเดตหรือติดตั้ง PackGo ใหม่", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "นโยบายความเป็นส่วนตัวของ PackGo", "terms-of-use": "ข้อกำหนดการใช้งาน PackGo", "support": "ความช่วยเหลือสำหรับ PackGo"}}, "vi": {"privacy": "Quyền riêng tư", "terms": "Điều khoản", "support": "Hỗ trợ", "language": "Ngôn ngữ", "navigation": "Điều hướng chính", "privacyPolicy": "Chính sách quyền riêng tư", "termsOfUse": "Điều khoản sử dụng", "skip": "Chuyển đến nội dung", "error": "Không thể tải tài liệu pháp lý. Hãy cập nhật hoặc cài lại PackGo.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "Chính sách quyền riêng tư của PackGo", "terms-of-use": "Điều khoản sử dụng PackGo", "support": "Hỗ trợ PackGo"}}, "ar": {"privacy": "الخصوصية", "terms": "الشروط", "support": "الدعم", "language": "اللغة", "navigation": "التنقل الرئيسي", "privacyPolicy": "سياسة الخصوصية", "termsOfUse": "شروط الاستخدام", "skip": "الانتقال إلى المحتوى", "error": "تعذر تحميل المستند القانوني. يرجى تحديث PackGo أو إعادة تثبيته.", "copyright": "© 2026 Huanwei Ye", "titles": {"privacy-policy": "سياسة خصوصية PackGo", "terms-of-use": "شروط استخدام PackGo", "support": "دعم PackGo"}}};
  const documentName = document.documentElement.dataset.document;
  const content = document.getElementById("legal-content");
  const picker = document.getElementById("legal-language");
  const searchParams = new URLSearchParams(location.search);
  const isEmbedded = searchParams.get("embed") === "1" || document.documentElement.classList.contains("embedded");
  const requestedLanguage = searchParams.get("lang");
  const isLanguageLocked = searchParams.get("locked") === "1" && supportedLanguages.includes(requestedLanguage);
  let blocks = [];
  if (isEmbedded) document.documentElement.classList.add("embedded");
  if (isLanguageLocked) document.documentElement.classList.add("language-locked");
  for (const language of supportedLanguages) {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = languageLabels[language];
    option.lang = language;
    picker.append(option);
  }

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


  const matchLanguage = (requested) => {
    if (!requested) return undefined;
    const tag = requested.replaceAll("_", "-").toLowerCase();
    if (/^zh-(hant|tw|hk|mo)(-|$)/.test(tag)) return "zh-Hant";
    if (/^zh(-|$)/.test(tag)) return "zh-Hans";
    if (/^pt(-|$)/.test(tag)) return "pt-BR";
    return supportedLanguages.find((language) => language.toLowerCase() === tag || language === tag.split("-")[0]);
  };
  const bestInitialLanguage = () => {
    const explicit = matchLanguage(new URLSearchParams(location.search).get("lang"));
    if (explicit) return explicit;
    const hashLanguage = matchLanguage(decodeURIComponent(location.hash.slice(1)));
    if (hashLanguage) return hashLanguage;
    for (const preference of navigator.languages || [navigator.language]) {
      const language = matchLanguage(preference);
      if (language) return language;
    }
    return "en";
  };

  const localizeChrome = (language) => {
    const copy = chromeCopy[language];
    document.querySelector(".skip-link").textContent = copy.skip;
    document.querySelector(".language-picker").setAttribute("aria-label", copy.language);
    picker.setAttribute("aria-label", copy.language);
    document.querySelector(".site-nav").setAttribute("aria-label", copy.navigation);
    document.querySelector(".site-footer-inner > span").textContent = copy.copyright;
    document.title = copy.titles[documentName] || "PackGo";
    document.querySelector('meta[name="description"]').setAttribute("content", document.title);
    for (const link of document.querySelectorAll('a[href]')) {
      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("http")) continue;
      const target = new URL(rawHref, location.href);
      const fileName = target.pathname.split("/").pop();
      if (!["privacy-policy.html", "terms-of-use.html", "support.html"].includes(fileName)) continue;
      target.searchParams.set("lang", language);
      if (isLanguageLocked) target.searchParams.set("locked", "1");
      if (isEmbedded) target.searchParams.set("embed", "1");
      target.hash = language;
      link.setAttribute("href", `${fileName}${target.search}${target.hash}`);
      if (link.closest(".site-nav")) {
        link.textContent = fileName === "privacy-policy.html" ? copy.privacy : fileName === "terms-of-use.html" ? copy.terms : copy.support;
      } else if (link.closest(".footer-links")) {
        link.textContent = fileName === "privacy-policy.html" ? copy.privacyPolicy : fileName === "terms-of-use.html" ? copy.termsOfUse : copy.support;
      }
    }
  };

  const selectLanguage = (language, updateHistory = false) => {
    const index = Math.max(0, supportedLanguages.indexOf(language));
    const selectedLanguage = supportedLanguages[index];
    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
    content.innerHTML = renderMarkdown(blocks[index] || blocks[0]);
    localizeChrome(selectedLanguage);
    picker.value = selectedLanguage;
    if (updateHistory) {
      const currentURL = new URL(location.href);
      currentURL.searchParams.set("lang", selectedLanguage);
      currentURL.hash = selectedLanguage;
      history.pushState(null, "", `${currentURL.pathname}${currentURL.search}${currentURL.hash}`);
      content.focus({ preventScroll: true });
    }
  };
  picker.addEventListener("change", () => selectLanguage(picker.value, true));
  window.addEventListener("popstate", () => { if (blocks.length) selectLanguage(bestInitialLanguage()); });
  const source = window.PACKGO_LEGAL_SOURCE
    ? Promise.resolve(window.PACKGO_LEGAL_SOURCE)
    : fetch(`${documentName}.md`).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      });
  source.then((sourceText) => {
    const withoutFrontMatter = sourceText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    blocks = withoutFrontMatter.split(/\r?\n---\r?\n/).map((block) => block.trim()).filter(Boolean);
    if (blocks.length !== supportedLanguages.length) throw new Error("Missing localized legal content");
    selectLanguage(bestInitialLanguage());
  }).catch(() => {
    const language = bestInitialLanguage();
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localizeChrome(language);
    picker.value = language;
    content.innerHTML = `<p class="error">${escapeHTML(chromeCopy[language].error)}</p>`;
  });
})();
