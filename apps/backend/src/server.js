import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dashboardMetrics = {
  totalRevenue: '$184,240',
  activeUsers: '24.8K',
  conversionRate: '8.42%',
  avgRetention: '94.1%'
};

const customers = [
  { name: 'Northwind Labs', plan: 'Enterprise', value: '$18,400', status: 'Active' },
  { name: 'BluePeak Studio', plan: 'Growth', value: '$12,800', status: 'Active' },
  { name: 'Mercury Health', plan: 'Scale', value: '$9,760', status: 'Trial' },
  { name: 'Orion Retail', plan: 'Starter', value: '$4,200', status: 'Active' }
];

const activity = [
  { title: 'New signup', detail: 'Northwind Labs joined Growth plan', time: '2 hours ago' },
  { title: 'Invoice paid', detail: 'BluePeak Studio paid annual invoice', time: '5 hours ago' },
  { title: 'Feature adoption', detail: 'Automation usage increased by 18%', time: 'Yesterday' },
  { title: 'Support resolved', detail: 'Mercury Health ticket closed', time: '2 days ago' }
];

app.get('/api', (req, res) => {
  res.json({
    name: 'QASIM Platform API',
    version: '1.0.0',
    status: 'ready',
    product: 'SaaS Dashboard',
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

app.get('/api/dashboard', (req, res) => {
  res.json({
    metrics: dashboardMetrics,
    customers,
    activity,
    overview: {
      monthlyGrowth: '+14.8%',
      churnRate: '2.1%',
      responseTime: '1.8s'
    }
  });
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/metrics', (req, res) => {
  res.json(dashboardMetrics);
});

app.listen(port, () => {
  console.log(`QASIM Platform API running on http://localhost:${port}`);
});
