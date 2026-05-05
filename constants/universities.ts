export type UniversityField = {
  name: string;
  description: string;
};

export type University = {
  title: string;
  content: string;
  fields: UniversityField[];
  type: 'publiczna' | 'artystyczna';
};

export const UNIVERSITIES: University[] = [
  {
    title: 'Politechnika Łódzka',
    content:
      'Lider innowacji i techniki, którego absolwenci są wysoko cenieni przez pracodawców zarówno w Polsce, jak i na rynkach międzynarodowych.',
    type: 'publiczna',
    fields: [
      { name: 'Informatyka', description: 'Nowoczesne laboratoria, współpraca z firmami IT i wysokie zarobki po studiach.' },
      { name: 'Automatyka i Robotyka', description: 'Projektowanie inteligentnych systemów i robotów przyszłości.' },
      { name: 'Budownictwo', description: 'Tworzenie nowoczesnych konstrukcji i infrastruktury miejskiej.' },
      { name: 'Elektrotechnika', description: 'Zastosowanie energii elektrycznej w przemyśle, energetyce i nowoczesnych technologiach.' },
      { name: 'Inżynieria Materiałowa', description: 'Badanie i projektowanie nowych materiałów dla przemysłu i medycyny.' },
      { name: 'Transport', description: 'Projektowanie systemów transportowych i zarządzanie logistyką.' },
      { name: 'Architektura', description: 'Kształtowanie przestrzeni miejskiej i projektowanie nowoczesnych budynków.' },
      { name: 'Mechatronika', description: 'Integracja mechaniki, elektroniki i informatyki w nowoczesnych urządzeniach.' },
      { name: 'Energetyka', description: 'Pozyskiwanie i zarządzanie energią w sposób zrównoważony.' },
      { name: 'Inżynieria Biomedyczna', description: 'Technologie wspierające medycynę i rehabilitację.' },
      { name: 'Technologia Chemiczna', description: 'Projektowanie procesów chemicznych i materiałów dla przemysłu.' },
      { name: 'Biotechnologia Techniczna', description: 'Zastosowanie biotechnologii w produkcji żywności, farmacji i ochronie środowiska.' },
      { name: 'Inżynieria Środowiska', description: 'Ochrona środowiska, gospodarka wodna i technologie proekologiczne.' },
      { name: 'Zarządzanie i Inżynieria Produkcji', description: 'Łączenie kompetencji inżynierskich z zarządzaniem procesami produkcyjnymi.' },
      { name: 'Fizyka Techniczna', description: 'Zaawansowane zastosowania fizyki w nowoczesnych technologiach i badaniach.' },
      { name: 'Matematyka', description: 'Analiza, algebra i metody numeryczne stosowane w nauce i przemyśle.' },
    ],
  },
  {
    title: 'Uniwersytet Łódzki',
    content:
      'Kształci ponad 23 tysiące studentów na ponad 90 kierunkach, oferując liczne programy wymiany międzynarodowej.',
    type: 'publiczna',
    fields: [
      { name: 'Prawo', description: 'Prestiżowy kierunek otwierający drzwi do kariery w sądownictwie i biznesie.' },
      { name: 'Ekonomia', description: 'Analiza rynków finansowych i strategii gospodarczych w globalnym świecie.' },
      { name: 'Psychologia', description: 'Zrozumienie ludzkiego umysłu i zachowań w teorii i praktyce klinicznej.' },
      { name: 'Filologia Angielska', description: 'Zaawansowana znajomość języka angielskiego i kultury krajów anglojęzycznych.' },
      { name: 'Zarządzanie', description: 'Nowoczesne metody kierowania zespołami i przedsiębiorstwami.' },
      { name: 'Informatyka', description: 'Programowanie, analiza danych i technologie informacyjne w biznesie.' },
      { name: 'Finanse i Rachunkowość', description: 'Zarządzanie finansami przedsiębiorstw i analiza ekonomiczna.' },
      { name: 'Dziennikarstwo i Komunikacja Społeczna', description: 'Media, PR i nowoczesne formy komunikacji.' },
      { name: 'Socjologia', description: 'Badanie społeczeństwa, jego struktur i współczesnych zjawisk społecznych.' },
      { name: 'Biotechnologia', description: 'Zastosowanie nauk biologicznych i chemicznych w medycynie i przemyśle.' },
      { name: 'Stosunki Międzynarodowe', description: 'Polityka globalna, dyplomacja i współpraca międzynarodowa.' },
      { name: 'Historia', description: 'Badanie przeszłości od starożytności po czasy najnowsze z perspektywą krytyczną.' },
      { name: 'Filozofia', description: 'Logika, etyka i historia myśli od Sokratesa po współczesność.' },
      { name: 'Matematyka', description: 'Czysta i stosowana matematyka z szerokim zastosowaniem w nauce i biznesie.' },
      { name: 'Pedagogika', description: 'Teoria i praktyka wychowania, nauczania i wspierania rozwoju człowieka.' },
      { name: 'Turystyka i Rekreacja', description: 'Zarządzanie turystyką, hotelarstwo i organizacja czasu wolnego.' },
      { name: 'Chemia', description: 'Eksperymentalne i teoretyczne badania materii od skali atomowej po przemysłową.' },
      { name: 'Biologia', description: 'Badania nad organizmami żywymi, ekosystemami i biotechnologią.' },
    ],
  },
  {
    title: 'Uniwersytet Medyczny',
    content:
      'Instytucja wyróżnia się nowoczesnymi laboratoriami i jako jedyna w Polsce prowadzi kształcenie lekarzy wojskowych, co świadczy o jej wyjątkowości i prestiżu.',
    type: 'publiczna',
    fields: [
      { name: 'Kierunek Lekarski', description: 'Elitarny program kształcący przyszłych lekarzy i specjalistów.' },
      { name: 'Farmacja', description: 'Badania nad nowymi lekami i ich wpływem na zdrowie człowieka.' },
      { name: 'Kosmetologia', description: 'Połączenie wiedzy medycznej z nowoczesnymi technologiami w dziedzinie urody.' },
      { name: 'Pielęgniarstwo', description: 'Opieka nad pacjentem i współpraca z zespołem medycznym.' },
      { name: 'Dietetyka', description: 'Zasady zdrowego odżywiania i profilaktyki chorób dietozależnych.' },
      { name: 'Fizjoterapia', description: 'Rehabilitacja i przywracanie sprawności ruchowej pacjentów.' },
      { name: 'Analityka Medyczna', description: 'Diagnostyka laboratoryjna i analiza biologiczna próbek.' },
      { name: 'Zdrowie Publiczne', description: 'Zarządzanie systemem ochrony zdrowia i profilaktyką chorób.' },
      { name: 'Położnictwo', description: 'Profesjonalna opieka nad kobietami w ciąży i noworodkami.' },
      { name: 'Ratownictwo Medyczne', description: 'Udzielanie pomocy w stanach nagłego zagrożenia życia i zdrowia.' },
      { name: 'Elektroradiologia', description: 'Obsługa aparatury diagnostycznej — RTG, MRI, tomografia i ultrasonografia.' },
    ],
  },
  {
    title: 'Akademia Sztuk Pięknych',
    content:
      'Uczelnia artystyczna o międzynarodowej renomie, kształcąca w zakresie sztuk wizualnych, projektowych i konserwatorskich.',
    type: 'artystyczna',
    fields: [
      { name: 'Wzornictwo', description: 'Kreatywne projekty, międzynarodowe warsztaty i możliwość tworzenia dla znanych marek.' },
      { name: 'Architektura Wnętrz', description: 'Projektowanie funkcjonalnych i estetycznych przestrzeni użytkowych.' },
      { name: 'Animacja', description: 'Tworzenie filmów animowanych, efektów specjalnych i grafiki ruchomej.' },
      { name: 'Fotografia i multimedia', description: 'Sztuka opowiadania historii za pomocą obrazu, od technik analogowych po cyfrowe.' },
      { name: 'Projektowanie graficzne', description: 'Komunikacja wizualna, identyfikacja marek i projektowanie publikacji.' },
      { name: 'Malarstwo', description: 'Ekspresja artystyczna przez kolor i formę — od klasycznych technik po nowoczesne media.' },
      { name: 'Rzeźba i Działania Przestrzenne', description: 'Praca z materią, przestrzenią i instalacją w skali od kameralnej po architektoniczną.' },
      { name: 'Tkanina i Ubiór', description: 'Łódzka tradycja włókiennicza połączona z nowoczesnym projektowaniem mody i tkanin.' },
      { name: 'Konserwacja i Restauracja Dzieł Sztuki', description: 'Ratowanie i przywracanie do życia dzieł malarstwa, rzeźby i rzemiosła artystycznego.' },
    ],
  },
  {
    title: 'Akademia Muzyczna',
    content:
      'Nowoczesna uczelnia muzyczna, oferująca szeroki wachlarz specjalności, od muzyki klasycznej po jazz i produkcję muzyczną.',
    type: 'artystyczna',
    fields: [
      { name: 'Instrumentalistyka', description: 'Indywidualne doskonalenie gry na instrumentach klasycznych i jazzowych.' },
      { name: 'Wokalistyka', description: 'Kształcenie głosu i warsztatu śpiewaczego w muzyce klasycznej i rozrywkowej.' },
      { name: 'Jazz i Muzyka Estradowa', description: 'Kształcenie wokalistów i instrumentalistów w zakresie muzyki rozrywkowej.' },
      { name: 'Kompozycja i Teoria Muzyki', description: 'Tworzenie własnych utworów i analiza dzieł muzycznych.' },
      { name: 'Dyrygentura', description: 'Kierowanie zespołami orkiestrowymi i chóralnymi, interpretacja partytur.' },
      { name: 'Muzyka w Mediach i Produkcja Muzyczna', description: 'Realizacja dźwięku, produkcja muzyczna i muzyka filmowa.' },
      { name: 'Edukacja Artystyczna w Zakresie Sztuki Muzycznej', description: 'Pedagogika muzyczna — nauczanie gry i teorii na wszystkich poziomach.' },
      { name: 'Sztuki Sceniczne', description: 'Kształcenie w zakresie choreografii, tańca i reżyserii muzycznej.' },
    ],
  },
  {
    title: 'Szkoła Filmowa w Łodzi',
    content:
      'Jedna z najstarszych i najbardziej renomowanych uczelni filmowych na świecie, kształcąca wybitnych reżyserów, operatorów i aktorów.',
    type: 'artystyczna',
    fields: [
      { name: 'Reżyseria Filmowa i Telewizyjna', description: 'Kształcenie przyszłych autorów filmowych, od etiud po pełnometrażowe debiuty.' },
      { name: 'Sztuka Operatorska', description: 'Nauka tworzenia obrazu filmowego, od kompozycji po oświetlenie i techniki zdjęciowe.' },
      { name: 'Film Animowany i Efekty Specjalne', description: 'Tworzenie animacji 2D i 3D, efektów wizualnych i postprodukcja obrazu.' },
      { name: 'Organizacja Produkcji Filmowej i Telewizyjnej', description: 'Zarządzanie procesem produkcji filmowej, od scenariusza po dystrybucję.' },
      { name: 'Aktorstwo', description: 'Intensywne kształcenie aktorskie, przygotowujące do pracy w teatrze, filmie i telewizji.' },
      { name: 'Montaż', description: 'Narracja przez cięcie — łączenie obrazu i dźwięku w spójną dramaturgię.' },
      { name: 'Realizacja Dźwięku', description: 'Nagrywanie, montaż i mixing dźwięku dla kina, telewizji i nowych mediów.' },
    ],
  },
];
