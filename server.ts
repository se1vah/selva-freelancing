import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory store with file fallback
interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDescription: string;
  preferredDate: string;
  status: 'pending' | 'reviewed' | 'scheduled';
  createdAt: string;
  type: 'consultation';
}

interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'replied';
  createdAt: string;
  type: 'general';
}

type RecordItem = ConsultationBooking | ContactInquiry;

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data dir:', err);
  }
}

function loadRecords(): RecordItem[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Failed to read data file:', e);
  }
  return [
    {
      id: 'REQ-1001',
      fullName: 'Karthik Raja',
      email: 'karthik@freshgrocers.in',
      phone: '9840123456',
      service: 'App Development',
      projectDescription: 'We need an Android grocery delivery app for our regional retail chain with real-time order tracking.',
      preferredDate: '2026-11-02',
      status: 'scheduled',
      createdAt: '2026-10-23T14:30:00Z',
      type: 'consultation'
    },
    {
      id: 'REQ-1002',
      fullName: 'Ananya Sharma',
      email: 'ananya@texlogistics.com',
      phone: '9945087654',
      service: 'Business Application Development',
      projectDescription: 'Looking for a custom invoice and warehouse stock reconciliation dashboard with thermal print receipts.',
      preferredDate: '2026-11-05',
      status: 'pending',
      createdAt: '2026-10-24T09:15:00Z',
      type: 'consultation'
    }
  ];
}

let records: RecordItem[] = loadRecords();

function saveRecords() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save data file:', e);
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Selva Freelancing', timestamp: new Date().toISOString() });
});

// GET all inquiries / bookings for the inquiry manager
app.get('/api/inquiries', (req, res) => {
  res.json({
    success: true,
    data: records,
    count: records.length,
  });
});

// POST new Consultation Booking
app.post('/api/consultations', (req, res) => {
  const { fullName, email, phone, service, projectDescription, preferredDate } = req.body;

  // Validation
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
    return res.status(400).json({ success: false, error: 'A valid phone number is required.' });
  }

  if (!service || typeof service !== 'string' || !service.trim()) {
    return res.status(400).json({ success: false, error: 'Please select a required service.' });
  }

  if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 10) {
    return res.status(400).json({ success: false, error: 'Please provide a project description (at least 10 characters).' });
  }

  if (!preferredDate) {
    return res.status(400).json({ success: false, error: 'Please specify your preferred consultation date.' });
  }

  const newBooking: ConsultationBooking = {
    id: `SELVA-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    service: service.trim(),
    projectDescription: projectDescription.trim(),
    preferredDate,
    status: 'pending',
    createdAt: new Date().toISOString(),
    type: 'consultation',
  };

  records.unshift(newBooking);
  saveRecords();

  return res.status(201).json({
    success: true,
    message: 'Consultation request received successfully.',
    booking: newBooking,
  });
});

// POST new General Contact Message
app.post('/api/contact', (req, res) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!message || message.trim().length < 5) {
    return res.status(400).json({ success: false, error: 'Please write a message.' });
  }

  const newContact: ContactInquiry = {
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : undefined,
    message: message.trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
    type: 'general',
  };

  records.unshift(newContact);
  saveRecords();

  return res.status(201).json({
    success: true,
    message: 'Message delivered successfully.',
    inquiry: newContact,
  });
});

// Update inquiry status
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const itemIndex = records.findIndex(r => r.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, error: 'Inquiry not found.' });
  }

  records[itemIndex] = {
    ...records[itemIndex],
    status,
  };
  saveRecords();

  return res.json({ success: true, item: records[itemIndex] });
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Selva Freelancing server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Server startup failure:', err);
  process.exit(1);
});
