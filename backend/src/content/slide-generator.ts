import { OpenAI } from 'openai';

export interface Slide {
  id: string;
  title: string;
  content: string;
  visualDescription: string;
  notes: string;
  animations: string[];
  order: number;
}

export class SlideGenerator {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSlideContent(topic: string, slideNumber: number, totalSlides: number): Promise<Slide> {
    const systemPrompt = `You are an expert in creating educational slides for Grade 8 students.
    Generate content that is:
    - Clear and easy to understand
    - Visually engaging (with descriptions for graphics)
    - Appropriate for the attention span of 8th graders
    - Include real-world examples from Home Automation
    
    Return the response in JSON format with: title, content, visualDescription, notes, and suggestedAnimations array.`;

    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user' as const,
          content: `Create slide ${slideNumber}/${totalSlides} about "${topic}" for a Home Automation lesson.`,
        },
      ],
      system: systemPrompt,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content || '';
    const parsed = JSON.parse(content);

    return {
      id: `slide-${slideNumber}`,
      title: parsed.title,
      content: parsed.content,
      visualDescription: parsed.visualDescription,
      notes: parsed.notes,
      animations: parsed.suggestedAnimations || [],
      order: slideNumber,
    };
  }

  async generateFullPresentation(topic: string, numSlides: number = 5): Promise<Slide[]> {
    const slides: Slide[] = [];

    for (let i = 1; i <= numSlides; i++) {
      const slide = await this.generateSlideContent(topic, i, numSlides);
      slides.push(slide);
    }

    return slides;
  }
}
