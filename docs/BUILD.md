# Build — od zera do gotowej aplikacji w sklepie

Kompletny przewodnik po buildowaniu **StudiujWŁodzi** na iOS i Android — od instalacji narzędzi do gotowego `.ipa` / `.aab` w App Store i Google Play.

---

## Wymagania wstępne

| Narzędzie | Wersja | Do czego |
|---|---|---|
| Node.js | 20 LTS+ | uruchamianie skryptów npm |
| npm | 10+ | menedżer pakietów |
| EAS CLI | 16.25+ | cloud build i submit |
| Konto Expo | bezpłatne | dostęp do EAS Build |
| Apple Developer Program | $99/rok | build i submit na iOS |
| Google Play Console | $25 jednorazowo | submit na Android |

> Cloud build (**EAS Build**) oznacza, że nie potrzebujesz lokalnie Xcode ani Android Studio — build działa na serwerach Expo.

---

## 1. Instalacja narzędzi

### Node.js

Pobierz instalator LTS z [nodejs.org](https://nodejs.org/). Sprawdź:

```bash
node -v   # v20.x lub wyżej
npm -v    # 10.x lub wyżej
```

### EAS CLI

```bash
npm install -g eas-cli
eas --version   # powinno pokazać 16.25.x lub wyżej
```

---

## 2. Klonowanie i instalacja zależności

```bash
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
```

---

## 3. Logowanie do Expo

```bash
eas login
```

Podaj email i hasło konta expo.dev (utwórz bezpłatnie na [expo.dev](https://expo.dev) jeśli nie masz).

Sprawdź że jesteś zalogowany:

```bash
eas whoami
# → konradxmalinowski
```

---

## 4. Build na iOS

### 4.1 Wymagania iOS

- Aktywne konto w **Apple Developer Program** — [developer.apple.com](https://developer.apple.com) ($99/rok)
- Apple ID z włączoną weryfikacją dwuetapową (2FA)
- Aplikacja **nie musi** być stworzona w App Store Connect przed buildem — EAS może ją stworzyć automatycznie

### 4.2 Uruchom build

```bash
eas build --platform ios --profile production
```

Przy pierwszym buildzie EAS przeprowadzi cię przez konfigurację Apple:

**Pytanie 1 — logowanie do Apple**
```
How would you like to authenticate with Apple?
> Apple ID (username/password)
```
Podaj swój Apple ID. Jeśli masz 2FA (wymagane przez Apple), zostaniesz poproszony o kod z iPhone.

**Pytanie 2 — certyfikaty**
```
Distribution Certificate: no existing certificates found
> Generate a new Apple Distribution Certificate
```
Wybierz generowanie nowego — EAS automatycznie tworzy certyfikat i przechowuje go w chmurze.

**Pytanie 3 — provisioning profile**
```
Provisioning Profile: no existing profiles found
> Generate a new profile
```
Wybierz generowanie nowego.

Po akceptacji build startuje w chmurze. Otrzymasz link do śledzenia postępu:

```
Build details: https://expo.dev/accounts/konradxmalinowski/projects/StudiujWLodzi/builds/...
```

**Czas budowania: ok. 15–25 minut.**

Po zakończeniu EAS wyświetli link do pobrania pliku `.ipa`.

### 4.3 Ponowne buildy

Przy kolejnych buildach certyfikaty są już zapisane — wystarczy:

```bash
eas build --platform ios --profile production
```

Nie będzie pytań o Apple — build wystartuje od razu.

---

## 5. Submit na iOS (App Store)

### 5.1 Przygotuj App Store Connect

1. Wejdź na [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Kliknij **My Apps → + → New App**
3. Wypełnij:
   - **Platform:** iOS
   - **Name:** StudiujWŁodzi
   - **Primary Language:** Polish
   - **Bundle ID:** `com.konradxmalinowski.StudiujWLodzi`
   - **SKU:** dowolny unikalny ciąg, np. `studiujwlodzi2024`
4. Zapisz — aplikacja jest teraz widoczna w App Store Connect

### 5.2 Wyślij build do App Store Connect

```bash
eas submit --platform ios --latest
```

EAS zapyta o metodę uwierzytelniania. Zalecana metoda — **klucz API App Store Connect (ASC API Key)**:

**Jak wygenerować klucz ASC API Key:**
1. App Store Connect → Users and Access → Integrations → App Store Connect API
2. Kliknij **+ Generate API Key**
3. Name: `EAS Submit`, Access: **App Manager**
4. Pobierz plik `.p8` (można pobrać tylko raz!)
5. Zapisz **Key ID** i **Issuer ID** widoczne na stronie

Podaj dane EAS:
```
Key ID:     XXXXXXXXXX
Issuer ID:  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Key file:   /ścieżka/do/AuthKey_XXXXXXXXXX.p8
```

Submit zajmuje 1–2 minuty. Build trafi do **TestFlight** automatycznie.

### 5.3 Publikacja w App Store

W App Store Connect:
1. Wejdź w swoją aplikację → **TestFlight** — sprawdź czy build jest widoczny
2. Przejdź do zakładki **App Store → + Version → 1.0.0**
3. Uzupełnij metadane:
   - Screenshots (wymagane: 6.7" iPhone, 12.9" iPad)
   - Opis, słowa kluczowe, kategoria
   - Privacy Policy URL (wymagane)
4. W sekcji **Build** kliknij **+** i wybierz przesłany build
5. Kliknij **Submit for Review**

Czas recenzji Apple: **1–3 dni robocze**.

---

## 6. Build na Android

### 6.1 Uruchom build

```bash
eas build --platform android --profile production
```

Android nie wymaga interaktywnego logowania do Google — EAS automatycznie generuje klucz podpisywania (keystore) i przechowuje go w chmurze.

Przy pierwszym buildzie zobaczysz:
```
Keystore: no existing keystore found
> Generate a new keystore
```
Wybierz generowanie. EAS stworzy i zaszyfruje keystore na swoich serwerach.

**Czas budowania: ok. 10–20 minut.**

Otrzymasz plik `.aab` (Android App Bundle) — format wymagany przez Google Play.

### 6.2 Ponowne buildy

```bash
eas build --platform android --profile production
```

Keystore jest zapisany — build wystartuje bez pytań.

---

## 7. Submit na Android (Google Play)

### 7.1 Przygotuj Google Play Console

1. Wejdź na [play.google.com/console](https://play.google.com/console) (konto deweloperskie $25 jednorazowo)
2. Kliknij **Create app**
3. Wypełnij:
   - **App name:** StudiujWŁodzi
   - **Default language:** Polish
   - **App or game:** App
   - **Free or paid:** Free
4. Uzupełnij **Policy declaration** (wymagane do publikacji)

### 7.2 Skonfiguruj automatyczny submit w eas.json

Dodaj dane Google Play do `eas.json`:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

**Jak wygenerować `google-service-account.json`:**
1. Google Play Console → Setup → API Access
2. Kliknij **Link to a Google Cloud project** (lub utwórz nowy)
3. W Google Cloud Console → IAM → Service Accounts → Create Service Account
4. Nadaj rolę **Service Account User**
5. Utwórz klucz JSON → pobierz plik
6. Wróć do Play Console → Grant access dla tego service account z rolą **Release manager**

### 7.3 Wyślij build

```bash
eas submit --platform android --latest
```

Build trafi do **Internal testing** track w Google Play.

### 7.4 Publikacja w Google Play

W Google Play Console:
1. **Internal testing** → wybierz build → **Promote to production**
2. Uzupełnij metadane sklepu (opisy, screenshots, ikona)
3. Kliknij **Send for review**

Czas recenzji Google: **kilka godzin do 3 dni**.

---

## 8. Obie platformy jednocześnie

```bash
eas build --platform all --profile production
```

Uruchamia równolegle buildy iOS i Android. Oba ukończone mniej więcej w tym samym czasie.

---

## 9. Profile buildów

W `eas.json` są trzy profile:

| Profil | Do czego | Dystrybucja |
|---|---|---|
| `development` | lokalny development z Expo Dev Client | internal |
| `preview` | testowanie przed releasem (bez App Store/Play) | internal (.ipa / .apk) |
| `production` | build produkcyjny do sklepów | store (.ipa / .aab) |

### Preview build — instalacja bez sklepu

Możesz zainstalować `preview` bezpośrednio na urządzeniu (bez App Store):

```bash
eas build --platform ios --profile preview
```

Na iOS wymaga **provisioning profile z urządzeniem testowym** (ad-hoc) — dodaj UDID urządzenia w Apple Developer Portal. EAS przeprowadzi przez ten krok.

Na Androidzie `preview` tworzy `.apk` do bezpośredniej instalacji:

```bash
eas build --platform android --profile preview
# pobierz .apk z linku i wyślij na telefon
```

---

## 10. Śledzenie buildów

Wszystkie buildy widoczne na:
```
https://expo.dev/accounts/konradxmalinowski/projects/StudiujWLodzi/builds
```

Logi w czasie rzeczywistym dostępne po kliknięciu w konkretny build.

---

## 11. Aktualizacja aplikacji

Przy każdej nowej wersji:

1. Zmień `version` w `app.json` (np. `"1.0.1"`)
2. `buildNumber` / `versionCode` jest inkrementowany automatycznie (`"autoIncrement": true` w `eas.json`)
3. Uruchom build i submit jak wyżej

```bash
# Edytuj app.json → version: "1.0.1"
eas build --platform all --profile production
eas submit --platform all --latest
```

---

## 12. Rozwiązywanie problemów

**`Distribution Certificate is not validated for non-interactive builds`**
Uruchom bez flagi `--non-interactive` — EAS musi interaktywnie potwierdzić certyfikat Apple.

**`No remote versions are configured`**
Normalny komunikat przy pierwszym buildzie — EAS zainicjuje `buildNumber` z wartości w `app.json`.

**`app.json is missing ios.infoPlist.ITSAppUsesNonExemptEncryption`**
Już naprawione — plik zawiera `"ITSAppUsesNonExemptEncryption": false`.

**Build zakończył się błędem TypeScript / lint**
```bash
npx expo lint       # sprawdź błędy ESLint
```
Napraw błędy, zrób commit i push, potem uruchom build ponownie.

**`eas submit` — brak aplikacji w App Store Connect**
Utwórz aplikację ręcznie w App Store Connect zanim uruchomisz submit (patrz sekcja 5.1).

---

## Podsumowanie komend

```bash
# Instalacja
npm install -g eas-cli
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi && npm install

# Logowanie
eas login

# Build
eas build --platform ios --profile production      # tylko iOS
eas build --platform android --profile production  # tylko Android
eas build --platform all --profile production      # obie naraz

# Submit
eas submit --platform ios --latest
eas submit --platform android --latest
eas submit --platform all --latest
```
