import { test, expect } from '@playwright/test'

test.describe('Podcasts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/podcasts')
  })

  test('should display the podcasts header with breadcrumb and title', async ({ page }) => {
    const headerTitle = page.getByTestId('podcasts-header-title')
    await expect(headerTitle).toBeVisible()

    const breadcrumbLabel = page.getByTestId('podcasts-breadcrumb-label')
    await expect(breadcrumbLabel).toBeVisible()

    const backgroundImage = page.getByTestId('podcasts-background-image')
    await expect(backgroundImage).toBeVisible()
  })

  test('should display the podcasts description', async ({ page }) => {
    const description = page.getByTestId('podcasts-description')
    await expect(description).toBeVisible()
  })

  test('should display the first 10 podcast episodes', async ({ page }) => {
    const episodes = page.locator('[data-testid^="podcast-episode"]')
    await expect(episodes.first()).toBeVisible()
    expect(await episodes.count()).toBeLessThanOrEqual(10)
  })

  test('should load more episodes when clicking "See more episodes"', async ({ page }) => {
    const episodes = page.locator('[data-testid^="podcast-episode"]')
    const initialCount = await episodes.count()

    const seeMoreBtn = page.getByTestId('see-more-episodes-button')
    if (await seeMoreBtn.isVisible()) {
      await seeMoreBtn.click()
      await expect(episodes).toHaveCount(initialCount + 10)
    }
  })
})
