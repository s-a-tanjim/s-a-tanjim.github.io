/** The single source of truth for who this portfolio belongs to. */
export interface Profile {
  name: string
  username: string
  role: string
  company: string
  city: string
  country: string
  /** ISO-ish short code used in the compact location string. */
  countryShort: string
  education: string
  /** Avatar source; @nuxt/image generates the responsive sizes. */
  avatar: { src: string }
  socials: { github: string; linkedin: string; blog: string }
  site: { url: string; thumbnail: string }
}

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
  },
  socials: {
    github: 'https://github.com/s-a-tanjim',
    linkedin: 'https://www.linkedin.com/in/satanjim',
    blog: 'https://medium.com/@satanjim',
  },
  site: {
    url: 'https://s-a-tanjim.netlify.app',
    thumbnail: 'https://s-a-tanjim.netlify.app/site-thumbnail.png',
  },
} as const satisfies Profile

export const fullLocation = `${profile.city}, ${profile.country}`
export const shortLocation = `${profile.city}, ${profile.countryShort}`
export const tagline = `${profile.name} | ${profile.role}`
