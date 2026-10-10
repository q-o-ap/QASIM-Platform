import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const crmMetrics = {
  monthlyRevenue: '$148,260',
  newLeads: '1,284',
  winRate: '37.8%',
  pipelineHealth: '84%' 
};

const deals = [
  { client: 'Northwind Labs', value: '$24,800', stage: 'Proposal', owner: 'Alicia', probability: 72 },
  { client: 'BluePeak Studio', value: '$18,400', stage: 'Negotiation', owner: 'Daniel', probability: 68 },
  { client: 'Mercury Health', value: '$32,600', stage: 'Discovery', owner: 'Priya', probability: 41 },
  { client: 'Orion Retail', value: '$16,900', stage: 'Closed Won', owner: 'Lucas', probability: 100 }
];

const leads = [
  { name: 'Harbor Finance', company: 'Harbor Finance', source: 'Website', value: '$12,300', status: 'Qualified' },
  { name: 'Summit Cloud', company: 'Summit Cloud', source: 'Referral', value: '$18,900', status: 'Follow-up' },
  { name: 'Peak Works', company: 'Peak Works', source: 'Outbound', value: '$9,500', status: 'New' },
  { name: 'Luma Retail', company: 'Luma Retail', source: 'Campaign', value: '$14,700', status: 'Qualified' }
];

const activity = [
  { title: 'Call booked', detail: 'Discovery call scheduled with Summit Cloud', time: '15 min ago' },
  { title: 'Email sent', detail: 'Proposal shared with Northwind Labs team', time: '1 hour ago' },
  { title: 'Deal updated', detail: 'BluePeak moved to negotiation stage', time: '3 hours ago' },
  { title: 'Lead scored', detail: 'Peak Works reached high-intent score', time: 'Yesterday' }
];

app.get('/api', (req, res) => {
  res.json({
    name: 'QASIM Platform API',
    version: '1.0.0',
    status: 'ready',
    product: 'CRM Dashboard',
    message: 'Welcome to the QASIM CRM backend.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'qasim-crm-backend',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    metrics: crmMetrics,
    deals,
    leads,
    activity,
    overview: {
      activeDeals: '42',
      conversion: '18.4%',
      avgCycleTime: '12 days',
      teamTarget: '92%'
    }
  });
});

app.get('/api/deals', (req, res) => {
  res.json(deals);
});

app.get('/api/leads', (req, res) => {
  res.json(leads);
});

app.listen(port, () => {
  console.log(`QASIM CRM API running on http://localhost:${port}`);
});
