// Add, remove or edit projects here. Cards, filters and the detail modal all read from this file.
//
// github / demo: leave as null until you have a real URL. The buttons only appear when a URL is set.
// thumbnail: path inside /public. Use a 16:10 image (for example 1280x800 WebP screenshot).

export const projectCategories = ['All', 'Web App', 'Website', 'UI/UX Design']

export const projects = [
  {
    id: 'inventaris-yayasan-permata',
    title: 'Sistem Informasi Inventaris Yayasan Permata',
    category: 'Web App',
    summary:
      'A web application that helps manage inventory items, borrowing, returns, and inventory reports.',
    description:
      'A web-based information system built to help Yayasan Permata manage its inventory. It keeps item data in one place and records every borrowing and return, so staff can see where items are and produce inventory reports when they need them.',
    highlights: [
      'Inventory item management',
      'Item borrowing',
      'Item returns',
      'Inventory reports',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'HTML', 'CSS', 'JavaScript'],
    thumbnail: 'images/projects/inventaris.svg',
    github: null,
    demo: null,
  },
  {
    id: 'website-unit-pendidikan',
    title: 'Website Unit Pendidikan',
    category: 'Website',
    summary:
      'An information and profile website for an education unit, made for publishing school information.',
    description:
      'A website that introduces an education unit and publishes its information. It was built with WordPress and Elementor so the content can be updated without writing code.',
    highlights: [
      'Education unit profile',
      'School information and publication',
      'Editable content through WordPress',
    ],
    tech: ['WordPress', 'Elementor'],
    thumbnail: 'images/projects/sekolah.svg',
    github: null,
    demo: null,
  },
  {
    id: 'skaneda-maps',
    title: 'SKANEDA MAPS',
    category: 'UI/UX Design',
    summary:
      'A navigation and school map app concept that helps users find the location of facilities.',
    description:
      'A design concept for a navigation and map app of the school grounds. The goal is to make it easy for visitors and students to find where each facility is.',
    highlights: [
      'Map of the school environment',
      'Finding the location of facilities',
      'Interface designed in Figma',
    ],
    tech: ['Figma', 'UI/UX Design'],
    thumbnail: 'images/projects/skaneda.svg',
    github: null,
    demo: null,
  },
]
