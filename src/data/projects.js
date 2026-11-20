// Add, remove or edit projects here. The moving strips, the cards under the photo, the pagination and the
// detail modal all read from this file. Three projects show per page (PAGE_SIZE in components/Projects.jsx).
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
  // The four entries below were written from the project names only. Check every line (summary, description,
  // highlights, tech, category) and replace it with what you really built.
  {
    id: 'festika-t-rise',
    title: 'Festika T-RISE',
    category: 'Website',
    summary: 'A website for the Festika T-RISE event that shares event information with visitors.',
    description:
      'A website made for the Festika T-RISE event. It presents the information visitors need about the event in one place.',
    highlights: ['Event information for visitors', 'Responsive layout for phones and desktops'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    thumbnail: 'images/projects/festika.svg',
    github: null,
    demo: null,
  },
  {
    id: 'si-laundry',
    title: 'Si-Laundry',
    category: 'Web App',
    summary: 'A web application that helps a laundry business manage its orders.',
    description:
      'A web application for running a laundry business. It keeps order data in one place so the owner can follow every order from intake to pickup.',
    highlights: ['Order management', 'Order status tracking'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    thumbnail: 'images/projects/si-laundry.svg',
    github: null,
    demo: null,
  },
  {
    id: 'siminlab',
    title: 'Siminlab',
    category: 'Web App',
    summary: 'An information system web app for managing laboratory data.',
    description:
      'A web-based information system for managing laboratory data, so records live in one place and are easy to find.',
    highlights: ['Laboratory data management', 'Reports'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    thumbnail: 'images/projects/siminlab.svg',
    github: null,
    demo: null,
  },
  {
    id: 'portofolio',
    title: 'Portfolio Website',
    category: 'Website',
    summary: 'This portfolio: a single-page site with animated sections, built with React and Tailwind CSS.',
    description:
      'My personal portfolio website. It is a single page with animated sections, a project showcase, certificates and a small API console that answers from the site data.',
    highlights: ['Animated sections and project showcase', 'Certificates with PDF links', 'Responsive and keyboard friendly'],
    tech: ['React', 'Tailwind CSS', 'Vite', 'Motion'],
    thumbnail: 'images/projects/portofolio.svg',
    github: null,
    demo: null,
  },
]
