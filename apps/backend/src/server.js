import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory database
let leads = [
  { id: 1, name: 'Summit Cloud', company: 'Summit Cloud Inc', email: 'contact@summitcloud.com', phone: '+1-555-0101', source: 'Referral', status: 'Qualified', score: 85, value: '$18,900', owner: 'Sarah Chen' },
  { id: 2, name: 'Peak Works', company: 'Peak Works Ltd', email: 'hello@peakworks.io', phone: '+1-555-0102', source: 'Outbound', status: 'New', score: 72, value: '$9,500', owner: 'Marcus Johnson' },
  { id: 3, name: 'Harbor Finance', company: 'Harbor Finance Group', email: 'sales@harborfinance.com', phone: '+1-555-0103', source: 'Website', status: 'Qualified', score: 88, value: '$12,300', owner: 'Sarah Chen' },
  { id: 4, name: 'Luma Retail', company: 'Luma Retail Solutions', email: 'biz@lumaretail.com', phone: '+1-555-0104', source: 'Campaign', status: 'Follow-up', score: 65, value: '$14,700', owner: 'Emily Rodriguez' }
];

let deals = [
  { id: 101, leadId: 1, name: 'Summit Cloud - Growth Plan', company: 'Summit Cloud Inc', value: '$18,900', stage: 'Proposal', owner: 'Sarah Chen', probability: 72, createdAt: '2026-09-15' },
  { id: 102, leadId: null, name: 'Northwind Labs - Enterprise', company: 'Northwind Labs', value: '$24,800', stage: 'Negotiation', owner: 'Daniel Kim', probability: 68, createdAt: '2026-08-20' },
  { id: 103, leadId: null, name: 'Mercury Health - Scale', company: 'Mercury Health', value: '$32,600', stage: 'Discovery', owner: 'Priya Patel', probability: 41, createdAt: '2026-09-01' },
  { id: 104, leadId: null, name: 'Orion Retail - Closed', company: 'Orion Retail', value: '$16,900', stage: 'Closed Won', owner: 'Lucas Torres', probability: 100, createdAt: '2026-07-10' }
];

let customers = [
  { id: 1001, name: 'Northwind Labs', company: 'Northwind Labs', email: 'contact@northwindlabs.com', phone: '+1-555-0201', plan: 'Enterprise', status: 'Active', joinDate: '2026-07-10' },
  { id: 1002, name: 'Orion Retail', company: 'Orion Retail', email: 'support@orionretail.com', phone: '+1-555-0202', plan: 'Growth', status: 'Active', joinDate: '2026-07-10' }
];

let nextLeadId = 5;
let nextDealId = 105;
let nextCustomerId = 1003;

const crmMetrics = {
  monthlyRevenue: '$148,260',
  newLeads: '1,284',
  winRate: '37.8%',
  pipelineHealth: '84%' 
};

const activity = [
  { title: 'Deal converted', detail: 'Summit Cloud lead converted to deal', time: '15 min ago' },
  { title: 'Call booked', detail: 'Discovery call scheduled with Summit Cloud', time: '1 hour ago' },
  { title: 'Email sent', detail: 'Proposal shared with Northwind Labs team', time: '3 hours ago' },
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
    deals,
    leads: leads.slice(0, 4),
    activity,
    overview: {
      activeDeals: deals.length.toString(),
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

  if (status) filtered = filtered.filter(l => l.status === status);
  if (source) filtered = filtered.filter(l => l.source === source);
  if (owner) filtered = filtered.filter(l => l.owner === owner);
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
    id: nextLeadId++,
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

// Deals endpoints
app.get('/api/deals', (req, res) => {
  const { stage, owner, search } = req.query;
  let filtered = [...deals];

  if (stage) filtered = filtered.filter(d => d.stage === stage);
  if (owner) filtered = filtered.filter(d => d.owner === owner);
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(term) || 
      d.company.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

app.get('/api/deals/:id', (req, res) => {
  const deal = deals.find(d => d.id === parseInt(req.params.id));
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  res.json(deal);
});

app.post('/api/deals', (req, res) => {
  const { leadId, name, company, value, stage, owner, probability } = req.body;
  
  if (!name || !company) {
    return res.status(400).json({ error: 'Missing required fields: name, company' });
  }

  const newDeal = {
    id: nextDealId++,
    leadId: leadId || null,
    name,
    company,
    value: value || '$0',
    stage: stage || 'Discovery',
    owner: owner || 'Unassigned',
    probability: probability || 50,
    createdAt: new Date().toISOString()
  };

  deals.push(newDeal);

  // If converting from lead, update lead status
  if (leadId) {
    const lead = leads.find(l => l.id === leadId);
    if (lead) lead.status = 'Converted';
  }

  res.status(201).json(newDeal);
});

app.put('/api/deals/:id', (req, res) => {
  const deal = deals.find(d => d.id === parseInt(req.params.id));
  if (!deal) return res.status(404).json({ error: 'Deal not found' });

  Object.assign(deal, req.body);
  res.json(deal);
});

app.delete('/api/deals/:id', (req, res) => {
  const index = deals.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Deal not found' });

  const deleted = deals.splice(index, 1);
  res.json({ message: 'Deal deleted', deal: deleted[0] });
});

// Convert lead to deal
app.post('/api/leads/:id/convert', (req, res) => {
  const lead = leads.find(l => l.id === parseInt(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  if (lead.status === 'Converted') return res.status(400).json({ error: 'Lead already converted' });

  const { dealName, dealValue, dealStage } = req.body;
  
  const newDeal = {
    id: nextDealId++,
    leadId: lead.id,
    name: dealName || `${lead.name} - Deal`,
    company: lead.company,
    value: dealValue || lead.value,
    stage: dealStage || 'Discovery',
    owner: lead.owner,
    probability: 50,
    createdAt: new Date().toISOString()
  };

  deals.push(newDeal);
  lead.status = 'Converted';

  res.status(201).json({ deal: newDeal, lead });
});

// Customers endpoints
app.get('/api/customers', (req, res) => {
  const { status, search } = req.query;
  let filtered = [...customers];

  if (status) filtered = filtered.filter(c => c.status === status);
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.company.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

// Convert deal to customer
app.post('/api/deals/:id/convert-customer', (req, res) => {
  const deal = deals.find(d => d.id === parseInt(req.params.id));
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  if (deal.stage !== 'Closed Won') return res.status(400).json({ error: 'Only closed deals can convert to customers' });

  const { plan, contact } = req.body;
  
  const newCustomer = {
    id: nextCustomerId++,
    name: contact?.name || deal.name,
    company: deal.company,
    email: contact?.email || '',
    phone: contact?.phone || '',
    plan: plan || 'Growth',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0]
  };

  customers.push(newCustomer);

  res.status(201).json({ customer: newCustomer, deal });
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
    }
  });
});

app.get('/api/deals/stats/summary', (req, res) => {
  res.json({
    total: deals.length,
    byStage: {
      discovery: deals.filter(d => d.stage === 'Discovery').length,
      proposal: deals.filter(d => d.stage === 'Proposal').length,
      negotiation: deals.filter(d => d.stage === 'Negotiation').length,
      closedWon: deals.filter(d => d.stage === 'Closed Won').length,
      closedLost: deals.filter(d => d.stage === 'Closed Lost').length
    }
  });
});

app.listen(port, () => {
  console.log(`QASIM CRM API running on http://localhost:${port}`);
  console.log(`Leads API: GET http://localhost:${port}/api/leads`);
  console.log(`Deals API: GET http://localhost:${port}/api/deals`);
});
