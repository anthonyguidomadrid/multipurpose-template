import { test, expect } from '@playwright/test'

test.describe('Home Header', () => {
  test('should display the home header', async ({ page }) => {
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
  test('should display the about section', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Check the subtitle
    const aboutSubtitle = page.getByTestId('about-subtitle')
    await expect(aboutSubtitle).toHaveText('About')

    // Check the title
    const aboutTitle = page.getByTestId('about-title')
    await expect(aboutTitle).toHaveText('About Title')

    // Check the description
    const aboutDescription = page.getByTestId('about-description')
    await expect(aboutDescription).toContainText(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    )

    // Check the image
    const aboutImage = page.getByTestId('about-image')
    await expect(aboutImage).toBeVisible()
  })
})
