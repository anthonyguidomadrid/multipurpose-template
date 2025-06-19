import { Document } from '@contentful/rich-text-types'
import { SpotifyEpisode } from './spotify'

export type ThemeSettings = {
  websiteName: string
  locale: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  neutralColor?: string
  bodyColor?: string
  titleFont?: string
  bodyFont?: string
}

export type Image = {
  fields: {
    title: string
    description: string
    file: {
      url: string
      fileName: string
      contentType: string
      details: { size: number; image: { width: number; height: number } }
    }
  }
}

export type Header = {
  title: string
  subtitle: string
  ctaButtonText: string
  sliderImages: Image[]
}

export type About = {
  title: string
  subtitle: string
  description: Document
  photo: Image
}

export type ServiceFields = {
  mainTitle: string
  subtitle: string
  secondaryTitle: string
  description: Document
  carrouselImages: Image[]
  thumbnail: Image
  slug: string
}

export type Service = {
  fields: ServiceFields
}

export type Services = {
  title: string
  subtitle: string
  services: Service[]
}

export type Testimonial = {
  fields: {
    title: string
    description: string
    author: string
    date: Date
    image: Image
  }
}

export type Testimonials = {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export type Podcasts = {
  title: string
  subtitle: string
  episodes: SpotifyEpisode[]
}

export type EventFields = {
  title: string
  subtitle: string
  secondaryTitle: string
  startDate: string
  finishingDate: string
  description: Document
  location: {
    lon: number
    lat: number
  }
  contactEmail: string
  contactPhone: string
  thumbnail: Image
  slug: string
}

export type Event = {
  fields: EventFields
}

export type Events = {
  title: string
  subtitle: string
  events: Event[]
}

export type HomePage = {
  websiteName: string
  header: Header
  about: About
  services: Services
  testimonials: Testimonials
  podcasts: Podcasts
  events: Events
}

export type Contact = {
  email: string
  phone: string
  facebookUrl?: string
  instagramUrl?: string
  linkedInUrl?: string
  twitterUrl?: string
  galleryImages: Image[]
}

export type MenuItem = {
  fields: {
    isCta: boolean
    label: string
    link: string
    shouldOpenInANewTab: boolean
    shouldOpenInModal: boolean
  }
}

export type Menu = {
  logo: Image
  menuItems: MenuItem[]
}

export type Cta = {
  title: string
  description: string
  phone: string
  email: string
}
