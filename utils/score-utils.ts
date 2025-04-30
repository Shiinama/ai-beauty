/**
 * Returns a color based on the score value
 * @param score - A number between 0 and 10
 * @returns RGB color string
 */
export const getScoreColor = (score: number): string => {
  if (score >= 8) return 'rgb(16, 185, 129)' // Green
  if (score >= 6) return 'rgb(59, 130, 246)' // Blue
  if (score >= 4) return 'rgb(245, 158, 11)' // Amber
  return 'rgb(239, 68, 68)' // Red
}
