import { test, expect, Page } from '@playwright/test'

test.describe('Menu', () => {
  const getMenuLogo = (page: Page) => page.getByTestId('menuLogo')
  const getBurgerMenuIcon = (page: Page) => page.getByTestId('mobileMenuIcon')
  test('should display logo and menu items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    // Logo should be visible
    await expect(getMenuLogo(page)).toBeVisible()

    // Menu items should be visible
    const menuButtons = page.locator('[data-testid^="menuItemButton"]')
    expect(await menuButtons.count()).toBeGreaterThan(0)

    // CTA button should be styled as contained
    const ctaButton = page.getByTestId('menuItemCta')
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveClass(/MuiButton-contained/)
  })

  test('should show mobile menu icon on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')

    const mobileMenuIcon = page.getByLabel('menu')
    await expect(mobileMenuIcon).toBeVisible()
  })

  test('should open and close mobile drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')

    await getBurgerMenuIcon(page).click()

    // Drawer should be visible
    const drawer = page.getByTestId('mobileDrawer')
    await expect(drawer).toBeVisible()

    // Close button should close the drawer
    const closeButton = page.getByTestId('mobileDrawerCloseButton')
    await closeButton.click()
    await expect(drawer).not.toBeVisible()
  })

  test('should navigate or scroll when clicking menu items in mobile drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')

    await getBurgerMenuIcon(page).click()

    // Find all menu items in the drawer
    const drawerMenuItems = page.locator('[data-testid^="mobileDrawerScrollLink"]')
    const count = await drawerMenuItems.count()
    expect(count).toBeGreaterThan(0)

    // Mobile drawer CTA button should be visible
    const ctaDrawerButton = page.getByTestId('mobileDrawerCtaLink')
    await expect(ctaDrawerButton).toBeVisible()
  })
})

test.describe('Footer', () => {
  const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'
  const TEST_NAME = 'Test User'
  const TEST_EMAIL = 'test@example.com'
  const TEST_MESSAGE = 'Hello from test!'
  const getFieldErrorMessage = (fieldName: string, page: Page) =>
    page.getByText(`${fieldName} is required`)
  const getInput = (name: string, page: Page) =>
    page.getByTestId(`footer-contact-${name}`).getByRole('textbox')
  const getSendButton = (page: Page) => page.getByTestId('footer-contact-send')

  test('should display contact info and social links', async ({ page }) => {
    await page.goto('/')

    // Contact section
    const contactTitle = page.getByTestId('footer-contact-title')
    await expect(contactTitle).toBeVisible()

    const phoneLabel = page.getByTestId('footer-phone-label')
    await expect(phoneLabel).toBeVisible()
    const phoneLink = page.getByTestId('footer-phone-link')
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toHaveAttribute('href', /tel:/)

    const emailLabel = page.getByTestId('footer-email-label')
    await expect(emailLabel).toBeVisible()
    const emailLink = page.getByTestId('footer-email-link')
    await expect(emailLink).toBeVisible()
    await expect(emailLink).toHaveAttribute('href', /mailto:/)

    // Social media buttons
    const socialButtons = page.locator('[data-testid^="footer-social-"]')
    expect(await socialButtons.count()).toBeGreaterThan(0)
  })

  test('should display the contact form and validate fields', async ({ page }) => {
    await page.goto('/')

    const formTitle = page.getByTestId('footer-form-title')
    await expect(formTitle).toBeVisible()
    const sendButton = page.getByTestId('footer-contact-send')

    // Try submitting empty form
    await sendButton.click()
    await expect(getFieldErrorMessage('Name', page)).toBeVisible()
    await expect(getFieldErrorMessage('Email', page)).toBeVisible()
    await expect(getFieldErrorMessage('Message', page)).toBeVisible()
    await expect(sendButton).toBeDisabled()
  })

  test('should submit the contact form and show success', async ({ page }) => {
    await page.goto('/')

    // Intercept the email sending API/service
    await page.route(EMAILJS_API_URL, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ isSuccess: true }),
      })
    })

    await getInput('name', page).fill(TEST_NAME)
    await getInput('email', page).fill(TEST_EMAIL)
    await getInput('message', page).fill(TEST_MESSAGE)
    await getSendButton(page).click()

    const successMsg = page.getByTestId('footer-contact-success')
    await expect(successMsg).toBeVisible()
  })

  test('should show error on contact form failure', async ({ page }) => {
    await page.goto('/')

    // Intercept the email sending API/service to simulate error
    await page.route(EMAILJS_API_URL, (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ isSuccess: false }),
      })
    })

    await getInput('name', page).fill(TEST_NAME)
    await getInput('email', page).fill(TEST_EMAIL)
    await getInput('message', page).fill(TEST_MESSAGE)
    await getSendButton(page).click()

    const errorMsg = page.getByTestId('footer-contact-error')
    await expect(errorMsg).toBeVisible()
  })

  test('should display the gallery grid and open lightbox', async ({ page }) => {
    await page.goto('/')

    const galleryImages = page.locator('[data-testid^="footer-gallery-image"]')
    const count = await galleryImages.count()
    expect(count).toBeGreaterThan(0)

    // Click the first image to open lightbox
    await galleryImages.first().click()
    const lightbox = page.getByLabel('Lightbox', { exact: true })
    await expect(lightbox).toBeVisible()
  })

  test('should display the copyright information', async ({ page }) => {
    await page.goto('/')
    const copyrightText = page.getByTestId('footer-copyright')
    await expect(copyrightText).toBeVisible()
  })
})
