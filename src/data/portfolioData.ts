import { ServiceItem, ProjectItem, WhyChooseItem, TestimonialItem } from '../types';

export const CONTACT_INFO = {
  brandName: 'Selva Freelancing',
  founderName: 'Selva',
  title: 'Freelance Software Developer & Systems Engineer',
  phone: '8148544881',
  phoneFormatted: '+91 81485 44881',
  phoneLink: 'tel:8148544881',
  instagram: 'https://instagram.com/selva_6_',
  instagramHandle: '@selva_6_',
  website: 'https://selva-freelancing.vercel.app',
  email: 'selvacopy@gmail.com',
  location: 'Tamil Nadu, India',
  whatsappLink: 'https://wa.me/918148544881?text=Hi%20Selva,%20I%20would%20like%20to%20discuss%20a%20software%20project.',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'app-dev',
    title: 'App Development',
    category: 'Mobile Engineering',
    description: 'Android and mobile applications designed to deliver smooth user experiences and reliable functionality.',
    deliverables: [
      'Native Android & Cross-Platform builds',
      'Google Play Store deployment & compliance',
      'Offline-first caching & smooth animations',
      'Payment gateways & push notification setup'
    ],
    icon: 'Smartphone'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Full-Stack Web',
    description: 'Responsive, modern websites and web applications for businesses and individuals.',
    deliverables: [
      'High-performance React & Next.js architectures',
      'SEO-friendly, high Lighthouse score pages',
      'Mobile-first responsive fluid layouts',
      'Secure REST & GraphQL API integrations'
    ],
    icon: 'Globe'
  },
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    category: 'Bespoke Solutions',
    description: 'Tailor-made software solutions based on specific business requirements.',
    deliverables: [
      'Custom internal operational tools',
      'Third-party software & API orchestrations',
      'Specialized database schema engineering',
      'Legacy software modernization'
    ],
    icon: 'Cpu'
  },
  {
    id: 'business-app',
    title: 'Business Application Development',
    category: 'Enterprise Operations',
    description: 'Billing, inventory management, invoicing, and workflow automation systems.',
    deliverables: [
      'Automated invoice generation & thermal printing',
      'Real-time inventory & stock tracking',
      'Daily ledger, cashbook & tax calculations',
      'Role-based permissions & audit logging'
    ],
    icon: 'FileSpreadsheet'
  },
  {
    id: 'domain-hosting',
    title: 'Domain & Hosting Setup',
    category: 'Infrastructure & Web Ops',
    description: 'Domain registration assistance, hosting configuration, deployment, and website maintenance.',
    deliverables: [
      'DNS routing, SSL certificates & CDN setup',
      'Zero-downtime CI/CD continuous deployment',
      'Vercel, Cloud Run & VPS configurations',
      'Routine security patches & backup strategies'
    ],
    icon: 'Server'
  },
  {
    id: 'cloud-infra',
    title: 'Cloud Infrastructure Integration',
    category: 'Cloud Engineering',
    description: 'Cloud deployment, scalable infrastructure, and integrations that support business growth.',
    deliverables: [
      'Automated cloud backups & disaster recovery',
      'Scalable database storage & caching layers',
      'Microservices & serverless functions',
      'Monitoring, uptime alerting & performance tuning'
    ],
    icon: 'Cloud'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'grace-fresh-market',
    title: 'Grace Fresh Market',
    category: 'Grocery Delivery Application',
    description: 'Grace Fresh Market is a grocery delivery application that allows users to browse fresh produce, vegetables, fruits, and everyday essential products. Customers can explore available items and conveniently place grocery orders online.',
    features: [
      'Fresh grocery and produce browsing',
      'Everyday essential products catalog',
      'Online ordering experience with real-time cart',
      'Convenient grocery shopping and order management'
    ],
    tags: ['Android', 'Google Play', 'Mobile Commerce', 'Cart & Checkout', 'Cloud Backend'],
    link: 'https://play.google.com/store/apps/details?id=com.gracefresh.market.grace_fresh_market',
    linkText: 'View on Google Play',
    linkType: 'external',
    accentColor: '#10B981' // Fresh emerald green accent
  },
  {
    id: 'business-billing-inventory',
    title: 'Business Billing & Inventory Management Application',
    category: 'Business Software',
    description: 'A billing application built for small-scale businesses to simplify inventory management and automate invoicing. It helps streamline everyday operations, organize stock, and make routine billing tasks more efficient.',
    features: [
      'Inventory and stock management with low-stock alerts',
      'Automated invoice generation and tax calculation',
      'Simplified daily billing operations and quick checkout',
      'Improved business workflow and sales analytics'
    ],
    tags: ['Desktop & Web', 'Billing Automation', 'Stock Control', 'Invoice Generator', 'Reports'],
    linkText: 'Request a Demo',
    linkType: 'consultation',
    accentColor: '#6366F1' // Royal indigo accent
  }
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'tailored',
    title: 'Solutions Tailored to Client Requirements',
    description: 'No cookie-cutter templates. Every line of code and user flow is built around your specific business model and operational needs.',
    icon: 'Sliders'
  },
  {
    id: 'clean-code',
    title: 'Clean and Maintainable Development',
    description: 'Disciplined modular architecture, typed codebases, and comprehensive documentation ensure your software remains easy to scale and extend.',
    icon: 'Code2'
  },
  {
    id: 'responsive-ui',
    title: 'Responsive and User-Friendly Interfaces',
    description: 'Thoughtfully designed user interfaces that feel lightning-fast, intuitive, and accessible on smartphones, tablets, and desktop workstations.',
    icon: 'Layout'
  },
  {
    id: 'communication',
    title: 'Reliable Communication',
    description: 'Direct collaboration without layers of account managers. You get prompt responses, regular progress demonstrations, and milestone transparency.',
    icon: 'MessageSquareCheck'
  },
  {
    id: 'scalable-tech',
    title: 'Scalable Technology Choices',
    description: 'Built on industry-standard technologies like React, Node.js, Kotlin/Android, and modern cloud hosting to protect your long-term investment.',
    icon: 'Layers'
  },
  {
    id: 'business-value',
    title: 'Focus on Delivering Practical Business Value',
    description: 'Engineering driven by your bottom line: automating tedious manual chores, boosting customer conversion, and preventing operational revenue leaks.',
    icon: 'TrendingUp'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Grace Fresh Market has made it effortless for our customers to order fresh produce and grocery essentials online. Selva developed a reliable, fast Android app published on Google Play that handles our daily orders smoothly.',
    clientName: 'Antony Prinkle',
    clientRole: 'Business Owner',
    company: 'Grace Fresh Market, Thangachimadam',
    projectDelivered: 'Grocery Delivery Android App',
    rating: 5
  },
  {
    id: 't2',
    quote: 'The billing and inventory application developed by Selva significantly reduced our daily administrative workload. Invoices are generated instantly and stock levels stay accurately synced without manual discrepancies.',
    clientName: 'Lakshmanan',
    clientRole: 'Business Owner',
    company: 'KA Studio, Rameswaram',
    projectDelivered: 'Billing & Stock Management Software',
    rating: 5
  }
];

export const STATS = [
  { label: 'Core Engineering', value: 'Android & Web', description: 'Native mobile & full-stack web solutions' },
  { label: 'Business Automation', value: 'Billing & Stock', description: 'Invoicing & automated inventory workflows' },
  { label: 'Consultation', value: 'Direct & Prompt', description: 'Direct developer communication without middlemen' },
  { label: 'Production Quality', value: 'Client-Focused', description: 'Practical, reliable software that grows your business' }
];
