export interface WorkedExampleStep {
  stepNumber: number;
  explanation: string;
  mathExpression?: string;
  hint?: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  problemStatement: string;
  problemMath?: string;
  steps: WorkedExampleStep[];
  finalAnswer: string;
  finalAnswerMath?: string;
  bacTip?: string;
}

export interface TheorySection {
  title: string;
  summary: string;
  contentHtml?: string;
  formulaTex: string;
  formulaDescription: string;
  properties: { label: string; formulaTex: string; note?: string }[];
  keyTheorem?: { title: string; statement: string; mathTex?: string };
}

export interface Lesson {
  id: string;
  conceptId: string;
  title: string;
  videoUrl: string;
  videoTitle: string;
  videoDuration: string;
  videoThumbnail: string;
  estimatedMinutes: number;
  objectives: string[];
  theory: TheorySection;
  workedExamples: WorkedExample[];
}
