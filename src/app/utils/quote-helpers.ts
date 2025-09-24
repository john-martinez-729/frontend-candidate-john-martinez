export interface Quote {
  likes: number;
  text: string;
}

export function transformQuotes(quotesObj: Record<string, string[]>): Quote[] {
  const quotes: Quote[] = [];

  Object.entries(quotesObj).forEach(([likes, texts]) => {
    (texts as string[]).forEach((text) => {
      quotes.push({ likes: Number(likes), text });
    });
  });

  // Sort by likes in descending order and alphabetically
  return quotes.sort(
    (a, b) => b.likes - a.likes || a.text.localeCompare(b.text)
  );
}
