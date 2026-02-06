import { getPayloadClient } from '../lib/payload'
import { seed } from './index'

async function run() {
  const payload = await getPayloadClient()
  await seed(payload)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
