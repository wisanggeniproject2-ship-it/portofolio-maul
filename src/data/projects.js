// Add, remove or edit projects here. Cards, filters and the detail modal all read from this file.
//
// github / demo: leave as null until you have a real URL. The buttons only appear when a URL is set.
// thumbnail: path inside /public. Use a 16:10 image (for example 1280x800 WebP screenshot).

export const projectCategories = ['Semua', 'Aplikasi Web', 'Website', 'Desain UI/UX']

export const projects = [
  {
    id: 'inventaris-yayasan-permata',
    title: 'Sistem Informasi Inventaris Yayasan Permata',
    category: 'Aplikasi Web',
    summary:
      'Aplikasi web untuk mengelola data barang inventaris, peminjaman, pengembalian, dan laporan inventaris.',
    description:
      'Sistem informasi berbasis web yang dibuat untuk membantu Yayasan Permata mengelola inventarisnya. Data barang tersimpan di satu tempat dan setiap peminjaman serta pengembalian tercatat, sehingga staf bisa melihat posisi barang dan membuat laporan inventaris kapan pun dibutuhkan.',
    highlights: [
      'Pengelolaan data barang inventaris',
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
      'Website informasi dan profil untuk sebuah unit pendidikan, dibuat untuk mempublikasikan informasi sekolah.',
    description:
      'Website yang memperkenalkan sebuah unit pendidikan dan mempublikasikan informasinya. Dibangun dengan WordPress dan Elementor agar isinya bisa diperbarui tanpa menulis kode.',
    highlights: [
      'Profil unit pendidikan',
      'Informasi dan publikasi sekolah',
      'Konten mudah diubah lewat WordPress',
    ],
    tech: ['WordPress', 'Elementor'],
    thumbnail: 'images/projects/mii.png',
    github: null,
    demo: null,
  }
]
