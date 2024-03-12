export interface PreferencesInterface {
  sportId: number;
  sportName: string;
  sportImage: string;
  preferences: ArrayPreferences[];
}

export interface ArrayPreferences {
  questionId: number;
  question: string;
  answerId: number;
  answer: string;
}
