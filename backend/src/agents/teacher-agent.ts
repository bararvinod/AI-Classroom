import { OpenAI } from 'openai';

interface TeacherContext {
  topic: string;
  studentLevel: 'beginner' | 'intermediate' | 'advanced';
  previousMessages: any[];
}

export class TeacherAgent {
  private client: OpenAI;
  private systemPrompt: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.systemPrompt = `You are an expert AI Teacher for Grade 8 NCERT curriculum, specifically teaching Home Automation.
    
    Your responsibilities:
    1. Explain concepts clearly in a way students can understand
    2. Provide real-world examples and applications
    3. Ask guiding questions to promote critical thinking
    4. Adapt explanations based on student understanding level
    5. Be encouraging and supportive
    6. Provide structured learning paths
    
    Always maintain a friendly, professional tone suitable for 8th grade students.`;
  }

  async explainConcept(concept: string, context: TeacherContext): Promise<string> {
    const messages = [
      ...context.previousMessages,
      {
        role: 'user' as const,
        content: `Please explain "${concept}" for a ${context.studentLevel} student learning about Home Automation.`,
      },
    ];

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      system: this.systemPrompt,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || '';
  }

  async answerQuestion(question: string, context: TeacherContext): Promise<string> {
    const messages = [
      ...context.previousMessages,
      {
        role: 'user' as const,
        content: question,
      },
    ];

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      system: this.systemPrompt,
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0].message.content || '';
  }

  async generateLessonOutline(topic: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `Create a detailed lesson outline for "${topic}" (Grade 8 NCERT Home Automation). Include learning objectives, key concepts, activities, and assessment methods.`,
        },
      ],
      system: this.systemPrompt,
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || '';
  }
}
