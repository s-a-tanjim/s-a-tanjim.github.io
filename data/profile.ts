export const profile = {
  name: 'Shoeb Ahmed Tanjim',
  username: 's-a-tanjim',
  role: 'Software Architect',
  company: 'Fehrmann MaterialsX GmbH',
  city: 'Hamburg',
  country: 'Germany',
  countryShort: 'DE',
  education: 'BSc in Computer Science',
  avatar: {
    src: '/img/sat.jpg',
    srcset: '/img/sat-250.jpg 250w, /img/sat-300.jpg 300w, /img/sat.jpg 600w',
  },
  socials: {
    github: 'https://github.com/s-a-tanjim',
    linkedin: 'https://bd.linkedin.com/in/satanjim',
    blog: 'https://medium.com/@satanjim',
  },
  site: {
    url: 'https://s-a-tanjim.netlify.app',
    thumbnail: 'https://s-a-tanjim.netlify.app/site-thumbnail.jpg',
  },
} as const

export const fullLocation = `${profile.city}, ${profile.country}`
export const shortLocation = `${profile.city}, ${profile.countryShort}`
export const tagline = `${profile.name} | ${profile.role}`
