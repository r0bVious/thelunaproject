interface Question {
  question_id: number;
  question_text: string;
}

interface Answer {
  answer_id: number;
  question_id: number;
  answer_text: string;
}

export type { Question, Answer };
