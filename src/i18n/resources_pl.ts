import { Resource } from "./types";

export const pl: Resource = {
  app: {
    notification: {
      title: "Nie zapomnij o nauce ✍️",
      body: "Kliknij aby rozpocząć codzienną naukę",
    },
  },
  navigation: {
    notes: "Notatki",
    study: "Nauka",
    profile: "Profil",
  },
  login: {
    title: "Logowanie",
    username: "Nazwa użytkownika lub email",
    password: "Hasło",
    submit: "Zaloguj",
    register: "Masz już konto?",
    dismiss: "Zamknij",
    required: "To pole jest wymagane",
    noSpace: "Nazwa użytkownika nie może zawierać spacji",
    passwordMinLength: "Hasło musi mieć nonajmniej {{PASSWORD_MIN_LENGTH}} znaków",
    "Failed to authenticate.": "Nazwa użytkownika lub hasło są nieprawidłowe",
    "Failed to create record.": "Email lub nazwa użytkownika są już w użyciu",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  register: {
    title: "Stwórz konto",
    username: "Nazwa użytkownika",
    email: "Email",
    password: "Hasło",
    confirmPassword: "Potwierdź hasło",
    submit: "Zarejestruj się",
    register: "Masz już konto?",
    dismiss: "Zamknij",
    required: "To pole jest wymagane",
    noSpace: "Nazwa użytkownika nie może zawierać spacji",
    notValidEmail: "Email nie jest poprawny",
    confirmPasswordNoMatch: "Hasła się nie zgadzają",
    passwordMinLength: "Hasło musi zawierać conajmniej {{PASSWORD_MIN_LENGTH}} znaków",
    "Failed to authenticate.": "Nazwa użytkownika lub hasło są nieprawidłowe",
    "Failed to create record.": "Email lub nazwa użytkownika są już w użyciu",
    "You are not allowed to perform this request.": "Nie możesz wykonać tej operacji",
  },
  user: {
    points: "{{points}} punktów",
    public: "Profil publiczny",
    language: "Język",
    newFriend: "Nowy użytkownik",
    settings: "Ustawienia",
    logout: "Wyloguj się",
  },
  notes: {
    modulesHeader: "Moduły",
    noteHeader: "Notatka",
    hello: "Cześć {{username}}",
    noContent: "Brak zawartości",
  },
  study: {
    study: "Zestawy do nauki",
    newStudySet: "Stwórz nowy",
    flashcards: "Fiszki",
    quiz: "Quiz",
    match: "Dopasuj",
    leaderboards: "Tablica wyników",
    terms: "Słówka",
    dismiss: "Zamknij",
    endAttempt: "Zakończ",
    result: "{{result}} poprawnych odpowiedzi",
    timeTaken: "Czas: {{timeTaken}}s",
    points: "Punkty: {{points}}",
    user: "Użytkownik",
    game: "Gra",
    date: "Data",
    score: "Wynik",
    matchEnd: "Gratulacje!",
    timeScore: "Ukończyłeś grę w {{timeScore}}s",
    misses: "Błędne odpowiedzi: {{incorrectCounter}}",
    createDialog: {
      title: "Nowy zestaw",
      name: "Nazwa",
      all: "Wszystkie słówka",
      module: "Moduł",
      note: "Notatka",
      includeTags: "Zawiera tylko słówka z tagami",
      excludeTags: "Wyklucz słówka z tagami",
      dismiss: "Zamknij",
      cancel: "Anuluj",
      create: "Stwórz",
      emptyName: "Nazwa nie może być pusta",
      selectModule: "Wybierz moduł z listy",
      selectNote: "Wybierz notatkę z listy",
      summary: "Ten set zawieta {{terms}} słówek",
      noTerms: "Nie można stworzyć zestawu bez słówek",
    },
  },
};
