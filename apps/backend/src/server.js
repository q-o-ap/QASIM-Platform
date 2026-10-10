import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    name: 'QASIM Platform API',
    version: '1.0.0',
    status: 'ready',
    message: 'Welcome to the QASIM Platform backend.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'qasim-platform-backend',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`QASIM Platform API running on http://localhost:${port}`);
});
