# AI-Powered Interactive Classroom Platform
## Grade 8 NCERT - Home Automation

A multi-agent orchestrated platform that creates engaging, interactive classroom experiences with AI teachers, AI classmates, and real-time discussions.

### ✨ Features

- **AI Teacher Agent**: Explains concepts, answers questions, guides learning
- **AI Classmate Agents**: Engage in discussions, ask questions, provide peer perspective
- **Dynamic Content Generation**:
  - Interactive slides with animations
  - Auto-generated quizzes with adaptive difficulty
  - Interactive simulations and experiments
  - Project-based learning activities
- **Real-time Interactions**:
  - Voice-enabled discussions
  - Whiteboard drawing capabilities
  - Live Q&A sessions
  - Collaborative problem-solving

### 📦 Tech Stack

**Backend:**
- Node.js + Express
- TypeScript
- OpenAI/Claude API
- WebSocket for real-time communication
- MongoDB for persistence

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Three.js for 3D simulations
- Web Audio API for voice

### 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/bararvinod/ai-classroom.git
cd ai-classroom

# Backend setup
cd backend
npm install
cp .env.example .env  # Add your API keys
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### 📚 Curriculum: Grade 8 NCERT - Home Automation

1. Basic Concepts of Home Automation
2. Smart Home Systems
3. Sensors and Actuators
4. Control Systems
5. IoT Integration
6. Energy Management
7. Security Systems
8. Project: Design Your Smart Home

### 📁 Project Structure

```
ai-classroom/
├── backend/
│   ├── agents/
│   │   ├── teacher-agent.ts
│   │   ├── classmate-agents.ts
│   │   └── orchestrator.ts
│   ├── content/
│   │   ├── slide-generator.ts
│   │   ├── quiz-generator.ts
│   │   ├── simulation-engine.ts
│   │   └── project-generator.ts
│   ├── api/
│   ├── services/
│   └── config/
├── frontend/
│   ├── components/
│   ├─�� pages/
│   └── App.tsx
├── curriculum/
│   └── home-automation/
└── docs/
```

**Status**: 🚀 Active Development
