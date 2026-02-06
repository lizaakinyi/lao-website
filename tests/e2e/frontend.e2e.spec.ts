import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

test.describe('Homepage', () => {
  test('renders hero section with heading and CTAs', async ({ page }) => {
    await page.goto(BASE)

    await expect(page).toHaveTitle(/Liza Akinyi/)

    const hero = page.locator('section').first()
    await expect(hero.locator('h1')).toContainText('Build fundable')
    await expect(page.getByRole('link', { name: 'Book a Call' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Read Articles' })).toBeVisible()
  })

  test('renders article, tool, program, and event sections', async ({ page }) => {
    await page.goto(BASE)

    await expect(page.getByRole('heading', { name: 'Latest Articles' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Tools & Resources' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Programs' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Speaking & Events' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Stay in the loop' })).toBeVisible()
  })

  test('renders navbar with navigation links', async ({ page }) => {
    await page.goto(BASE)

    const nav = page.locator('header')
    await expect(nav.getByRole('link', { name: 'Liza Akinyi' })).toBeVisible()
  })

  test('renders footer', async ({ page }) => {
    await page.goto(BASE)

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Liza Akinyi' })).toBeVisible()
  })
})

test.describe('Articles', () => {
  test('renders articles listing page', async ({ page }) => {
    await page.goto(`${BASE}/articles`)

    await expect(page).toHaveTitle(/Articles/)
    await expect(page.getByRole('heading', { name: 'Articles', level: 1 })).toBeVisible()
  })

  test('renders article cards with links', async ({ page }) => {
    await page.goto(`${BASE}/articles`)

    const articleLinks = page.locator('a[href^="/articles/"]')
    await expect(articleLinks.first()).toBeVisible()
  })

  test('can navigate to article detail', async ({ page }) => {
    await page.goto(`${BASE}/articles`)

    const firstArticleLink = page.locator('a[href^="/articles/"]').first()
    await firstArticleLink.click()

    await expect(page.locator('article, main')).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: /articles/i })).toBeVisible()
  })
})

test.describe('Tools', () => {
  test('renders tools listing page', async ({ page }) => {
    await page.goto(`${BASE}/tools`)

    await expect(page).toHaveTitle(/Tools/)
    await expect(page.getByRole('heading', { name: 'Tools', level: 1 })).toBeVisible()
  })

  test('renders tool cards', async ({ page }) => {
    await page.goto(`${BASE}/tools`)

    const toolLinks = page.locator('a[href^="/tools/"]')
    await expect(toolLinks.first()).toBeVisible()
  })
})

test.describe('Programs', () => {
  test('renders programs listing page', async ({ page }) => {
    await page.goto(`${BASE}/programs`)

    await expect(page).toHaveTitle(/Programs/)
    await expect(page.getByRole('heading', { name: 'Programs', level: 1 })).toBeVisible()
  })

  test('renders program cards', async ({ page }) => {
    await page.goto(`${BASE}/programs`)

    const programLinks = page.locator('a[href^="/programs/"]')
    await expect(programLinks.first()).toBeVisible()
  })
})

test.describe('Speaking', () => {
  test('renders speaking page', async ({ page }) => {
    await page.goto(`${BASE}/speaking`)

    await expect(page).toHaveTitle(/Speaking/)
    await expect(page.getByRole('heading', { name: 'Speaking', level: 1 })).toBeVisible()
  })

  test('renders upcoming and past event sections', async ({ page }) => {
    await page.goto(`${BASE}/speaking`)

    await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Past Engagements' })).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('navbar links navigate to correct pages', async ({ page }) => {
    await page.goto(BASE)

    await page.getByRole('link', { name: 'Articles' }).first().click()
    await expect(page).toHaveURL(/\/articles/)

    await page.getByRole('link', { name: 'Tools' }).first().click()
    await expect(page).toHaveURL(/\/tools/)

    await page.getByRole('link', { name: 'Programs' }).first().click()
    await expect(page).toHaveURL(/\/programs/)

    await page.getByRole('link', { name: 'Speaking' }).first().click()
    await expect(page).toHaveURL(/\/speaking/)
  })

  test('logo navigates to homepage', async ({ page }) => {
    await page.goto(`${BASE}/articles`)

    await page.locator('header').getByRole('link', { name: 'Liza Akinyi' }).click()
    await expect(page).toHaveURL(BASE + '/')
  })
})

test.describe('Newsletter', () => {
  test('footer contains newsletter form', async ({ page }) => {
    await page.goto(BASE)

    const footer = page.locator('footer')
    await expect(footer.locator('input[type="email"]')).toBeVisible()
    await expect(footer.getByRole('button', { name: 'Subscribe' })).toBeVisible()
  })
})
