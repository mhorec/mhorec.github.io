// Portfolio project data.
// Migrated from the legacy index.html portfolio section (see scripts/build-projects.mjs
// and src/data/projects.generated.txt), then hand-edited for real summaries, corrected
// categories/links, and the LinkedIn-sourced additions (see
// docs/superpowers/specs/linkedin-projects-raw.md).
import type { ImageMetadata } from 'astro';

import img_aplikasi_koin from '../assets/portfolio/app1.jpg';
import img_redesign_koin_apps from '../assets/portfolio/design/mock-1.jpg';
import img_koin_mitra from '../assets/portfolio/design/mock-2.png';
import img_timmy_apps from '../assets/portfolio/design/mock-3.jpg';
import img_jalanamal_com from '../assets/portfolio/design/mock-4.jpg';
import img_ezicar from '../assets/portfolio/design/mock-5.png';
import img_chat_apps from '../assets/portfolio/design/mock-6.png';
import img_rumahcerdas from '../assets/portfolio/design/mock-7.png';
import img_mask_website from '../assets/portfolio/design/mock-8.png';
import img_bettafish_apps from '../assets/portfolio/design/mock-9.png';
import img_cake_macaron from '../assets/portfolio/design/mock-10.png';
import img_kirim_logistik from '../assets/portfolio/design/mock-11.jpg';
import img_petplants from '../assets/portfolio/design/mock-12.jpg';
import img_yayasan_bkd from '../assets/portfolio/design/mock-13.png';
import img_cloth_man from '../assets/portfolio/design/mock-14.png';
import img_edutown_privat from '../assets/portfolio/design/mock-15.jpg';
import img_my_book from '../assets/portfolio/design/mock-16.jpg';
import img_scootic from '../assets/portfolio/design/mock-17.jpg';
import img_zclub_apps_store from '../assets/portfolio/design/mock-18.png';
import img_booking_futsal_apps from '../assets/portfolio/design/mock-19.jpg';
import img_zaitun_oil from '../assets/portfolio/design/mock-19.png';
import img_siti_oetomo from '../assets/portfolio/design/mock-20.png';
import img_medapps from '../assets/portfolio/design/mock-21.png';
import img_company_profile from '../assets/portfolio/design/mock-22.png';
import img_e_learning from '../assets/portfolio/design/mock-23.png';
import img_p2p_lending from '../assets/portfolio/design/mock-24.png';
import img_panev from '../assets/portfolio/design/mock-25.png';
import img_e_archive_sda from '../assets/portfolio/archive.png';
import img_alisa_jlm from '../assets/portfolio/alisa.png';
import img_lms_sda from '../assets/portfolio/lms.png';
import img_loan_management_system from '../assets/portfolio/crm.png';
import img_birru_pelayanan from '../assets/portfolio/birru.png';
import img_keptiv from '../assets/portfolio/keptiv.png';
import img_marketplace from '../assets/portfolio/marketplace.png';
import img_direktorat_pai from '../assets/portfolio/pai.png';
import img_panitia_id from '../assets/portfolio/panitia.png';
import img_pdpontren from '../assets/portfolio/pdpontren.png';
import img_siaga_pendis from '../assets/portfolio/siaga.png';
import img_pratista from '../assets/portfolio/pratista.png';
import img_siva from '../assets/portfolio/siva.png';
import img_sma_al_azhary from '../assets/portfolio/sma.png';
import img_smp_al_azhary from '../assets/portfolio/smp.png';
import img_momentree from '../assets/portfolio/momentree.jpeg';
import img_gampong from '../assets/portfolio/gampong-blang.jpeg';
import img_intranet from '../assets/portfolio/intranet-jlm.jpeg';

export type Category = 'government' | 'education' | 'business' | 'ecommerce' | 'app' | 'design';

export type Project = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  summary_id?: string;
  /** Optional: 7 LinkedIn-sourced projects have no screenshot in the repo yet.
   *  Cards without one render a branded placeholder tile instead. */
  image?: ImageMetadata;
  alt: string; // required, non-empty, placeholder or not
  /** Present => card links to the live product. Absent => card opens the lightbox. */
  url?: string;
  /** e.g. "Bonsey Jaden" — rendered as "via Bonsey Jaden" under the title. */
  credit?: string;
  stack?: string[];
  year?: number;
  featured?: boolean;
};

