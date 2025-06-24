import { test, expect, Page } from '@playwright/test'

test.describe('Event Details Page', () => {
  const clickOnFirstEventBtn = async (page: Page) => {
    await page.goto('/')
    const firstCard = page.locator('[data-testid^="event-button"]').first()
    await firstCard.click()
  }
  test('should display the details header with breadcrumb and title', async ({ page }) => {
    await clickOnFirstEventBtn(page)

    // Check the header title
    const headerTitle = page.getByTestId('event-details-header-title')
    await expect(headerTitle).toBeVisible()

    // Check the breadcrumb
    const breadcrumbLabel = page.getByTestId('event-details-breadcrumb-label')
    await expect(breadcrumbLabel).toBeVisible()

    // Check the background image
    const backgroundImage = page.getByTestId('event-details-background-image')
    await expect(backgroundImage).toBeVisible()
  })

  test('should display the main content section', async ({ page }) => {
    await clickOnFirstEventBtn(page)
    // Check the section title and subtitle
    const sectionTitle = page.getByTestId('event-details-title')
    await expect(sectionTitle).toBeVisible()

    const sectionSubtitle = page.getByTestId('event-details-subtitle')
    await expect(sectionSubtitle).toBeVisible()

    // Check the description
    const sectionDescription = page.getByTestId('event-details-description')
    await expect(sectionDescription).toBeVisible()
  })

  test('should display the CTA with phone and email links', async ({ page }) => {
    await clickOnFirstEventBtn(page)
    const ctaTitle = page.getByTestId('event-details-cta-title')
    await expect(ctaTitle).toBeVisible()

    const ctaDescription = page.getByTestId('event-details-cta-description')
    await expect(ctaDescription).toBeVisible()

    const ctaPhoneLink = page.getByTestId('event-details-cta-phone-link')
    await expect(ctaPhoneLink).toBeVisible()

    const ctaEmailLink = page.getByTestId('event-details-cta-email-link')
    await expect(ctaEmailLink).toBeVisible()
  })

  test('should display the event details section with date, location, contact info and map', async ({
    page,
  }) => {
    await clickOnFirstEventBtn(page)
    // Check the secondary title
    const secondaryTitle = page.getByTestId('event-details-secondary-title')
    await expect(secondaryTitle).toBeVisible()
    // Check the start date
    const eventStartDate = page.getByTestId('event-start-date-label-with-icon')
    await expect(eventStartDate).toBeVisible()
    // Check the finishing date
    const eventFinishingDate = page.getByTestId('event-finishing-date-label-with-icon')
    await expect(eventFinishingDate).toBeVisible()
    // Check the place name
    const eventPlaceName = page.getByTestId('event-place-label-with-icon')
    await expect(eventPlaceName).toBeVisible()
    // Check the contact phone
    const eventContactPhone = page.getByTestId('event-contact-phone-label-with-icon')
    await expect(eventContactPhone).toBeVisible()
    // Check the contact email
    const eventContactEmail = page.getByTestId('event-contact-email-label-with-icon')
    await expect(eventContactEmail).toBeVisible()

    // Check the map
    const mapRegion = page.getByRole('region', { name: 'Map' })
    await expect(mapRegion).toBeVisible()
  })

  test('should display the other events section', async ({ page }) => {
    await clickOnFirstEventBtn(page)
    // Other services title and subtitle
    const otherServicesTitle = page.getByTestId('events-title')
    await expect(otherServicesTitle).toBeVisible()

    const otherServicesSubtitle = page.getByTestId('events-subtitle')
    await expect(otherServicesSubtitle).toBeVisible()

    // Service cards
    const serviceCards = page.locator('[data-testid^="event-card"]')
    expect(await serviceCards.count()).toBeGreaterThan(0)
  })
})
