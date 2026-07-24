import { OpenAI } from 'openai';

export interface Project {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  materials: string[];
  steps: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: string[];
}

export class ProjectGenerator {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateProject(
    topic: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
  ): Promise<Project> {
    const systemPrompt = `You are an expert in project-based learning for Grade 8 students.
    Create a ${difficulty} project about Home Automation that is:
    - Engaging and practical
    - Can be completed by students (with teacher guidance)
    - Demonstrates real-world applications
    - Includes clear steps
    
    Return JSON with: title, description, objectives (array), materials (array), steps (array), estimatedTime, and resources (array).`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `Create a ${difficulty} project for Grade 8 students about "${topic}" in Home Automation.`,
        },
      ],
      system: systemPrompt,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0].message.content || '';
    const parsed = JSON.parse(content);

    return {
      id: `project-${Date.now()}`,
      title: parsed.title,
      description: parsed.description,
      objectives: parsed.objectives,
      materials: parsed.materials,
      steps: parsed.steps,
      estimatedTime: parsed.estimatedTime,
      difficulty: difficulty,
      resources: parsed.resources,
    };
  }
}
