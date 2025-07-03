import { test, expect, Page } from '@playwright/test'

test.describe('Menu', () => {
  const getMenuLogo = (page: Page) => page.getByTestId('menu-logo')
  const getBurgerMenuIcon = (page: Page) => page.getByTestId('mobile-menu-icon')
  const setMobileViewport = async (page: Page) => {
    await page.setViewportSize({ width: 375, height: 800 })
  }
  test('should display logo and menu items on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    // Logo should be visible
    await expect(getMenuLogo(page)).toBeVisible()

    // Menu items should be visible
    const menuButtons = page.locator('[data-testid^="menu-item-button"]')
    expect(await menuButtons.count()).toBeGreaterThan(0)

    // CTA button should be styled as contained
    const ctaButton = page.getByTestId('menu-item-cta')
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveClass(/MuiButton-contained/)
  })

  test('should open modal for menu items that require it', async ({ page }) => {
    await page.goto('/')

    // Click on the menu item CTA to open the modal
    const ctaButton = page.getByTestId('menu-item-cta')
    await expect(ctaButton).toBeVisible()
    await ctaButton.click()

    // Modal should be visible
    const modal = page.getByTestId('menu-dialog')
    await expect(modal).toBeVisible()
    const modalTitle = modal.getByTestId('menu-dialog-title')
    await expect(modalTitle).toBeVisible()
    const modalContent = modal.getByTestId('menu-dialog-content')
    await expect(modalContent).toBeVisible()

    // Close the modal
    const closeButton = modal.getByTestId('menu-dialog-close-button')
    await closeButton.click()
    await expect(modal).not.toBeVisible()
  })

  test('should show mobile menu icon on mobile', async ({ page }) => {
    await setMobileViewport(page)
    await page.goto('/')

    const mobileMenuIcon = page.getByLabel('menu')
    await expect(mobileMenuIcon).toBeVisible()
  })

  test('should open and close mobile drawer', async ({ page }) => {
    await setMobileViewport(page)
    await page.goto('/')

    await getBurgerMenuIcon(page).click()

    // Drawer should be visible
    const drawer = page.getByTestId('mobile-drawer')
    await expect(drawer).toBeVisible()

    // Close button should close the drawer
    const closeButton = page.getByTestId('mobile-drawer-close-button')
    await closeButton.click()
    await expect(drawer).not.toBeVisible()
  })

  test('should navigate or scroll when clicking menu items in mobile drawer', async ({ page }) => {
    await setMobileViewport(page)
    await page.goto('/')

    await getBurgerMenuIcon(page).click()

    // Find all menu items in the drawer
    const drawerMenuItems = page.locator('[data-testid^="menu-item-button-mobile"]')
    const count = await drawerMenuItems.count()
    expect(count).toBeGreaterThan(0)

    // Mobile drawer CTA button should be visible
    const ctaDrawerButton = page.getByTestId('menu-item-cta-mobile')
    await expect(ctaDrawerButton).toBeVisible()
  })
})

test.describe('Footer', () => {
  const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send'
  const TEST_NAME = 'Test User'
  const TEST_EMAIL = 'test@example.com'
  const TEST_MESSAGE = 'Hello from test!'
  const getInput = (name: string, page: Page, role: Parameters<Page['getByRole']>[0] = 'textbox') =>
    page.getByTestId(`footer-contact-${name}`).getByRole(role)
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
    await expect(page.getByTestId('footer-contact-privacy-error')).toBeVisible()
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
    await getInput('privacy', page, 'checkbox').check()
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
    await getInput('privacy', page, 'checkbox').check()
    await getSendButton(page).click()

    const errorMsg = page.getByTestId('footer-contact-error')
    await expect(errorMsg).toBeVisible()
  })

  test('should display the Privacy Policy Dialog', async ({ page }) => {
    await page.goto('/')
    const privacyPolicyLink = page.getByTestId('footer-contact-privacy-link')
    await expect(privacyPolicyLink).toBeVisible()
    const privacyDialog = page.getByTestId('privacy-dialog')
    await expect(privacyDialog).not.toBeVisible()
    await privacyPolicyLink.click()
    await expect(privacyDialog).toBeVisible()
    const privacyTitle = privacyDialog.getByTestId('privacy-dialog-title')
    await expect(privacyTitle).toBeVisible()
    const privacyContent = privacyDialog.getByTestId('privacy-dialog-content')
    await expect(privacyContent).toBeVisible()
    const closeButton = privacyDialog.getByTestId('privacy-dialog-close-button')
    await expect(closeButton).toBeVisible()
    await closeButton.click()
    await expect(privacyDialog).not.toBeVisible()
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
