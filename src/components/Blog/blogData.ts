export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  cover: string;
  sections: Array<{ heading: string; body: string; image?: string; linkText?: string; linkUrl?: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'digital-dentistry-for-modern-clinics',
    title: 'Digital Dentistry: A Practical Guide for Modern Clinics',
    excerpt: 'From e-prescriptions to AI scheduling—how digital tools streamline daily workflows and improve patient experience.',
    date: '2025-07-01',
    author: 'Oral Nexa Editorial',
    cover: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Why It Matters',
        body:
          'Digital dentistry reduces errors, speeds up care, and centralizes records. Practices adopting cloud tools report shorter appointment cycles and higher patient satisfaction.'
      },
      {
        heading: 'Core Pillars',
        body:
          'E-prescriptions, smart scheduling with reminders, integrated billing, and analytics form the foundation. Start small—digitize intake forms and appointment reminders first.',
        image: 'https://images.unsplash.com/photo-1581594693700-8120aa3b0f1b?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'Deeper Reading',
        body:
          'Explore clinical safety standards and workflow tips from trusted sources.',
        linkText: 'Read ADA guidelines',
        linkUrl: 'https://www.ada.org/resources'
      }
    ]
  },
  {
    slug: 'improve-patient-experience',
    title: '5 Ways to Improve Patient Experience This Quarter',
    excerpt: 'Small, consistent improvements—confirmation texts, digital intake, post-visit care—lead to loyal patients.',
    date: '2025-06-20',
    author: 'Team Oral Nexa',
    cover: 'https://images.pexels.com/photos/4269692/pexels-photo-4269692.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
    sections: [
      {
        heading: 'Automate the First Touch',
        body:
          'Use automated SMS/email confirmations and a branded digital intake. Patients appreciate frictionless onboarding.'
      },
      {
        heading: 'Follow-Up Matters',
        body:
          'Send personalized post-visit instructions and recall reminders. Pair with satisfaction surveys to close the loop.',
        image: 'https://images.unsplash.com/photo-1580281657527-47a8c6b4a1df?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'Sample Templates',
        body:
          'We compiled message templates you can adapt today—reduce no-shows by up to 25%.',
        linkText: 'Get sample templates',
        linkUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4779403/'
      }
    ]
  },
  {
    slug: 'hipaa-and-security-checklist',
    title: 'HIPAA & Security Checklist for Dental Practices',
    excerpt: 'A concise checklist to keep PHI safe—access controls, audit trails, encryption, and vendor diligence.',
    date: '2025-06-05',
    author: 'Compliance Desk',
    cover: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Access Controls',
        body:
          'Use role-based access and mandatory 2FA. Revoke credentials immediately when staff roles change.'
      },
      {
        heading: 'Audit & Encryption',
        body:
          'Retain audit logs and encrypt data at rest and in transit. Verify your vendors offer BAAs.',
        image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'Official Resources',
        body:
          'Bookmark the US HHS HIPAA resources for updates and training modules.',
        linkText: 'Visit HHS HIPAA',
        linkUrl: 'https://www.hhs.gov/hipaa/index.html'
      }
    ]
  },
  {
    slug: 'billing-and-insurance-best-practices',
    title: 'Billing & Insurance: Best Practices That Save Hours',
    excerpt: 'Pre-authorizations, transparent estimates, and automated statements reduce AR days and improve cash flow.',
    date: '2025-05-28',
    author: 'Finance at Oral Nexa',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Pre-Check Everything',
        body:
          'Eligibility checks before the visit prevent surprises. Offer digital estimates with clear breakdowns.'
      },
      {
        heading: 'Automate Statements',
        body:
          'Batch statements weekly and enable online payments to shorten collection cycles.',
        image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'More on AR',
        body:
          'Practical approaches to reducing A/R days without hurting experience.',
        linkText: 'A/R reduction strategies',
        linkUrl: 'https://www.ada.org/resources/practice/financial-management'
      }
    ]
  },
  {
    slug: 'inventory-and-sterilization-workflows',
    title: 'Inventory & Sterilization Workflows You Can Trust',
    excerpt: 'Color-coded bins, barcode tracking, and checklists minimize risk and waste in busy practices.',
    date: '2025-05-10',
    author: 'Operations Team',
    cover: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Standardize the Flow',
        body:
          'Establish intake → clean → package → sterilize → store steps with visual cues. Schedule weekly audits.'
      },
      {
        heading: 'Traceability',
        body:
          'Use barcodes and lot tracking for critical items and document cycles.',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'CDC Resources',
        body: 'Review evidence-based infection control guidance.',
        linkText: 'CDC Infection Control',
        linkUrl: 'https://www.cdc.gov/oralhealth/infectioncontrol/index.html'
      }
    ]
  },
  {
    slug: 'ai-in-dental-practice',
    title: 'Using AI in Dental Practice—What Works Today',
    excerpt: 'From scheduling to treatment planning support, AI boosts productivity when used responsibly.',
    date: '2025-04-30',
    author: 'Research Desk',
    cover: 'https://images.unsplash.com/photo-1556157381-36a0f6738c9a?q=80&w=1600&auto=format&fit=crop',
    sections: [
      {
        heading: 'Scheduling Intelligence',
        body:
          'Predictive reminders and slot suggestions can cut no-shows. Always allow human overrides.'
      },
      {
        heading: 'Clinical Support',
        body:
          'AI can surface similar cases and checklist prompts. Keep clinicians in the loop and log decisions.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop'
      },
      {
        heading: 'Responsible Use',
        body: 'Follow published guidance on data privacy and bias testing.',
        linkText: 'WHO on AI in health',
        linkUrl: 'https://www.who.int/publications/i/item/9789240029200'
      }
    ]
  }
];


