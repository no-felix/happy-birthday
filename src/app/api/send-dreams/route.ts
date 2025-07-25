import { NextRequest, NextResponse } from 'next/server'

interface Dream {
  categoryId: number
  text: string
}

export async function POST(request: NextRequest) {
  try {
    const { dreams } = await request.json()

    if (!dreams || !Array.isArray(dreams)) {
      return NextResponse.json(
        { error: 'Invalid dreams data' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Discord webhook URL not configured')
      return NextResponse.json(
        { error: 'Discord webhook not configured' },
        { status: 500 }
      )
    }

    // Format dreams for Discord
    const dreamsText = dreams.map((dream: Dream) => {
      const categoryEmoji = getCategoryEmoji(dream.categoryId)
      const categoryTitle = getCategoryTitle(dream.categoryId)
      return `${categoryEmoji} **${categoryTitle}**\n${dream.text}\n`
    }).join('\n')

    const embed = {
      title: "🎂 Alinas Geburtstags-Träume",
      description: `Hier sind die Träume und Wünsche, die Alina zu ihrem 18. Geburtstag geteilt hat:\n\n${dreamsText}`,
      color: 0x8B5CF6, // Purple color
      timestamp: new Date().toISOString(),
      footer: {
        text: "Happy Birthday Alina! 🎉"
      },
      fields: [
        {
          name: "🌟 Anzahl der Träume",
          value: dreams.length.toString(),
          inline: true
        },
        {
          name: "📅 Datum",
          value: new Date().toLocaleDateString('de-DE'),
          inline: true
        }
      ]
    }

    const discordPayload = {
      content: "🎈 **Neue Geburtstags-Träume eingegangen!** 🎈",
      embeds: [embed]
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload)
    })

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error sending dreams to Discord:', error)
    return NextResponse.json(
      { error: 'Failed to send dreams to Discord' },
      { status: 500 }
    )
  }
}

function getCategoryEmoji(categoryId: number): string {
  const categories: { [key: number]: string } = {
    1: "💼",
    2: "✈️", 
    3: "🌟",
    4: "🎨"
  }
  return categories[categoryId] || "✨"
}

function getCategoryTitle(categoryId: number): string {
  const categories: { [key: number]: string } = {
    1: "Karriere & Beruf",
    2: "Reisen & Abenteuer",
    3: "Persönliche Ziele", 
    4: "Hobbys & Leidenschaften"
  }
  return categories[categoryId] || "Unbekannte Kategorie"
}
