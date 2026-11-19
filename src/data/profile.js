// Everything personal lives here, so you can edit the site without touching components.

export const profile = {
  name: 'Maulana Arya Wisanggeni',
  firstLine: 'Maulana Arya',
  lastLine: 'Wisanggeni',
  role: 'Junior Web Developer',
  brand: 'Wisanggeni Project',
  heroText:
    'Saya Junior Web Developer yang antusias membangun aplikasi web yang modern, responsif, dan mudah digunakan.',

  // Words the typing animation cycles through.
  typedRoles: [
    'Junior Web Developer',
    'Laravel dan PHP',
    'React dan Tailwind CSS',
    'WordPress dan Elementor',
  ],

  // Files in /public. Replace the placeholders with your own files, same names or update here.
  photo: 'images/profile.png', // Hero portrait. Swap for images/profile.webp once you have a portrait
  // Photo slot in the About section (portrait, 4:5, for example 800x1000). Drop your file in
  // public/images/ and change this path. It can be the same file as `photo` above.
  aboutPhoto: 'images/about-photo.png',
  cv: 'cv/cv-maulana-arya-wisanggeni.pdf',
  cvFileName: 'cv-maulana-arya-wisanggeni.pdf',

  // Fill this in to show an Education row in the About section. Leave null to hide it.
  // Example: 'SMK Negeri 2 Mojokerto, Software Engineering'
  education: null,

  // Shows a pulsing badge in the hero, for example 'Open to work'. Leave null to hide it.
  status: null,
}

export const contact = {
  email: 'wisanggeniproject2@gmail.com',
  whatsappDisplay: '08978577419',
  whatsappLink: 'https://wa.me/628978577419',
  github: 'https://github.com/wisanggeniproject2-ship-it/',
  githubLabel: 'github.com/wisanggeniproject2-ship-it',
  instagram: 'https://www.instagram.com/wisanghs/',
  instagramLabel: '@maulana_wisanggeni',
  // LinkedIn is intentionally empty. Add the URL and it appears in Hero, Contact and Footer.
  linkedin: '',
  linkedinLabel: '',
}

export const navLinks = [
  { id: 'home', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'projects', label: 'Proyek' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'contact', label: 'Kontak' },
]

export const aboutParagraphs = [
  'Saya Maulana Arya Wisanggeni, Junior Web Developer yang senang mengubah ide menjadi website dan aplikasi yang berfungsi. Saya menikmati seluruh alur sebuah proyek: merencanakan tampilan, membangun halaman, sampai menghubungkannya dengan database.',
  'Saat magang (PKL) di Yayasan Permata Mojokerto, saya membangun sistem informasi inventaris dengan Laravel dan MySQL, serta membuat website unit pendidikan dengan WordPress dan Elementor.',
  'Untuk frontend saya menulis kode dengan React dan Tailwind CSS, dan saya terus memperdalam backend dengan PHP dan Laravel. Saya masih belajar setiap hari, dan saya suka proyek yang membuat saya mempelajari hal baru.',
]

// Urutan di sini adalah urutan tampilnya. `certificateId` mengambil id dari daftar sertifikat di bawah
// dan menampilkan tombol Lihat Sertifikat. Isi `period` (misalnya 'Jan 2025 - Apr 2025') untuk menampilkan periode.
export const experience = [
  {
    id: 'pkl-permata',
    title: 'Magang (PKL)',
    organization: 'Yayasan Permata Mojokerto',
    period: null,
    points: [
      'Mengembangkan sistem informasi inventaris menggunakan Laravel.',
      'Membangun dan menyesuaikan website unit pendidikan menggunakan WordPress dan Elementor.',
      'Menerapkan tampilan antarmuka frontend.',
      'Bekerja dengan database MySQL.',
    ],
    tech: ['Laravel', 'MySQL', 'WordPress', 'Elementor'],
    projectIds: ['inventaris-yayasan-permata', 'website-unit-pendidikan'],
    certificateId: 'cert-pkl',
  },
  {
    id: 'pelatihan-minarsih',
    title: 'Pelatihan Minarsih',
    organization: 'Minarsih',
    period: null,
    // CONTOH ISI: ganti dengan materi dan kegiatan pelatihan yang sebenarnya.
    points: [
      'Mengikuti pelatihan di Minarsih dan menyelesaikannya dengan sertifikat.',
    ],
    tech: [], // isi dengan teknologi/materi pelatihan, misalnya ['Laravel', 'MySQL']
    projectIds: [],
    certificateId: 'cert-minarsih',
  },
]

// Sertifikat. `file` adalah PDF di /public/certificates. Tombol Lihat Sertifikat membukanya di tab baru.
// Entri "Nama Sertifikat 2" dan "3" masih PLACEHOLDER: ganti judul, penerbit, tanggal, dan PDF-nya.
// Biarkan `date` bernilai null untuk menyembunyikannya. Tambah atau hapus entri sesukamu, grid menyesuaikan sendiri.
export const certificates = [
  {
    id: 'cert-pkl',
    title: 'Sertifikat Magang (PKL)',
    issuer: 'Yayasan Permata Mojokerto',
    date: null,
    file: 'certificates/sertifikat-pkl.pdf',
  },
  {
    id: 'cert-minarsih',
    title: 'Sertifikat Pelatihan Minarsih',
    issuer: 'Minarsih',
    date: null,
    file: 'certificates/sertifikat-minarsih.pdf',
  }
]
