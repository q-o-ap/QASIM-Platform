import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory database (replace with PostgreSQL later)
let leads = [
  { id: 1, name: 'Summit Cloud', company: 'Summit Cloud Inc', email: 'contact@summitcloud.com', phone: '+1-555-0101', source: 'Referral', status: 'Qualified', score: 85, value: '$18,900', owner: 'Sarah Chen' },
  { id: 2, name: 'Peak Works', company: 'Peak Works Ltd', email: 'hello@peakworks.io', phone: '+1-555-0102', source: 'Outbound', status: 'New', score: 72, value: '$9,500', owner: 'Marcus Johnson' },
  { id: 3, name: 'Harbor Finance', company: 'Harbor Finance Group', email: 'sales@harborfinance.com', phone: '+1-555-0103', source: 'Website', status: 'Qualified', score: 88, value: '$12,300', owner: 'Sarah Chen' },
  { id: 4, name: 'Luma Retail', company: 'Luma Retail Solutions', email: 'biz@lumaretail.com', phone: '+1-555-0104', source: 'Campaign', status: 'Follow-up', score: 65, value: '$14,700', owner: 'Emily Rodriguez' }
];

let nextId = 5;

const crmMetrics = {
  monthlyRevenue: '$148,260',
  newLeads: '1,284',
  winRate: '37.8%',
  pipelineHealth: '84%' 
};

const activity = [
  { title: 'Call booked', detail: 'Discovery call scheduled with Summit Cloud', time: '15 min ago' },
  { title: 'Email sent', detail: 'Proposal shared with Northwind Labs team', time: '1 hour ago' },
  { title: 'Deal updated', detail: 'BluePeak moved to negotiation stage', time: '3 hours ago' },
  { title: 'Lead scored', detail: 'Peak Works reached high-intent score', time: 'Yesterday' }
];

// Dashboard
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

// Leads endpoints
app.get('/api/leads', (req, res) => {
  const { status, source, owner, search } = req.query;
  let filtered = [...leads];

  if (status) {
    filtered = filtered.filter(l => l.status === status);
  }
  if (source) {
    filtered = filtered.filter(l => l.source === source);
  }
  if (owner) {
    filtered = filtered.filter(l => l.owner === owner);
  }
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(l => 
      l.name.toLowerCase().includes(term) || 
      l.company.toLowerCase().includes(term) ||
      l.email.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

app.get('/api/leads/:id', (req, res) => {
  const lead = leads.find(l => l.id === parseInt(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
});

app.post('/api/leads', (req, res) => {
  const { name, company, email, phone, source, status, score, value, owner } = req.body;
  
  if (!name || !company || !email) {
    return res.status(400).json({ error: 'Missing required fields: name, company, email' });
  }

  const newLead = {
    id: nextId++,
    name,
    company,
    email,
    phone: phone || '',
    source: source || 'Website',
    status: status || 'New',
    score: score || 50,
    value: value || '$0',
    owner: owner || 'Unassigned',
    createdAt: new Date().toISOString()
  };

  leads.push(newLead);
  res.status(201).json(newLead);
});

app.put('/api/leads/:id', (req, res) => {
  const lead = leads.find(l => l.id === parseInt(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  Object.assign(lead, req.body);
  res.json(lead);
});

app.delete('/api/leads/:id', (req, res) => {
  const index = leads.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Lead not found' });

  const deleted = leads.splice(index, 1);
  res.json({ message: 'Lead deleted', lead: deleted[0] });
});

// Stats
app.get('/api/leads/stats/summary', (req, res) => {
  res.json({
    total: leads.length,
    byStatus: {
      new: leads.filter(l => l.status === 'New').length,
      qualified: leads.filter(l => l.status === 'Qualified').length,
      followUp: leads.filter(l => l.status === 'Follow-up').length,
      converted: leads.filter(l => l.status === 'Converted').length
    },
    bySource: {
      website: leads.filter(l => l.source === 'Website').length,
      referral: leads.filter(l => l.source === 'Referral').length,
      outbound: leads.filter(l => l.source === 'Outbound').length,
      campaign: leads.filter(l => l.source === 'Campaign').length
    }
  });
});

app.listen(port, () => {
  console.log(`QASIM CRM API running on http://localhost:${port}`);
  console.log(`Leads API: GET http://localhost:${port}/api/leads`);
});
