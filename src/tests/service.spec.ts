import { test, expect, Page } from '@playwright/test'

test.describe('Service Details Page', () => {
  const clickOnFirstCard = async (page: Page) => {
    await page.goto('/')
    const firstCard = page.locator('[data-testid^="service-card"]').first()
    await firstCard.click()
  }
  test('should display the details header with breadcrumb and title', async ({ page }) => {
    await clickOnFirstCard(page)

    // Check the header title
    const headerTitle = page.getByTestId('service-details-header-title')
    await expect(headerTitle).toBeVisible()

    // Check the breadcrumb
    const breadcrumbLabel = page.getByTestId('service-details-breadcrumb-label')
    await expect(breadcrumbLabel).toBeVisible()

    // Check the background image
    const backgroundImage = page.getByTestId('service-details-background-image')
    await expect(backgroundImage).toBeVisible()
  })

  test('should display the main content section', async ({ page }) => {
    await clickOnFirstCard(page)
    // Check the section title and subtitle
    const sectionTitle = page.getByTestId('service-details-title')
    await expect(sectionTitle).toBeVisible()

    const sectionSubtitle = page.getByTestId('service-details-subtitle')
    await expect(sectionSubtitle).toBeVisible()

    // Check the description
    const sectionDescription = page.getByTestId('service-details-description')
    await expect(sectionDescription).toBeVisible()
  })

  test('should display the CTA with phone and email links', async ({ page }) => {
    await clickOnFirstCard(page)
    const ctaTitle = page.getByTestId('service-details-cta-title')
    await expect(ctaTitle).toBeVisible()

    const ctaDescription = page.getByTestId('service-details-cta-description')
    await expect(ctaDescription).toBeVisible()

    const ctaPhoneLink = page.getByTestId('service-details-cta-phone-link')
    await expect(ctaPhoneLink).toBeVisible()

    const ctaEmailLink = page.getByTestId('service-details-cta-email-link')
    await expect(ctaEmailLink).toBeVisible()
  })

  test('should display the image gallery and open lightbox', async ({ page }) => {
    await clickOnFirstCard(page)

    // Gallery images
    const galleryImages = page.locator('[data-testid^="slide-gallery-image-"]')
    await expect(galleryImages.first()).toBeVisible()
    const count = await galleryImages.count()
    expect(count).toBeGreaterThan(0)

    // Click first image to open lightbox
    await galleryImages.first().click()
    const lightbox = page.getByLabel('Lightbox', { exact: true })
    await expect(lightbox).toBeVisible()
  })

  test('should display the other services section', async ({ page }) => {
    await clickOnFirstCard(page)
    // Other services title and subtitle
    const otherServicesTitle = page.getByTestId('services-title')
    await expect(otherServicesTitle).toBeVisible()

    const otherServicesSubtitle = page.getByTestId('services-subtitle')
    await expect(otherServicesSubtitle).toBeVisible()

    // Service cards
    const serviceCards = page.locator('[data-testid^="service-card"]')
    expect(await serviceCards.count()).toBeGreaterThan(0)
  })

  test('should render SEO meta tags', async ({ page }) => {
    await clickOnFirstCard(page)

    // Check meta title and description
    const metaTitle = page.locator('meta[name="title"]')
    expect(metaTitle).toBeDefined()
    const description = page.locator('meta[name="description"]')
    expect(description).toBeDefined()

    // Check og:image
    const ogImage = page.locator('meta[property="og:image"]')
    expect(ogImage).toBeDefined()

    // Check twitter:image
    const twitterImage = page.locator('meta[name="twitter:image"]')
    expect(twitterImage).toBeDefined()
  })
})
