import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/agents', require('./routes/agents'));
app.use('/api/content', require('./routes/content'));
app.use('/api/classroom', require('./routes/classroom'));
app.use('/api/curriculum', require('./routes/curriculum'));

// WebSocket Handler
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (data) => {
    console.log('Received:', data);
    // Handle classroom interactions
  });
  
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app, httpServer, wss };
