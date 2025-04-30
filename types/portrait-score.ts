export type PortraitScore = {
  overall_score: number
  facial_features: {
    eyes: number
    nose: number
    mouth: number
    facial_structure: number
  }
  technical_aspects: {
    lighting: number
    composition: number
    clarity: number
    color_balance: number
  }
  expression: number
  strengths: string[]
  areas_for_improvement: string[]
  summary: string
}

export type PortraitScoreError = {
  error: string
  errorDetail?: string
  raw_response?: any
}
