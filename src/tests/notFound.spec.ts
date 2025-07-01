import { test, expect, Page } from '@playwright/test'

test.describe('Not Found (404) Page', () => {
  const getGoHomeButton = (page: Page) => page.getByTestId('not-found-button')

  test.beforeEach(async ({ page }) => {
    await page.goto('/non-existent-page-404-test')
  })

  test('should display the image background', async ({ page }) => {
    const backgroundImage = page.getByTestId('not-found-image-background')
    await expect(backgroundImage).toBeVisible()
  })

  test('should display the 404 title', async ({ page }) => {
    const title = page.getByTestId('not-found-title')
    await expect(title).toBeVisible()
  })

  test('should display the not found subtitle', async ({ page }) => {
    const subtitle = page.getByTestId('not-found-subtitle')
    await expect(subtitle).toBeVisible()
  })

  test('should display the Go Home button', async ({ page }) => {
    const button = getGoHomeButton(page)
    await expect(button).toBeVisible()
  })

  test('should navigate to home when Go Home button is clicked', async ({ page }) => {
    const button = getGoHomeButton(page)
    await button.click()
    await expect(page).toHaveURL('/')
  })
})
