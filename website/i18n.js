(function () {
  var STORAGE_KEY = 'site_lang';
  var DEFAULT_LANG = 'pl';

  var TRANSLATIONS = {
    pl: {
      nav_features: 'Funkcje',
      nav_how: 'Jak to działa',
      nav_audience: 'Dla kogo',
      nav_source: 'Kod źródłowy',
      nav_home: 'Strona główna',

      hero_eyebrow: 'Aplikacja mobilna · iOS, Android, web',
      hero_title: 'Studia w Łodzi, ogarnięte w jednej aplikacji',
      hero_lead: 'Uczelnie, miasto, stypendia, zniżki studenckie i kalkulator kosztów życia — zebrane w jednym miejscu, bez logowania i bez internetu. Dane są częścią aplikacji, więc działają nawet offline.',
      hero_stat1_label: 'uczelni w bazie',
      hero_stat2_label: 'partnerów zniżkowych',
      hero_stat3_label: 'rodzaje stypendiów',
      hero_image_alt: 'Widok wykorzystywany na ekranie głównym aplikacji StudiujWŁodzi',

      problem_title: 'Informacje o studiowaniu w Łodzi są rozproszone',
      problem_body: 'Osoby przenoszące się do Łodzi na studia muszą sprawdzać dziesiątki różnych stron — uczelni, urzędu miasta, portali stypendialnych i programów zniżkowych — żeby złożyć sobie pełny obraz. StudiujWŁodzi zbiera tę wiedzę w jednej, uporządkowanej aplikacji, którą można przeglądać offline, bez zakładania konta.',

      features_title: 'Co znajdziesz w aplikacji',
      f1_title: 'Przewodnik po uczelniach',
      f1_body: 'Przeszukiwalna lista 6 łódzkich uczelni publicznych i artystycznych — filtruj po typie, wyszukuj po nazwie i sprawdzaj pełne listy kierunków studiów dla każdej z nich.',
      f2_title: 'Poznaj Łódź',
      f2_body: 'Galeria zdjęć, opis życia studenckiego, przewodnik po dzielnicach oraz interaktywna mapa kampusów z lokalizacją każdej uczelni.',
      f3_title: 'Stypendia',
      f3_body: 'Cztery rodzaje stypendiów krajowych z orientacyjnymi kwotami i bezpośrednimi odnośnikami do formalności na gov.pl.',
      f4_title: 'Kalkulator kosztów życia',
      f4_body: 'Suwaki dla czynszu, jedzenia, transportu i rozrywki z podglądem na żywo na wykresie kołowym oraz szybkim resetem do wartości domyślnych.',
      f5_title: 'Zniżki studenckie',
      f5_body: '17 partnerów Karty Łodzianina / Młodzi w Łodzi w 6 kategoriach — transport, kultura, sport, gastronomia, edukacja i zdrowie — z filtrowaniem po kategorii.',
      f6_title: 'Tryb jasny i ciemny',
      f6_body: 'Aplikacja dopasowuje się do ustawień systemowych, a preferencję motywu można nadpisać ręcznie — zostaje zapamiętana na urządzeniu.',

      how_title: 'Jak to działa',
      how1_title: 'Wszystkie dane są w aplikacji',
      how1_body: 'Uczelnie, zniżki, stypendia i treści o mieście są wpisane na stałe w kod aplikacji — nie ma serwera, API ani bazy danych do odpytania.',
      how2_title: 'Działa bez internetu',
      how2_body: 'Poza wczytaniem interaktywnej mapy kampusów, cała aplikacja działa offline — idealnie w podróży albo przy słabym zasięgu.',
      how3_title: 'Bez konta i bez śledzenia',
      how3_body: 'Nie trzeba się logować ani podawać danych osobowych. Jedyne co jest zapisywane lokalnie na urządzeniu, to wybrany motyw kolorystyczny.',

      audience_title: 'Dla kogo jest StudiujWŁodzi',
      a1_title: 'Kandydaci na studia',
      a1_body: 'Porównanie uczelni i kierunków studiów w jednym miejscu, zanim jeszcze zdecydujesz, gdzie złożyć dokumenty.',
      a2_title: 'Osoby przeprowadzające się do Łodzi',
      a2_body: 'Przewodnik po mieście, orientacyjny kalkulator kosztów i interaktywna mapa kampusów na start w nowym miejscu.',
      a3_title: 'Obecni studenci',
      a3_body: 'Aktualna baza zniżek studenckich, informacje o stypendiach i wskazówki dotyczące życia studenckiego w Łodzi.',

      recognition_eyebrow: 'Wyróżnienie',
      recognition_title: 'TOP 3 · APPetyt na studiowanie w Łodzi',
      recognition_body: 'Listopad 2025 — hackathon zorganizowany przez Uniwersytet Łódzki podczas Łódź IT Days na Wydziale Matematyki i Informatyki. Aplikacja zdobyła miejsce w finałowej trójce spośród 13 zespołów, a jej architektura i projekt zostały obronione przed komisją uczelnianą.',

      cta_title: 'Projekt jest open source',
      cta_body: 'Kod aplikacji jest dostępny publicznie na licencji MIT — możesz go przejrzeć, zgłosić uwagę albo dorzucić własne dane.',
      cta_button: 'Zobacz repozytorium na GitHubie',

      footer_tagline: 'StudiujWŁodzi — Konrad Malinowski',
      footer_privacy: 'Polityka prywatności',
      footer_license: 'Licencja MIT',

      index_meta_title: 'StudiujWŁodzi — przewodnik dla studentów Łodzi',
      index_meta_description: 'StudiujWŁodzi zbiera informacje o uczelniach, mieście, stypendiach, zniżkach i kosztach życia w Łodzi w jednej, działającej offline aplikacji.',

      privacy_updated: 'Ostatnia aktualizacja: lipiec 2026',
      privacy_h1: 'Polityka prywatności',
      privacy_intro: 'StudiujWŁodzi jest aplikacją bez konta, bez logowania i bez serwera — wszystkie treści (uczelnie, zniżki, stypendia, opis miasta) są wbudowane w aplikację i nie wymagają połączenia z internetem. Poniżej opisujemy dokładnie, jakie dane są przetwarzane.',
      privacy_s1_title: 'Jakie dane zbieramy',
      privacy_s1_body: 'Żadne. Aplikacja nie wymaga rejestracji ani logowania, nie zbiera danych osobowych, nie zawiera analityki ani śledzenia zachowań użytkownika i nie wysyła żadnych danych na żaden serwer należący do twórcy aplikacji.',
      privacy_s2_title: 'Dane przechowywane lokalnie na urządzeniu',
      privacy_s2_body: 'Jedyną informacją zapisywaną lokalnie jest wybrany motyw kolorystyczny (jasny / ciemny), przechowywany w pamięci urządzenia (AsyncStorage na iOS/Android, localStorage w wersji web) pod kluczem <code>APP_COLOR_SCHEME_OVERRIDE</code>. Ta wartość nigdy nie opuszcza urządzenia i nie jest w żaden sposób powiązana z tożsamością użytkownika. Ta strona internetowa (ta, którą teraz czytasz) osobno zapamiętuje wybrany język interfejsu w pamięci przeglądarki (localStorage) pod kluczem <code>site_lang</code> — ta wartość również nigdy nie opuszcza przeglądarki.',
      privacy_s3_title: 'Połączenia z usługami zewnętrznymi',
      privacy_s3_body: 'Aplikacja łączy się z internetem tylko w jednym przypadku: gdy użytkownik otworzy interaktywną mapę kampusów. Wtedy pobierane są kafelki mapy z serwera CARTO (<code>basemaps.cartocdn.com</code>) oraz biblioteka Leaflet.js z <code>unpkg.com</code>. Te usługi mogą technicznie zarejestrować adres IP urządzenia jako część standardowej obsługi żądania HTTP — twórca aplikacji nie ma dostępu do tych danych i nie przekazuje im żadnych dodatkowych informacji o użytkowniku.',
      privacy_s4_title: 'Linki zewnętrzne',
      privacy_s4_body: 'Ekrany stypendiów i zniżek zawierają odnośniki do stron zewnętrznych (np. gov.pl, kartalodzianina.pl, strony uczelni i partnerów zniżkowych). Po opuszczeniu aplikacji te strony podlegają własnym politykom prywatności, niezależnym od StudiujWŁodzi.',
      privacy_s5_title: 'Prawa użytkownika',
      privacy_s5_body: 'Ponieważ aplikacja nie zbiera ani nie przechowuje żadnych danych osobowych poza urządzeniem użytkownika, nie ma potrzeby składania wniosków o dostęp, poprawę czy usunięcie danych — nic takiego nie jest nigdzie przechowywane. Usunięcie aplikacji usuwa również lokalnie zapisaną preferencję motywu.',
      privacy_s6_title: 'Zmiany w polityce prywatności',
      privacy_s6_body: 'Jeśli w przyszłości aplikacja zacznie przetwarzać dodatkowe dane (np. w wyniku nowej funkcji), ta strona zostanie odpowiednio zaktualizowana przed wydaniem takiej zmiany.',
      privacy_s7_title: 'Kontakt',
      privacy_s7_body: 'Pytania dotyczące prywatności można kierować przez <a href="https://github.com/konradxmalinowski/StudyLodz/issues" target="_blank" rel="noopener">zgłoszenie na GitHubie</a>.',
      privacy_meta_title: 'Polityka prywatności — StudiujWŁodzi',
      privacy_meta_description: 'Polityka prywatności aplikacji StudiujWŁodzi: jakie dane są przetwarzane (żadne konto, żadne śledzenie) i jak działa aplikacja offline.'
    },

    en: {
      nav_features: 'Features',
      nav_how: 'How it works',
      nav_audience: 'Who it’s for',
      nav_source: 'Source code',
      nav_home: 'Home',

      hero_eyebrow: 'Mobile app · iOS, Android, web',
      hero_title: 'Studying in Łódź, sorted in one app',
      hero_lead: 'Universities, city guide, scholarships, student discounts, and a cost-of-living calculator — all in one place, no sign-up and no internet required. The data ships with the app, so it works offline too.',
      hero_stat1_label: 'universities listed',
      hero_stat2_label: 'discount partners',
      hero_stat3_label: 'scholarship types',
      hero_image_alt: 'The view used on the app’s home screen',

      problem_title: 'Information about studying in Łódź is scattered',
      problem_body: 'Students moving to Łódź have to check dozens of different sites — university, city hall, scholarship portals, and discount programmes — to get the full picture. StudiujWŁodzi brings that knowledge into one organized app you can browse offline, without creating an account.',

      features_title: 'What’s inside the app',
      f1_title: 'University guide',
      f1_body: 'A searchable list of 6 public and arts universities in Łódź — filter by type, search by name, and check the full list of fields of study for each one.',
      f2_title: 'Discover Łódź',
      f2_body: 'A photo gallery, an overview of student life, a neighbourhood guide, and an interactive campus map showing every university’s location.',
      f3_title: 'Scholarships',
      f3_body: 'Four types of national scholarships with approximate amounts and direct links to the formalities on gov.pl.',
      f4_title: 'Cost-of-living calculator',
      f4_body: 'Sliders for rent, food, transport, and entertainment, with a live pie-chart preview and a quick reset to the defaults.',
      f5_title: 'Student discounts',
      f5_body: '17 partners of Karta Łodzianina / Młodzi w Łodzi across 6 categories — transport, culture, sport, food, education, and health — filterable by category.',
      f6_title: 'Light and dark mode',
      f6_body: 'The app follows your system settings, and you can override the theme manually — your choice is remembered on the device.',

      how_title: 'How it works',
      how1_title: 'All the data lives in the app',
      how1_body: 'Universities, discounts, scholarships, and city content are built directly into the app’s code — there’s no server, API, or database to query.',
      how2_title: 'Works without internet',
      how2_body: 'Aside from loading the interactive campus map, the entire app works offline — great for travelling or when signal is weak.',
      how3_title: 'No account, no tracking',
      how3_body: 'There’s no need to log in or provide any personal data. The only thing stored locally on the device is your chosen colour theme.',

      audience_title: 'Who StudiujWŁodzi is for',
      a1_title: 'Prospective students',
      a1_body: 'Compare universities and fields of study in one place before you even decide where to apply.',
      a2_title: 'People moving to Łódź',
      a2_body: 'A city guide, a rough cost calculator, and an interactive campus map to help you get started in a new place.',
      a3_title: 'Current students',
      a3_body: 'An up-to-date database of student discounts, scholarship information, and tips on student life in Łódź.',

      recognition_eyebrow: 'Recognition',
      recognition_title: 'TOP 3 · APPetyt na studiowanie w Łodzi',
      recognition_body: 'November 2025 — a hackathon organized by the University of Łódź during Łódź IT Days at the Faculty of Mathematics and Computer Science. The app placed in the top 3 out of 13 teams, and its architecture and design were defended in front of the university committee.',

      cta_title: 'The project is open source',
      cta_body: 'The app’s code is publicly available under the MIT license — you can browse it, open an issue, or contribute your own data.',
      cta_button: 'View the repository on GitHub',

      footer_tagline: 'StudiujWŁodzi — Konrad Malinowski',
      footer_privacy: 'Privacy Policy',
      footer_license: 'MIT License',

      index_meta_title: 'StudiujWŁodzi — a guide for students in Łódź',
      index_meta_description: 'StudiujWŁodzi brings together information about universities, the city, scholarships, discounts, and cost of living in Łódź into one offline-capable app.',

      privacy_updated: 'Last updated: July 2026',
      privacy_h1: 'Privacy Policy',
      privacy_intro: 'StudiujWŁodzi is an app with no account, no sign-in, and no server — all content (universities, discounts, scholarships, city guide) is built into the app and doesn’t require an internet connection. Below we explain exactly what data is processed.',
      privacy_s1_title: 'What data we collect',
      privacy_s1_body: 'None. The app doesn’t require registration or sign-in, doesn’t collect personal data, contains no analytics or behaviour tracking, and doesn’t send any data to a server owned by the app’s creator.',
      privacy_s2_title: 'Data stored locally on your device',
      privacy_s2_body: 'The only piece of information saved locally is your chosen colour theme (light / dark), stored in on-device storage (AsyncStorage on iOS/Android, localStorage on web) under the key <code>APP_COLOR_SCHEME_OVERRIDE</code>. This value never leaves the device and is never linked to your identity in any way. This website (the one you’re reading now) separately remembers your chosen interface language in your browser’s localStorage under the key <code>site_lang</code> — that value also never leaves your browser.',
      privacy_s3_title: 'Connections to external services',
      privacy_s3_body: 'The app connects to the internet in exactly one case: when you open the interactive campus map. At that point, map tiles are fetched from the CARTO server (<code>basemaps.cartocdn.com</code>) and the Leaflet.js library from <code>unpkg.com</code>. These services may technically log your device’s IP address as part of standard HTTP request handling — the app’s creator has no access to that data and passes no additional user information to them.',
      privacy_s4_title: 'External links',
      privacy_s4_body: 'The scholarships and discounts screens contain links to external sites (e.g. gov.pl, kartalodzianina.pl, university and discount-partner websites). Once you leave the app, those sites are governed by their own privacy policies, independent of StudiujWŁodzi.',
      privacy_s5_title: 'Your rights',
      privacy_s5_body: 'Since the app doesn’t collect or store any personal data beyond your own device, there’s no need to file requests for access, correction, or deletion — nothing like that is stored anywhere. Deleting the app also removes the locally stored theme preference.',
      privacy_s6_title: 'Changes to this privacy policy',
      privacy_s6_body: 'If the app starts processing additional data in the future (e.g. as a result of a new feature), this page will be updated accordingly before that change ships.',
      privacy_s7_title: 'Contact',
      privacy_s7_body: 'Questions about privacy can be raised via <a href="https://github.com/konradxmalinowski/StudyLodz/issues" target="_blank" rel="noopener">an issue on GitHub</a>.',
      privacy_meta_title: 'Privacy Policy — StudiujWŁodzi',
      privacy_meta_description: 'StudiujWŁodzi privacy policy: what data is processed (no account, no tracking) and how the app works offline.'
    }
  };

  function getStoredLang() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === 'en' || v === 'pl' ? v : null;
    } catch {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore — preference just won't persist across visits
    }
  }

  function setMeta(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function applyLanguage(lang) {
    var dict = TRANSLATIONS[lang];
    var page = document.body.getAttribute('data-page');

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      if (dict[key] !== undefined) {
        el.setAttribute('alt', dict[key]);
      }
    });

    var titleKey = page + '_meta_title';
    var descKey = page + '_meta_description';
    if (dict[titleKey]) {
      document.title = dict[titleKey];
      setMeta('meta[property="og:title"]', 'content', dict[titleKey]);
      setMeta('meta[name="twitter:title"]', 'content', dict[titleKey]);
    }
    if (dict[descKey]) {
      setMeta('meta[name="description"]', 'content', dict[descKey]);
      setMeta('meta[property="og:description"]', 'content', dict[descKey]);
      setMeta('meta[name="twitter:description"]', 'content', dict[descKey]);
    }

    var toggle = document.querySelector('.lang-toggle');
    if (toggle) {
      toggle.textContent = lang === 'pl' ? 'EN' : 'PL';
      toggle.setAttribute('aria-label', lang === 'pl' ? 'Switch to English' : 'Przełącz na polski');
    }

    storeLang(lang);
  }

  function initLangToggle() {
    var toggle = document.querySelector('.lang-toggle');
    var current = getStoredLang() || DEFAULT_LANG;
    applyLanguage(current);
    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = document.documentElement.lang === 'pl' ? 'en' : 'pl';
        applyLanguage(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLangToggle);
  } else {
    initLangToggle();
  }

  window.__TRANSLATIONS__ = TRANSLATIONS;
})();
