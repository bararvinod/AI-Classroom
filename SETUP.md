# Setup Instructions

## Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB (optional for local development)
- OpenAI API key
- Anthropic API key (optional)

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `.env` with your API keys:**
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
MONGODB_URI=mongodb://localhost:27017/ai-classroom
```

**Start the server:**
```bash
npm run dev
```

Server will run on `http://localhost:3001`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App will run on `http://localhost:5173`

## Project Structure Details

### Backend Structure

```
backend/src/
├── agents/
│   ├── teacher-agent.ts       # Main teacher AI
│   ├── classmate-agents.ts    # Peer learning agents
│   └── orchestrator.ts         # Multi-agent coordinator
├── content/
│   ├── slide-generator.ts      # Dynamic slide creation
│   ├── quiz-generator.ts       # Adaptive quizzes
│   ├── simulation-engine.ts    # Virtual experiments
│   └── project-generator.ts    # Project ideas
├── api/
│   ├── routes/
│   │   ├── agents.ts
│   │   ├── content.ts
│   │   ├── classroom.ts
│   │   └── curriculum.ts
│   └── websocket-handler.ts
├── services/
│   ├── llm-service.ts          # LLM integration
│   ├── voice-service.ts        # Text-to-speech
│   └── storage-service.ts      # Data persistence
├── models/
│   ├── User.ts
│   ├── Session.ts
│   └── Progress.ts
└── index.ts
```

### Frontend Structure

```
frontend/src/
├── components/
│   ├── ClassroomInterface.tsx  # Main interface
│   ├── SlideViewer.tsx          # Presentation mode
│   ├── QuizInterface.tsx        # Quiz component
│   ├── Whiteboard.tsx           # Drawing board
│   ├── SimulationViewer.tsx    # 3D simulations
│   └── Sidebar.tsx              # Classmates panel
├── pages/
│   ├── Classroom.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
├── hooks/
│   └── useClassroom.ts
├── App.tsx
└── index.css
```

## API Endpoints

### Agents
- `POST /api/agents/teacher/explain` - Get teacher explanation
- `POST /api/agents/classmates/discuss` - Generate classmate responses

### Content
- `GET /api/content/slides?topic=...` - Get slides
- `GET /api/content/quiz?topic=...` - Get quiz questions
- `POST /api/content/simulate` - Run simulation
- `GET /api/content/projects?topic=...` - Get project ideas

### Classroom
- `POST /api/classroom/discuss` - Send message to classroom
- `GET /api/classroom/status` - Get classroom status
- `POST /api/classroom/record` - Record interaction

### Curriculum
- `GET /api/curriculum/topics` - List all topics
- `GET /api/curriculum/outline?topic=...` - Get topic outline
- `GET /api/curriculum/resources?topic=...` - Get resources

## Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify API keys in .env file
- Check Node.js version: `node --version`

### Frontend can't connect to backend
- Ensure backend is running: `http://localhost:3001/api/health`
- Check CORS settings
- Verify WebSocket connection

### OpenAI API errors
- Verify API key is correct
- Check account has available credits
- Review rate limits

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **API Testing**: Use Postman or curl for API testing
3. **Browser DevTools**: React DevTools for component inspection
4. **Logs**: Check console for detailed error messages

## Deployment

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend  
cd frontend
npm run build
```

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy to Heroku (Backend)

```bash
heroku create your-app-name
git push heroku main
```

## Next Steps

1. Complete backend API implementation
2. Integrate voice features
3. Add 3D simulations
4. Implement user authentication
5. Add progress tracking
6. Deploy to production
