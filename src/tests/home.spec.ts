import { test, expect } from '@playwright/test'

test.describe('Home Header', () => {
  test('should display the home header', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const title = page.getByTestId('home-title')
    await expect(title).toBeVisible()

    // Check the subtitle
    const subtitle = page.getByTestId('home-subtitle')
    await expect(subtitle).toBeVisible()

    // Check the button
    const button = page.getByTestId('cta-button')
    await expect(button).toBeVisible()

    // Check the slider images
    const sliderImages = page.locator('[data-testid^="slider-image"]')
    expect(await sliderImages.count()).toBe(3)
  })
  test('should display the about section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the subtitle
    const aboutSubtitle = page.getByTestId('about-subtitle')
    await expect(aboutSubtitle).toBeVisible()

    // Check the title
    const aboutTitle = page.getByTestId('about-title')
    await expect(aboutTitle).toBeVisible()

    // Check the description
    const aboutDescription = page.getByTestId('about-description')
    await expect(aboutDescription).toBeVisible()

    // Check the image
    const aboutImage = page.getByTestId('about-image')
    await expect(aboutImage).toBeVisible()
  })

  test('should display the services section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const servicesTitle = page.getByTestId('services-title')
    await expect(servicesTitle).toBeVisible()

    // Check the subtitle
    const servicesSubtitle = page.getByTestId('services-subtitle')
    await expect(servicesSubtitle).toBeVisible()

    // Check the service cards
    const serviceCards = page.locator('[data-testid^="service-card"]')
    const cardCount = await serviceCards.count()
    expect(cardCount).toBe(3)

    // Check the service card images, titles and subtitles
    for (let i = 0; i < cardCount; i++) {
      const card = serviceCards.nth(i)
      const cardTitle = card.getByTestId('service-title')
      const cardDescription = card.getByTestId('service-subtitle')
      const cardImage = card.getByTestId('service-image')
      await expect(cardImage).toBeVisible()
      await expect(cardTitle).toBeVisible()
      await expect(cardDescription).not.toBeVisible()
      await card.hover()
      await expect(cardDescription).toBeVisible()
    }

    const firstCard = page.locator('[data-testid^="service-card"]').first()

    await firstCard.click()

    await expect(page).toHaveURL(/\/services\/[a-zA-Z0-9-]+/)
  })

  test('should display the testimonials section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const testimonialsTitle = page.getByTestId('testimonials-title')
    await expect(testimonialsTitle).toBeVisible()

    // Check the subtitle
    const testimonialsSubtitle = page.getByTestId('testimonials-subtitle')
    await expect(testimonialsSubtitle).toBeVisible()

    // Check the testimonials
    const testimonials = page.locator('[data-testid^="testimonial-slide"]')
    const testimonialCount = await testimonials.count()
    expect(testimonialCount).toBe(3)

    // Check the testimonial images, titles and descriptions
    for (let i = 0; i < testimonialCount; i++) {
      const testimonial = testimonials.nth(i)
      const testimonialImage = testimonial.getByTestId('testimonial-image')
      const testimonialTitle = testimonial.getByTestId('testimonial-title')
      const testimonialDescription = testimonial.getByTestId('testimonial-quote')
      const testimonialAuthor = testimonial.getByTestId('testimonial-author')
      await expect(testimonialImage).toBeVisible()
      await expect(testimonialTitle).toBeVisible()
      await expect(testimonialDescription).toBeVisible()
      await expect(testimonialAuthor).toBeVisible()
    }
  })

  test('should display the podcasts section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const podcastsTitle = page.getByTestId('podcasts-title')
    await expect(podcastsTitle).toBeVisible()

    // Check the subtitle
    const podcastsSubtitle = page.getByTestId('podcasts-subtitle')
    await expect(podcastsSubtitle).toBeVisible()

    // Check the "See All Episodes" button
    const seeAllButton = page.getByTestId('see-all-podcasts')
    await expect(seeAllButton).toBeVisible()

    // Check the podcast episodes
    const podcastEpisodes = page.locator('[data-testid^="podcast-episode"]')
    const episodeCount = await podcastEpisodes.count()
    expect(episodeCount).toBeGreaterThan(0)

    // Check each podcast episode
    for (let i = 0; i < episodeCount; i++) {
      const episode = podcastEpisodes.nth(i)

      // Check the podcast image
      const podcastImage = episode.getByTestId('podcast-image')
      await expect(podcastImage).toBeVisible()

      // Check the podcast name
      const podcastName = episode.getByTestId('podcast-name')
      await expect(podcastName).toBeVisible()

      // Check the podcast date
      const podcastDate = episode.getByTestId('podcast-date')
      await expect(podcastDate).toBeVisible()

      // Check the podcast description
      const podcastDescription = episode.getByTestId('podcast-description')
      await expect(podcastDescription).toBeVisible()

      // Check the expand/collapse button
      const seeMoreButton = episode.getByTestId('podcast-see-more-button')
      await expect(seeMoreButton).toBeVisible()
      await expect(seeMoreButton).toHaveText('Ver más')
      await seeMoreButton.click()
      await expect(seeMoreButton).toHaveText('Ver menos')

      // Check the audio player
      const podcastPlayer = episode.getByTestId('podcast-player')
      await expect(podcastPlayer).toBeVisible()

      // Check the "See Full Episode" button
      const fullEpisodeButton = episode.getByTestId('podcast-link-button')
      await expect(fullEpisodeButton).toBeVisible()
    }
  })

  test('should display the events section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const eventsTitle = page.getByTestId('events-title')
    await expect(eventsTitle).toBeVisible()

    // Check the subtitle
    const eventsSubtitle = page.getByTestId('events-subtitle')
    await expect(eventsSubtitle).toBeVisible()

    // Check the event cards
    const eventCards = page.locator('[data-testid^="event-card"]')
    const eventCount = await eventCards.count()
    expect(eventCount).toBeGreaterThan(0)

    // Check each event card
    for (let i = 0; i < eventCount; i++) {
      const eventCard = eventCards.nth(i)

      // Check the event ribbon
      const eventRibbon = eventCard.getByTestId('event-ribbon')
      await expect(eventRibbon).toBeVisible()

      // Check the event image
      const eventImage = eventCard.getByTestId('event-image')
      await expect(eventImage).toBeVisible()

      // Check the event title
      const eventTitle = eventCard.getByTestId('event-title')
      await expect(eventTitle).toBeVisible()

      // Check the event subtitle
      const eventSubtitle = eventCard.getByTestId('event-subtitle')
      await expect(eventSubtitle).toBeVisible()

      // Check the "See More" button
      const seeMoreButton = eventCard.getByTestId('event-button')
      await expect(seeMoreButton).toBeVisible()
      await expect(seeMoreButton).toHaveText('See more')
    }
  })
})
