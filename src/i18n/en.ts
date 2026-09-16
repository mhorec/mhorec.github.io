export const en = {
  meta: {
    title: 'MHCreation — Software Development & IT Consultant, Depok',
    description:
      'We build software from scratch to finished product — web, mobile and desktop — for government, education and business across Indonesia.',
  },
  nav: { services: 'Services', work: 'Work', about: 'About', team: 'Team', contact: 'Contact' },
  hero: {
    eyebrow: 'Technology consultant · Depok, Indonesia',
    title: 'Software for ministries, schools and businesses.',
    lead:
      "We've built and maintained systems for three government ministries — Kemenperin, Kemenag and PUPR — alongside school portals, commerce sites and village services.",
    ctaPrimary: 'Message us on WhatsApp',
    ctaSecondary: 'See our work',
  },
  clients: { label: 'Trusted by' },
  services: {
    title: 'Services',
    lead: 'Six services, delivered end to end.',
    items: {
      software: { t: 'Software development', d: 'Development, integration and maintenance of web, desktop and mobile applications.' },
      server:   { t: 'Server engineering',    d: 'Server development, integration and ongoing maintenance.' },
      network:  { t: 'Network engineering',   d: 'Network development, integration and management.' },
      security: { t: 'Information security',  d: 'Security review, hardening and incident response.' },
      consult:  { t: 'IT management consulting', d: 'Technology strategy, vendor selection and delivery oversight.' },
      apps:     { t: 'Desktop, mobile & web apps', d: 'Native and cross-platform applications built for real users.' },
    },
  },
  work: {
    title: 'Work',
    lead: 'Government platforms, school portals, commerce and product design.',
    filters: { all: 'All', government: 'Government', education: 'Education', business: 'Business', ecommerce: 'E-commerce', app: 'Apps', design: 'UI Design' },
    viewSite: 'Visit site',
    viewDesign: 'View design',
    creditPrefix: 'via',
    opensNewTab: 'opens in a new tab',
    resultCount: 'projects shown',
  },
  team: {
    title: 'Team', lead: 'Two programmers and one designer.',
    roles: { programmer: 'Programmer', designer: 'UI/UX Designer' },
  },
  faq: {
    title: 'Frequently asked questions',
    items: {
      stack: {
        q: 'What technologies do you build with?',
        a: 'PHP (Laravel, Lumen, CodeIgniter), Java (Spring), Python (Django), JavaScript (React, Vue, Angular), Flutter and React Native for mobile, WordPress and WooCommerce, Craft CMS, Umbraco and Sitefinity. On infrastructure: LAMP and LEMP stacks, nginx, Apache, MySQL, PostgreSQL, MongoDB and Redis, with REST APIs, WebSockets and microservice architectures.',
      },
      timeline: {
        q: 'How long does a project take?',
        a: 'A company profile site typically takes two to four weeks. A custom platform with user accounts, reporting and integrations usually runs two to four months. We give a firm estimate after scoping, not before.',
      },
      maintenance: {
        q: 'Do you maintain the systems you build?',
        a: 'Yes. Most of our work is under ongoing maintenance, including systems running for government directorates since 2020. We also take over and maintain systems other teams built.',
      },
      government: {
        q: 'Have you worked with government agencies?',
        a: 'Yes. We have delivered platforms for the Ministry of Industry (SIVA Kemenperin), two directorates of the Ministry of Religious Affairs (PD Pontren and PAI), the Ministry of Public Works and Housing, and village administration in Aceh Jaya.',
      },
      pricing: {
        q: 'How do you price work?',
        a: 'Fixed price for a defined scope, or a monthly retainer for ongoing development and maintenance. We quote after a scoping conversation so the number reflects the actual work.',
      },
      remote: {
        q: 'Do you work with clients outside Indonesia?',
        a: 'Yes. Our team has worked remotely with clients in Singapore, Malaysia and beyond, across time zones.',
      },
    },
  },
  contact: {
    title: 'Message us',
    lead: 'Questions, a quote, or just want to talk through an idea — WhatsApp is fastest.',
    whatsapp: 'Chat on WhatsApp',
    email: 'Send an email',
  },
  footer: { rights: 'All rights reserved.', built: 'Built with Astro and Tailwind.' },
  lang: { switchTo: 'Bahasa Indonesia', label: 'Language' },
  a11y: { skip: 'Skip to content', closeDialog: 'Close', openMenu: 'Open menu' },
} as const;
