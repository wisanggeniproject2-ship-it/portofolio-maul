// `icon` must match a key in ICONS inside components/Skills.jsx.
// `level` is 0 to 100 and drives the ring. It is a self-assessment, not a test score, so set it
// to how comfortable you honestly feel: under 65 shows "Learning", 65 to 79 "Comfortable", 80+ "Strong".
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'Tampilan yang benar-benar dipakai orang.',
    icon: 'Monitor',
    items: [
      { name: 'HTML', level: 85 },
      { name: 'CSS', level: 80 },
      { name: 'JavaScript', level: 70 },
      { name: 'React.js', level: 45 },
      { name: 'Tailwind CSS', level: 65 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    note: 'Logika di balik layar.',
    icon: 'Server',
    items: [
      { name: 'PHP', level: 65 },
      { name: 'Laravel', level: 65 },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    note: 'Tempat data disimpan.',
    icon: 'Database',
    items: [{ name: 'MySQL', level: 70 }],
  },
  {
    id: 'cms',
    title: 'CMS',
    note: 'Website yang bisa diedit klien sendiri.',
    icon: 'Layers',
    items: [
      { name: 'WordPress', level: 80 },
      { name: 'Elementor', level: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Alat',
    note: 'Alur kerja harian saya.',
    icon: 'Wrench',
    items: [
      { name: 'VS Code', level: 90 },
      { name: 'Git', level: 65 },
      { name: 'GitHub', level: 70 },
      { name: 'Figma', level: 70 },
      { name: 'Laragon', level: 75 },
    ],
  },
]
