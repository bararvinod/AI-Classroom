import { OpenAI } from 'openai';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export class QuizGenerator {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateQuestion(
    topic: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<QuizQuestion> {
    const systemPrompt = `You are a quiz expert creating questions for Grade 8 NCERT Home Automation.
    Generate ${difficulty} difficulty questions.
    
    Return response in JSON format with:
    - question: string
    - options: array of 4 strings
    - correctAnswer: index (0-3)
    - explanation: why this is correct
    - difficulty: the level`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `Create a ${difficulty} difficulty quiz question about "${topic}" for Home Automation (Grade 8).`,
        },
      ],
      system: systemPrompt,
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = response.choices[0].message.content || '';
    const parsed = JSON.parse(content);

    return {
      id: `q-${Date.now()}`,
      question: parsed.question,
      options: parsed.options,
      correctAnswer: parsed.correctAnswer,
      explanation: parsed.explanation,
      difficulty: difficulty,
      topic: topic,
    };
  }

  async generateQuiz(topic: string, numQuestions: number = 5): Promise<QuizQuestion[]> {
    const questions: QuizQuestion[] = [];
    const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

    for (let i = 0; i < numQuestions; i++) {
      const difficulty = difficulties[i % difficulties.length];
      const question = await this.generateQuestion(topic, difficulty);
      questions.push(question);
    }

    return questions;
  }
}
