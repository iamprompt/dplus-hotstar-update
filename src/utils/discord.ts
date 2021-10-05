import { WebhookClient } from 'discord.js'
import { config } from 'dotenv'
config()

export const webhook = new WebhookClient({
  id: process.env.DISCORD_WEBHOOK_ID || '',
  token: process.env.DISCORD_WEBHOOK_TOKEN || '',
})
