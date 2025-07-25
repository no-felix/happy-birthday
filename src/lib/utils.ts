export const STAGES = {
  WELCOME: 'welcome',
  AGE_VERIFICATION: 'age-verification',
  MEMORY_LANE: 'memory-lane',
  WISHES: 'wishes',
  BIG_REVEAL: 'big-reveal'
} as const

export type Stage = typeof STAGES[keyof typeof STAGES]

export const MESSAGES = {
  welcome: {
    title: "Herzlich Willkommen, Alina!",
    subtitle: "Ein ganz besonderer Tag wartet auf dich...",
    button: "Beginne deine Reise"
  },
  ageVerification: {
    title: "Bist du bereit für den nächsten Schritt?",
    subtitle: "Wie alt wirst du heute?",
    placeholder: "Dein Alter eingeben...",
    error: "Das ist nicht ganz richtig... 🤔",
    success: "Perfekt! Du bist jetzt volljährig! 🎉"
  },
  memoryLane: {
    title: "Deine Träume für die Zukunft...",
    subtitle: "Teile deine Wünsche und Träume für das nächste Kapitel deines Lebens"
  },
  wishes: {
    title: "18 Jahre in Zahlen...",
    subtitle: "Klicke auf die Statistiken, um dein Leben in Zahlen zu entdecken"
  },
  bigReveal: {
    title: "Deine große Überraschung...",
    subtitle: "Das Beste kommt zum Schluss!"
  }
}

export const DREAM_CATEGORIES = [
  {
    id: 1,
    title: "Karriere & Beruf",
    placeholder: "Was möchtest du beruflich erreichen?",
    emoji: "💼",
    icon: "🎯"
  },
  {
    id: 2,
    title: "Reisen & Abenteuer", 
    placeholder: "Welche Orte möchtest du entdecken?",
    emoji: "✈️",
    icon: "🌍"
  },
  {
    id: 3,
    title: "Persönliche Ziele",
    placeholder: "Woran möchtest du wachsen?",
    emoji: "🌟",
    icon: "💪"
  },
  {
    id: 4,
    title: "Hobbys & Leidenschaften",
    placeholder: "Was möchtest du lernen oder erleben?",
    emoji: "🎨",
    icon: "❤️"
  }
]

export const LIFE_STATS = [
  {
    id: 1,
    number: "6.574",
    unit: "Tage",
    description: "So viele Tage hast du gelebt - jeden einzelnen davon einzigartig!",
    emoji: "📅"
  },
  {
    id: 2,
    number: "157.776", 
    unit: "Stunden",
    description: "So viele Stunden Lebenserfahrung - gefüllt mit Lachen, Lernen und Wachsen!",
    emoji: "⏰"
  },
  {
    id: 3,
    number: "18",
    unit: "Geburtstage",
    description: "Jeder Geburtstag ein neues Kapitel, und heute beginnt das Beste!",
    emoji: "🎂"
  },
  {
    id: 4,
    number: "~20.000",
    unit: "Mahlzeiten",
    description: "So viele leckere Momente - von Babybrei bis zu deinen Lieblingsdesserts!",
    emoji: "🍽️"
  },
  {
    id: 5,
    number: "~52.500",
    unit: "Schlafstunden",
    description: "Zeit für Träume, Erholung und die Vorbereitung auf neue Abenteuer!",
    emoji: "😴"
  },
  {
    id: 6,
    number: "1",
    unit: "Volljährigkeit",
    description: "Heute erreichst du diesen besonderen Meilenstein - herzlichen Glückwunsch!",
    emoji: "🎯"
  }
]
