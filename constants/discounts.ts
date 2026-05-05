export type DiscountPartner = {
  name: string;
  category: string;
  discount: string;
  address?: string;
  url?: string;
};

export const DISCOUNT_CATEGORIES = [
  { name: 'Transport publiczny', icon: 'bus.fill' },
  { name: 'Kultura i sztuka', icon: 'theatermasks.fill' },
  { name: 'Sport i rekreacja', icon: 'figure.pool.swim' },
  { name: 'Gastronomia', icon: 'fork.knife' },
  { name: 'Edukacja i rozwój', icon: 'book.fill' },
  { name: 'Zdrowie i uroda', icon: 'heart.fill' },
];

export const DISCOUNT_PARTNERS: DiscountPartner[] = [
  // Transport publiczny
  {
    name: 'MPK Łódź',
    category: 'Transport publiczny',
    discount: '50% na bilet jednorazowy i miesięczny (bilet ulgowy)',
    address: 'al. Politechniki 5, Łódź',
    url: 'https://www.mpk.lodz.pl/bilety',
  },

  // Kultura i sztuka
  {
    name: 'Teatr Wielki w Łodzi',
    category: 'Kultura i sztuka',
    discount: '50% na bilety — z ważną legitymacją studencką',
    address: 'pl. Dąbrowskiego 1, Łódź',
    url: 'https://teatr-wielki.lodz.pl',
  },
  {
    name: 'Teatr Nowy im. Kazimierza Dejmka',
    category: 'Kultura i sztuka',
    discount: 'Zniżki studenckie na wybrane spektakle',
    address: 'ul. Zachodnia 93, Łódź',
    url: 'https://www.nowy.pl',
  },
  {
    name: 'Muzeum Sztuki w Łodzi (ms1 i ms2)',
    category: 'Kultura i sztuka',
    discount: 'Bilety ulgowe; wstęp bezpłatny w wybrane dni',
    address: 'ul. Więckowskiego 36 (ms1), ul. Ogrodowa 19 (ms2)',
    url: 'https://msl.org.pl',
  },
  {
    name: 'EC1 Łódź – Miasto Kultury',
    category: 'Kultura i sztuka',
    discount: 'Bilety ulgowe do centrum nauki i sztuki',
    address: 'ul. Targowa 1/3, Łódź',
    url: 'https://ec1lodz.pl',
  },
  {
    name: 'Kino Charlie',
    category: 'Kultura i sztuka',
    discount: 'Zniżki studenckie na wszystkie seanse',
    address: 'ul. Piotrkowska 203/205, Łódź',
    url: 'https://www.charlie.pl',
  },
  {
    name: 'Muzeum Miasta Łodzi',
    category: 'Kultura i sztuka',
    discount: 'Bilet ulgowy ze legitymacją studencką',
    address: 'ul. Ogrodowa 15, Łódź',
    url: 'https://muzeum-lodz.pl',
  },

  // Sport i rekreacja
  {
    name: 'Aquapark Fala',
    category: 'Sport i rekreacja',
    discount: 'Zniżki na bilety wstępu — okazanie legitymacji',
    address: 'ul. Unii Lubelskiej 4, Łódź',
    url: 'https://www.fala.lodz.pl',
  },
  {
    name: 'Centrum Sportu i Rekreacji PŁ (AZS)',
    category: 'Sport i rekreacja',
    discount: 'Bezpłatny lub ulgowy dostęp do obiektów sportowych dla studentów PŁ',
    address: 'ul. Politechniki 3b, Łódź',
    url: 'https://www.azs.p.lodz.pl',
  },
  {
    name: 'Hala Sportowa UŁ',
    category: 'Sport i rekreacja',
    discount: 'Dostęp do siłowni i sal sportowych dla studentów UŁ',
    address: 'ul. Matejki 21/23, Łódź',
  },

  // Gastronomia
  {
    name: 'Restauracje studenckie PŁ',
    category: 'Gastronomia',
    discount: 'Zniżkowe obiady i lunche dla studentów Politechniki',
    address: 'Kampus PŁ, ul. Żeromskiego, Łódź',
  },
  {
    name: 'Dom Studenta — kawiarnie i bufety',
    category: 'Gastronomia',
    discount: 'Zniżki na posiłki w bufetach akademickich',
  },

  // Edukacja i rozwój
  {
    name: 'Łódź Design Festival',
    category: 'Edukacja i rozwój',
    discount: 'Bilet studencki na warsztaty i wystawy (cena ulgowa)',
    url: 'https://lodzdesign.com',
  },
  {
    name: 'Łódź Film Festival',
    category: 'Edukacja i rozwój',
    discount: 'Akredytacje i bilety studenckie — dla studentów Szkoły Filmowej i innych uczelni',
    url: 'https://lodzfilmfestival.com',
  },
  {
    name: 'Biblioteka Miejska w Łodzi',
    category: 'Edukacja i rozwój',
    discount: 'Bezpłatna karta biblioteczna dla studentów',
    address: 'ul. Gdańska 100/102, Łódź',
    url: 'https://www.wimbp.lodz.pl',
  },

  // Zdrowie i uroda
  {
    name: 'Centrum Medyczne UMed',
    category: 'Zdrowie i uroda',
    discount: 'Ulgowe wizyty i usługi stomatologiczne w klinikach Uniwersytetu Medycznego',
    address: 'ul. Pomorska 251, Łódź',
    url: 'https://umed.lodz.pl',
  },
  {
    name: 'Salony fryzjerskie — wybrane',
    category: 'Zdrowie i uroda',
    discount: 'Do 20% zniżki po okazaniu legitymacji — sprawdź listę partnerów na kartalodzianina.pl',
    url: 'https://kartalodzianina.pl/mlodzi',
  },
];
