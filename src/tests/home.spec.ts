import { test, expect } from '@playwright/test'

test.describe('Home Header', () => {
  test('should display the correct title, subtitle, button, and slider images', async ({
    page,
  }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the title
    const title = page.getByTestId('home-title')
    await expect(title).toHaveText('Main Home Title')

    // Check the subtitle
    const subtitle = page.getByTestId('home-subtitle')
    await expect(subtitle).toHaveText('Main Home Subtitle')

    // Check the button
    const button = page.getByTestId('cta-button')
    await expect(button).toHaveText('See my services')

    // Check the slider images
    const sliderImages = page.locator('[data-testid^="slider-image"]')
    const altTexts = await sliderImages.evaluateAll((images) =>
      images.map((img) => img.getAttribute('alt'))
    )
    expect(altTexts).toEqual(['Woman photo', 'Woman Photographer', 'Photographer'])
  })
})
