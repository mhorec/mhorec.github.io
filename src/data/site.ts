const WHATSAPP = '6285884571705';

export const site = {
  name: 'MHCreation',
  legalName: 'Media Hore Creation',
  origin: 'https://mhorec.github.io',
  email: 'mediahorecreation@gmail.com',
  phone: '+62 858 8457 1705',
  whatsapp: WHATSAPP,
  whatsappUrl:
    `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=` +
    encodeURIComponent('Hello, MHCreation!'),
  address: {
    street: 'Perumahan Rose Garden D11',
    city: 'Depok',
    region: 'West Java',
    postalCode: '16454',
    country: 'ID',
  },
  socials: [
    'https://www.linkedin.com/in/noor-alizah-afifah-r-826630148/',
    'https://github.com/kuroiyuki48',
  ],
} as const;