export const projects: Project[] = [
  // --- Migrated from the legacy site (44) ---
  {
    slug: 'aplikasi-koin',
    title: 'Aplikasi KOIN',
    category: 'app',
    summary: 'Mobile app letting store owners order products from KO-IN (Toko Indonesia) directly through the app.',
    summary_id: 'Aplikasi mobile bagi pemilik toko untuk memesan produk dari KO-IN (Toko Indonesia) langsung lewat aplikasi.',
    image: img_aplikasi_koin,
    alt: 'Aplikasi KOIN mobile ordering app screenshot',
  },
  {
    slug: 'redesign-koin-apps',
    title: 'Redesign KOIN Apps',
    category: 'design',
    summary: 'UI redesign concept for the KOIN mobile app.',
    summary_id: 'Konsep desain ulang antarmuka untuk aplikasi mobile KOIN.',
    image: img_redesign_koin_apps,
    alt: 'Redesign KOIN Apps UI mockup',
  },
  {
    slug: 'koin-mitra',
    title: 'KOIN Mitra',
    category: 'design',
    summary: 'UI design for a partner-facing companion app to KOIN.',
    summary_id: 'Desain antarmuka untuk aplikasi pendamping KOIN bagi mitra.',
    image: img_koin_mitra,
    alt: 'KOIN Mitra partner app UI mockup',
  },
  {
    slug: 'timmy-apps',
    title: 'Timmy Apps',
    category: 'design',
    summary: 'UI design concept for a mobile app named Timmy.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi mobile bernama Timmy.',
    image: img_timmy_apps,
    alt: 'Timmy Apps UI mockup',
  },
  {
    slug: 'jalanamal-com',
    title: 'jalanamal.com',
    category: 'design',
    summary: 'Website UI design for a charitable-giving platform.',
    summary_id: 'Desain antarmuka situs untuk platform donasi amal.',
    image: img_jalanamal_com,
    alt: 'jalanamal.com website UI mockup',
  },
  {
    slug: 'ezicar',
    title: 'EziCar',
    category: 'design',
    summary: 'UI design concept for a car rental / marketplace app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi sewa/marketplace mobil.',
    image: img_ezicar,
    alt: 'EziCar app UI mockup',
  },
  {
    slug: 'chat-apps',
    title: 'Chat Apps',
    category: 'design',
    summary: 'UI design concept for a messaging app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi percakapan.',
    image: img_chat_apps,
    alt: 'Chat Apps messaging UI mockup',
  },
  {
    slug: 'rumahcerdas',
    title: 'RumahCerdas',
    category: 'design',
    summary: 'UI design concept for a smart-home control app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi kendali rumah pintar.',
    image: img_rumahcerdas,
    alt: 'RumahCerdas smart home app UI mockup',
  },
  {
    slug: 'mask-website',
    title: 'Mask Website',
    category: 'design',
    summary: 'Website UI design concept for a face-mask product line.',
    summary_id: 'Konsep desain situs untuk lini produk masker wajah.',
    image: img_mask_website,
    alt: 'Mask Website product site UI mockup',
  },
  {
    slug: 'bettafish-apps',
    title: 'BettaFish Apps',
    category: 'design',
    summary: 'UI design concept for a betta-fish hobbyist app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi komunitas pehobi ikan cupang.',
    image: img_bettafish_apps,
    alt: 'BettaFish Apps UI mockup',
  },
  {
    slug: 'cake-macaron',
    title: 'Cake Macaron',
    category: 'design',
    summary: 'Website UI design concept for a bakery selling macarons and cakes.',
    summary_id: 'Konsep desain situs untuk toko kue yang menjual macaron dan kue lainnya.',
    image: img_cake_macaron,
    alt: 'Cake Macaron bakery website UI mockup',
  },
  {
    slug: 'kirim-logistik',
    title: 'KIRIM Logistik',
    category: 'design',
    summary: 'UI design concept for a logistics and shipment-tracking app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi logistik dan pelacakan kiriman.',
    image: img_kirim_logistik,
    alt: 'KIRIM Logistik app UI mockup',
  },
  {
    slug: 'petplants',
    title: 'PetPlants',
    category: 'design',
    summary: 'UI design concept for a pet-and-plant care app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi perawatan hewan dan tanaman peliharaan.',
    image: img_petplants,
    alt: 'PetPlants app UI mockup',
  },
  {
    slug: 'yayasan-bkd',
    title: 'Yayasan BKD',
    category: 'design',
    summary: 'Website UI design concept for a foundation (yayasan) profile site.',
    summary_id: 'Konsep desain situs profil untuk sebuah yayasan (BKD).',
    image: img_yayasan_bkd,
    alt: 'Yayasan BKD website UI mockup',
  },
  {
    slug: 'cloth-man',
    title: 'Cloth Man',
    category: 'design',
    summary: "Website UI design concept for a men's clothing store.",
    summary_id: 'Konsep desain situs untuk toko pakaian pria.',
    image: img_cloth_man,
    alt: 'Cloth Man clothing store UI mockup',
  },
  {
    slug: 'edutown-privat',
    title: 'Edutown Privat',
    category: 'design',
    summary: 'Website UI design concept for a private tutoring service.',
    summary_id: 'Konsep desain situs untuk layanan bimbingan belajar privat.',
    image: img_edutown_privat,
    alt: 'Edutown Privat tutoring website UI mockup',
  },
  {
    slug: 'my-book',
    title: 'My Book',
    category: 'design',
    summary: 'UI design concept for a book-reading or library app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi baca buku atau perpustakaan.',
    image: img_my_book,
    alt: 'My Book reading app UI mockup',
  },
  {
    slug: 'scootic',
    title: 'Scootic',
    category: 'design',
    summary: 'UI design concept for a scooter rental app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi sewa skuter.',
    image: img_scootic,
    alt: 'Scootic scooter rental app UI mockup',
  },
  {
    slug: 'zclub-apps-store',
    title: 'ZClub Apps Store',
    category: 'design',
    summary: 'UI design concept for an app-store style storefront.',
    summary_id: 'Konsep desain antarmuka untuk etalase bergaya toko aplikasi.',
    image: img_zclub_apps_store,
    alt: 'ZClub Apps Store UI mockup',
  },
  {
    slug: 'booking-futsal-apps',
    title: 'Booking Futsal Apps',
    category: 'design',
    summary: 'UI design concept for a futsal-court booking app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi pemesanan lapangan futsal.',
    image: img_booking_futsal_apps,
    alt: 'Booking Futsal Apps UI mockup',
  },
  {
    slug: 'zaitun-oil',
    title: 'Zaitun Oil',
    category: 'design',
    summary: 'Website UI design concept for an olive-oil product brand.',
    summary_id: 'Konsep desain situs untuk merek produk minyak zaitun.',
    image: img_zaitun_oil,
    alt: 'Zaitun Oil product website UI mockup',
  },
  {
    slug: 'siti-oetomo',
    title: 'Siti Oetomo',
    category: 'design',
    summary: 'Website UI design concept for a personal or brand profile site.',
    summary_id: 'Konsep desain situs profil pribadi atau merek Siti Oetomo.',
    image: img_siti_oetomo,
    alt: 'Siti Oetomo website UI mockup',
  },
  {
    slug: 'medapps',
    title: 'MedApps',
    category: 'design',
    summary: 'UI design concept for a healthcare/medical consultation app.',
    summary_id: 'Konsep desain antarmuka untuk aplikasi konsultasi kesehatan/medis.',
    image: img_medapps,
    alt: 'MedApps healthcare app UI mockup',
  },
  {
    slug: 'company-profile',
    title: 'Company Profile',
    category: 'design',
    summary: 'Website UI design concept for a generic corporate profile site.',
    summary_id: 'Konsep desain situs profil perusahaan generik.',
    image: img_company_profile,
    alt: 'Company Profile website UI mockup',
  },
  {
    slug: 'e-learning',
    title: 'E-Learning',
    category: 'design',
    summary: 'Website UI design concept for an online learning platform.',
    summary_id: 'Konsep desain situs untuk platform pembelajaran daring.',
    image: img_e_learning,
    alt: 'E-Learning platform UI mockup',
  },
  {
    slug: 'p2p-lending',
    title: 'P2P Lending',
    category: 'design',
    summary: 'UI design concept for a peer-to-peer lending platform.',
    summary_id: 'Konsep desain antarmuka untuk platform pinjaman peer-to-peer.',
    image: img_p2p_lending,
    alt: 'P2P Lending platform UI mockup',
  },
  {
    slug: 'panev',
    title: 'Panev',
    category: 'design',
    summary: 'Website UI design concept for a brand named Panev.',
    summary_id: 'Konsep desain situs untuk merek bernama Panev.',
    image: img_panev,
    alt: 'Panev website UI mockup',
  },
  {
    slug: 'e-archive-sda',
    title: 'E-Archive SDA',
    category: 'government',
    summary: 'Digital archive system for the Directorate General of Water Resources (PUPR/SDA).',
    summary_id: 'Sistem arsip digital untuk Direktorat Jenderal Sumber Daya Air (PUPR/SDA).',
    image: img_e_archive_sda,
    alt: 'E-Archive SDA document archive dashboard',
    // No url: legacy link was a placeholder ("#"), never public.
  },
  {
    slug: 'alisa-jlm',
    title: 'ALISA JLM',
    category: 'business',
    summary: 'Internal application system built for PT. Jala Lintas Media.',
    summary_id: 'Sistem aplikasi internal yang dibangun untuk PT. Jala Lintas Media.',
    image: img_alisa_jlm,
    alt: 'ALISA JLM application dashboard',
    // No url: https://202.145.11.69:8006/ refuses TCP connections (verified at the
    // TCP level, not DNS) and is a bare IP:port — the same internal/staging shape
    // banned for intranet.jlm.net.id. Do not restore without re-verifying it's live.
  },
  {
    slug: 'lms-sda',
    title: 'LMS SDA',
    category: 'government',
    summary: 'Learning/loan-monitoring dashboard built for the Directorate General of Water Resources (PUPR/SDA).',
    summary_id: 'Dasbor pemantauan untuk Direktorat Jenderal Sumber Daya Air (PUPR/SDA).',
    image: img_lms_sda,
    alt: 'LMS SDA dashboard for PUPR water resources directorate',
    // No url: legacy link was a placeholder ("#"), never public.
  },
  {
    slug: 'loan-management-system',
    title: 'Loan Management System',
    category: 'government',
    summary:
      'Integrated database for the Directorate General of Water Resources (PUPR) to monitor, evaluate and manage project loans under the SISDA platform.',
    summary_id:
      'Basis data terpadu Direktorat Jenderal Sumber Daya Air (PUPR) untuk memantau, mengevaluasi dan mengelola pinjaman proyek pada platform SISDA.',
    image: img_loan_management_system,
    alt: 'Loan Management System dashboard for PUPR SISDA',
    url: 'https://lms.sisda.net/',
    // Legacy site mislabeled this "CRM Natieva" — the owner confirmed lms.sisda.net
    // is the Loan Management System, not the (separate, non-public) Bank Jatim CRM.
    credit: 'PT. Natieva Global',
    stack: ['CodeIgniter', 'LAMP'],
    year: 2021,
  },
  {
    slug: 'birru-pelayanan',
    title: 'Birru Pelayanan',
    category: 'business',
    summary: 'Public service portal for Birru Pelayanan.',
    summary_id: 'Portal layanan publik untuk Birru Pelayanan.',
    image: img_birru_pelayanan,
    alt: 'Birru Pelayanan service portal homepage',
    url: 'https://pelayanan.birru.id/',
  },
  {
    slug: 'keptiv',
    title: 'Keptiv',
    category: 'business',
    summary: 'Corporate website for Keptiv.',
    summary_id: 'Situs web korporat untuk Keptiv.',
    image: img_keptiv,
    alt: 'Keptiv corporate website homepage',
    url: 'https://keptiv.com/',
  },
  {
    slug: 'marketplace',
    title: 'Marketplace',
    category: 'ecommerce',
    summary: 'Marketplace help-center site for iCourse.',
    summary_id: 'Situs pusat bantuan marketplace untuk iCourse.',
    image: img_marketplace,
    alt: 'Marketplace help center homepage',
    url: 'https://marketplace.icourse.id/bantuan',
  },
  {
    slug: 'direktorat-pai',
    title: 'Direktorat PAI',
    category: 'government',
    summary: 'Portal for the Directorate of Islamic Religious Education, Ministry of Religious Affairs.',
    summary_id: 'Portal Direktorat Pendidikan Agama Islam, Kementerian Agama.',
    image: img_direktorat_pai,
    alt: 'Direktorat PAI Kemenag portal homepage',
    url: 'https://pai.kemenag.go.id/',
  },
  {
    slug: 'panitia-id',
    title: 'Panitia.id',
    category: 'business',
    summary: 'Event-committee management platform.',
    summary_id: 'Platform pengelolaan kepanitiaan acara.',
    image: img_panitia_id,
    alt: 'Panitia.id platform homepage',
    url: 'https://panitia.id/',
  },
  {
    slug: 'pd-pontren-kemenag',
    title: 'Direktorat PD Pontren',
    category: 'government',
    summary: 'Islamic boarding school directorate portal for the Ministry of Religious Affairs.',
    summary_id: 'Portal Direktorat Pendidikan Diniyah dan Pondok Pesantren, Kementerian Agama.',
    image: img_pdpontren,
    alt: 'Direktorat PD Pontren Kemenag portal homepage',
    url: 'https://ditpdpontren.kemenag.go.id/web/',
    featured: true,
  },
  {
    slug: 'siaga-pendis',
    title: 'SIAGA Pendis',
    category: 'government',
    summary: 'Islamic education monitoring platform for the Ministry of Religious Affairs.',
    summary_id: 'Platform pemantauan pendidikan Islam untuk Kementerian Agama (Pendis).',
    image: img_siaga_pendis,
    alt: 'SIAGA Pendis platform homepage',
    url: 'https://www.siagapendis.com/',
  },
  {
    slug: 'pratista-skincare',
    title: 'Pratista SkinCare',
    category: 'ecommerce',
    summary: 'Skincare brand website and online store.',
    summary_id: 'Situs web dan toko daring untuk merek perawatan kulit Pratista.',
    image: img_pratista,
    alt: 'Pratista SkinCare online store homepage',
    url: 'https://pratistaskincare.com/',
  },
  {
    slug: 'siva-kemenperin',
    title: 'SIVA Kemenperin',
    category: 'government',
    summary: 'Verification and reporting platform for the Ministry of Industry.',
    summary_id: 'Platform verifikasi dan pelaporan untuk Kementerian Perindustrian.',
    image: img_siva,
    alt: 'SIVA Kemenperin verification platform homepage',
    url: 'https://siva.kemenperin.go.id/',
    stack: ['PHP', 'Laravel'],
    year: 2021,
    featured: true,
  },
  {
    slug: 'sma-al-azhary',
    title: 'SMA Al-Azhary',
    category: 'education',
    summary: 'School website for SMA Al-Azhary.',
    summary_id: 'Situs sekolah untuk SMA Al-Azhary.',
    image: img_sma_al_azhary,
    alt: 'SMA Al-Azhary school website homepage',
    url: 'https://smaalazhary.sch.id/',
  },
  {
    slug: 'smp-al-azhary',
    title: 'SMP Al-Azhary',
    category: 'education',
    summary: 'School website for SMP Al-Azhary.',
    summary_id: 'Situs sekolah untuk SMP Al-Azhary.',
    image: img_smp_al_azhary,
    alt: 'SMP Al-Azhary school website homepage',
    url: 'https://smpalazhary.sch.id/',
  },

  // --- Added from LinkedIn (see linkedin-projects-raw.md) ---
  {
    slug: 'intranet-jlm',
    title: 'Intranet JLM',
    category: 'business',
    summary:
      'Single sign-on intranet integrating HRGA, service registration, helpdesk, reservation and support systems, with REST APIs for the mobile app.',
    summary_id:
      'Intranet single sign-on yang mengintegrasikan sistem HRGA, registrasi layanan, helpdesk, reservasi dan dukungan, dengan REST API untuk aplikasi mobile.',
    alt: 'PT. Jala Lintas Media intranet dashboard',
    image: img_intranet,
    // No url: the system is an internal client SSO. Lightbox only.
    credit: 'PT. Jala Lintas Media',
    stack: ['Laravel', 'Bootstrap', 'LEMP'],
    year: 2025,
    featured: true,
  },
  {
    slug: 'momentree',
    title: 'Momentree',
    category: 'business',
    summary:
      'Digital invitation platform for creating and managing online invitations, with customizable event details, RSVP management and guest tracking.',
    summary_id:
      'Platform undangan digital untuk membuat dan mengelola undangan daring, dengan detail acara yang dapat disesuaikan, manajemen RSVP dan pelacakan tamu.',
    alt: 'Momentree digital invitation platform',
    image: img_momentree,
    url: 'https://momentree.co.id/',
    stack: ['LEMP', 'Bootstrap'],
    year: 2023,
    featured: true,
  },
  {
    slug: 'gampong-blang-digital',
    title: 'Gampong Blang Digital',
    category: 'app',
    summary:
      'Village services and information app for Gampong Blang, Kecamatan Krueng Sabee, Kabupaten Aceh Jaya.',
    summary_id:
      'Aplikasi layanan dan informasi untuk warga Gampong Blang, Kecamatan Krueng Sabee, Kabupaten Aceh Jaya.',
    alt: 'Gampong Blang Digital village services app',
    image: img_gampong,
    url: 'https://gampongblangdigital.com/',
    featured: true,
  },
];

export const featured = projects.filter(p => p.featured);
