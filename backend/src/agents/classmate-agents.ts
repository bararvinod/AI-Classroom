import { OpenAI } from 'openai';

export interface ClassmateProfile {
  name: string;
  personality: 'curious' | 'logical' | 'creative' | 'supportive';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
}

export class ClassmateAgent {
  private client: OpenAI;
  private profile: ClassmateProfile;

  constructor(profile: ClassmateProfile) {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.profile = profile;
  }

  private getPersonalityPrompt(): string {
    const personalities = {
      curious: 'You are curious and ask many "why" and "how" questions.',
      logical: 'You think logically and often point out connections and patterns.',
      creative: 'You think creatively and come up with unique perspectives and examples.',
      supportive: 'You are supportive and help others understand concepts by offering encouragement.',
    };

    return personalities[this.profile.personality];
  }

  async engageInDiscussion(topic: string, teacherResponse: string): Promise<string> {
    const systemPrompt = `You are a classmate (named ${this.profile.name}) in a Grade 8 classroom.
    ${this.getPersonalityPrompt()}
    You engage in peer discussions about Home Automation and related NCERT topics.
    Keep responses natural, conversational, and appropriate for middle school students.
    Respond as if you're talking to classmates, not giving a lecture.`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `The teacher just said: "${teacherResponse}\n\nWhat do you think about this? Please respond as a classmate (${this.profile.personality} personality).`,
        },
      ],
      system: systemPrompt,
      temperature: 0.8,
      max_tokens: 300,
    });

    return response.choices[0].message.content || '';
  }

  async askQuestion(topic: string): Promise<string> {
    const systemPrompt = `You are a classmate (named ${this.profile.name}) asking questions in class.
    ${this.getPersonalityPrompt()}
    Ask thoughtful questions about Home Automation that would be relevant for a Grade 8 student.`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `What question would you like to ask about ${topic}?`,
        },
      ],
      system: systemPrompt,
      temperature: 0.8,
      max_tokens: 200,
    });

    return response.choices[0].message.content || '';
  }
}

export class ClassmateOrchestrator {
  private classmates: ClassmateAgent[];

  constructor() {
    this.classmates = [
      new ClassmateAgent({
        name: 'Alex',
        personality: 'curious',
        learningStyle: 'visual',
      }),
      new ClassmateAgent({
        name: 'Jordan',
        personality: 'logical',
        learningStyle: 'auditory',
      }),
      new ClassmateAgent({
        name: 'Sam',
        personality: 'creative',
        learningStyle: 'kinesthetic',
      }),
      new ClassmateAgent({
        name: 'Casey',
        personality: 'supportive',
        learningStyle: 'visual',
      }),
    ];
  }

  async generateClassDiscussion(topic: string, teacherResponse: string): Promise<Map<string, string>> {
    const responses = new Map<string, string>();

    for (const classmate of this.classmates) {
      const response = await classmate.engageInDiscussion(topic, teacherResponse);
      responses.set(classmate['profile'].name, response);
    }

    return responses;
  }
}
