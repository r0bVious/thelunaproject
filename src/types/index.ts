interface Question {
  question_id: number;
  question_text: string;
  container_type: string;
}

interface Answer {
  answer_id: number;
  question_id: number;
  answer_text: string;
  button_type: string;
  button_style: string;
}

interface KidResProps {
  userId: number;
  questionId: number;
  answerId: number;
}

interface PhysResProps {
  userId: number | null;
  height?: number | null;
  weight?: number | null;
  hoursSlept?: number | null;
  condition?: number | null;
  symptoms?: Record<string, number>;
}

//do I need this?
interface SymptomResProps {
  userId: number;
  symId: number;
  severityScale: number;
}

interface Symptom {
  phys_sym_id: number;
  symptom_name: string;
}

interface LoginProps {
  userName: string;
}

export type {
  Question,
  Answer,
  KidResProps,
  PhysResProps,
  SymptomResProps,
  LoginProps,
  Symptom,
};
