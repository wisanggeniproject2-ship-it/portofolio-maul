// Tambah, hapus, atau edit proyek di sini. Strip bergerak, kartu di bawah foto,
// pagination, dan modal detail semuanya membaca dari file ini. Tiga proyek
// ditampilkan per halaman (PAGE_SIZE di components/Projects.jsx).
//
// github / demo: biarkan null sampai Anda punya URL asli. Tombol hanya muncul
// jika URL diisi.
// thumbnail: path di dalam /public. Gunakan gambar 16:10 (misalnya screenshot
// WebP 1280x800).

export const projectCategories = ['All', 'Web App', 'Website', 'UI/UX Design']

export const projects = [
  {
    id: 'inventaris-yayasan-permata',
    title: 'Sistem Informasi Inventaris Yayasan Permata',
    category: 'Web App',
    summary:
      'Aplikasi web yang membantu mengelola barang inventaris, peminjaman, pengembalian, dan laporan inventaris.',
    description:
      'Sistem informasi berbasis web yang dibangun untuk membantu Yayasan Permata mengelola inventarisnya. Data barang tersimpan di satu tempat dan setiap peminjaman serta pengembalian tercatat, sehingga staf dapat mengetahui keberadaan barang dan membuat laporan inventaris saat dibutuhkan.',
    highlights: [
      'Pengelolaan barang inventaris',
      'Peminjaman barang',
      'Pengembalian barang',
      'Laporan inventaris',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'HTML', 'CSS', 'JavaScript'],
    thumbnail: 'images/projects/inv.jpeg',
    github: null,
    demo: null,
  },
  {
    id: 'website-unit-pendidikan',
    title: 'Website Unit Pendidikan',
    category: 'Website',
    summary:
      'Website informasi dan profil unit pendidikan, dibuat untuk mempublikasikan informasi sekolah.',
    description:
      'Website yang memperkenalkan sebuah unit pendidikan dan mempublikasikan informasinya. Dibangun dengan WordPress dan Elementor sehingga konten dapat diperbarui tanpa menulis kode.',
    highlights: [
      'Profil unit pendidikan',
      'Informasi dan publikasi sekolah',
      'Konten dapat diedit melalui WordPress',
    ],
    tech: ['WordPress', 'Elementor'],
    thumbnail: 'images/projects/mii.png',
    github: null,
    demo: null,
  },
  {
    id: 'festika-t-rise',
    title: 'Festika T-RISE',
    category: 'Website',
    summary: 'Website edukasi yang membahas cara lancar berbicara di depan publik (public speaking).',
    description:
      'Website edukasi yang dibuat untuk Festika T-RISE. Isinya materi dan informasi seputar cara lancar public speaking, disajikan dalam satu tempat agar mudah diakses pengunjung.',
    highlights: ['Materi edukasi public speaking', 'Tampilan responsif untuk ponsel dan desktop'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    thumbnail: 'images/projects/trise.png',
    github: null,
    demo: null,
  },
  {
    id: 'si-laundry',
    title: 'Si-Laundry',
    category: 'Web App',
    summary: 'Aplikasi web yang membantu usaha laundry mengelola pesanan.',
    description:
      'Aplikasi web untuk menjalankan usaha laundry. Data pesanan tersimpan di satu tempat sehingga pemilik dapat memantau setiap pesanan dari penerimaan hingga pengambilan.',
    highlights: ['Pengelolaan pesanan', 'Pelacakan status pesanan'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    thumbnail: 'images/projects/laundry.png',
    github: null,
    demo: null,
  },
  {
    id: 'siminlab',
    title: 'Siminlab',
    category: 'Web App',
    summary: 'Aplikasi web sistem informasi untuk mengelola data laboratorium.',
    description:
      'Sistem informasi berbasis web untuk mengelola data laboratorium, sehingga catatan tersimpan di satu tempat dan mudah dicari.',
    highlights: ['Pengelolaan data laboratorium', 'Laporan'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    thumbnail: 'images/projects/siminlab.png',
    github: null,
    demo: null,
  },
  {
    id: 'portofolio',
    title: 'Website Portofolio',
    category: 'Website',
    summary: 'Portofolio ini: situs satu halaman dengan bagian beranimasi, dibangun dengan React dan Tailwind CSS.',
    description:
      'Website portofolio pribadi saya. Berupa satu halaman dengan bagian beranimasi, galeri proyek, sertifikat, dan konsol API kecil yang menjawab dari data situs.',
    highlights: ['Bagian beranimasi dan galeri proyek', 'Sertifikat dengan tautan PDF', 'Responsif dan ramah keyboard'],
    tech: ['React', 'Tailwind CSS', 'Vite', 'Motion'],
    thumbnail: 'images/projects/porto.png',
    github: null,
    demo: null,
  },
]