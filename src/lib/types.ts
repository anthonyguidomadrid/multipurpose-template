export type ThemeSettings = {
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
  description: string
  photo: Image
}

export type HomePage = {
  websiteName: string
  header: { fields: Header }
  about: { fields: About }
}
