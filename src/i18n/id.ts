export const id = {
  meta: {
    title: 'MHCreation — Pengembangan Software & Konsultan IT, Indonesia',
    description:
      'Pengembangan perangkat lunak dan konsultan IT di Indonesia. Kami membangun dan memelihara sistem untuk kementerian, sekolah dan bisnis — web, mobile, desktop.',
  },
  nav: { services: 'Layanan', work: 'Portofolio', about: 'Tentang', team: 'Tim', contact: 'Kontak' },
  hero: {
    eyebrow: 'Konsultan teknologi · Indonesia',
    title: 'Perangkat lunak untuk kementerian, sekolah dan bisnis.',
    lead:
      'Kami membangun dan memelihara sistem untuk tiga kementerian — Kemenperin, Kemenag dan PUPR — serta portal sekolah, situs perdagangan dan layanan desa.',
    ctaPrimary: 'Hubungi via WhatsApp',
    ctaSecondary: 'Lihat portofolio',
  },
  clients: { label: 'Dipercaya oleh' },
  services: {
    title: 'Layanan',
    lead: 'Enam layanan, dikerjakan dari hulu ke hilir.',
    items: {
      software: { t: 'Pengembangan perangkat lunak', d: 'Pengembangan, integrasi dan pemeliharaan aplikasi web, desktop dan mobile.' },
      server:   { t: 'Rekayasa server',    d: 'Pengembangan, integrasi dan pemeliharaan server.' },
      network:  { t: 'Rekayasa jaringan',  d: 'Pengembangan, integrasi dan pengelolaan jaringan.' },
      security: { t: 'Keamanan informasi', d: 'Peninjauan keamanan, penguatan sistem dan penanganan insiden.' },
      consult:  { t: 'Konsultan manajemen TI', d: 'Strategi teknologi, pemilihan vendor dan pengawasan implementasi.' },
      apps:     { t: 'Aplikasi desktop, mobile & web', d: 'Aplikasi native dan lintas platform yang dibangun untuk pengguna nyata.' },
    },
  },
  work: {
    title: 'Portofolio',
    lead: 'Platform pemerintahan, portal sekolah, perdagangan dan desain produk.',
    filters: { all: 'Semua', government: 'Pemerintahan', education: 'Pendidikan', business: 'Bisnis', ecommerce: 'E-commerce', app: 'Aplikasi', design: 'Desain UI' },
    viewSite: 'Kunjungi situs',
    viewDesign: 'Lihat desain',
    creditPrefix: 'melalui',
    opensNewTab: 'terbuka di tab baru',
    resultCount: 'proyek ditampilkan',
  },
  team: {
    title: 'Tim', lead: 'Dua programmer dan satu desainer.',
    roles: { programmer: 'Programmer', designer: 'Desainer UI/UX' },
  },
  faq: {
    title: 'Pertanyaan yang sering diajukan',
    items: {
      stack: {
        q: 'Teknologi apa saja yang kalian gunakan?',
        a: 'PHP (Laravel, Lumen, CodeIgniter), Java (Spring), Python (Django), JavaScript (React, Vue, Angular), Flutter dan React Native untuk mobile, WordPress dan WooCommerce, Craft CMS, Umbraco dan Sitefinity. Untuk infrastruktur: stack LAMP dan LEMP, nginx, Apache, MySQL, PostgreSQL, MongoDB dan Redis, dengan REST API, WebSocket dan arsitektur microservice.',
      },
      timeline: {
        q: 'Berapa lama waktu pengerjaan sebuah proyek?',
        a: 'Situs company profile umumnya memakan waktu dua hingga empat minggu. Platform khusus dengan akun pengguna, pelaporan dan integrasi biasanya berlangsung dua hingga empat bulan. Kami memberikan estimasi pasti setelah proses scoping, bukan sebelumnya.',
      },
      maintenance: {
        q: 'Apakah kalian memelihara sistem yang dibangun?',
        a: 'Ya. Sebagian besar pekerjaan kami berada di bawah pemeliharaan berkelanjutan, termasuk sistem yang berjalan untuk direktorat pemerintah sejak 2020. Kami juga mengambil alih dan memelihara sistem yang dibangun tim lain.',
      },
      government: {
        q: 'Apakah kalian pernah bekerja sama dengan instansi pemerintah?',
        a: 'Ya. Kami telah menyelesaikan platform untuk Kementerian Perindustrian (SIVA Kemenperin), dua direktorat di Kementerian Agama (PD Pontren dan PAI), Kementerian PUPR, dan pemerintahan desa di Aceh Jaya.',
      },
      pricing: {
        q: 'Bagaimana skema harga kalian?',
        a: 'Harga tetap untuk lingkup kerja yang jelas, atau retainer bulanan untuk pengembangan dan pemeliharaan berkelanjutan. Kami memberikan penawaran setelah sesi scoping agar angkanya mencerminkan pekerjaan sesungguhnya.',
      },
      remote: {
        q: 'Apakah kalian melayani klien di luar Indonesia?',
        a: 'Ya. Tim kami terbiasa bekerja jarak jauh dengan klien di Singapura, Malaysia dan negara lain, lintas zona waktu.',
      },
    },
  },
  contact: {
    title: 'Hubungi kami',
    lead: 'Ada pertanyaan, butuh penawaran, atau ingin berdiskusi — WhatsApp paling cepat.',
    whatsapp: 'Chat via WhatsApp',
    email: 'Kirim email',
  },
  footer: { rights: 'Seluruh hak cipta dilindungi.', built: 'Dibangun dengan Astro dan Tailwind.' },
  lang: { switchTo: 'English', label: 'Bahasa' },
  a11y: { skip: 'Lompat ke konten', closeDialog: 'Tutup', openMenu: 'Buka menu' },
} as const;
