// Builds a URL for a file in /public that works at a domain root
// and when the site is hosted in a sub-folder (see `base` in vite.config.js).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
