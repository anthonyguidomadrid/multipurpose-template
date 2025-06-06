export const handleScrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

export const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
