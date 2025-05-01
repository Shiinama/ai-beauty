'use server'

import { incrementUserAnalysisUsage } from '@/actions/userAnalysis'
import { createAI } from '@/lib/ai'

export const imageToText = async ({ buffer, prompt }: { buffer: Uint8Array<ArrayBuffer>; prompt?: string }) => {
  // Get Cloudflare AI instance
  const cloudflareAI = createAI()

  // Run the AI model with the image and prompt
  const result = await cloudflareAI.run('@cf/llava-hf/llava-1.5-7b-hf', {
    image: Array.from(buffer),
    prompt: prompt ?? 'Analyze this image in detail, focusing on visual elements, composition, and quality.'
  })
  return result
}

export const scorePortrait = async ({ buffer, userId }: { buffer: Uint8Array<ArrayBuffer>; userId: string }) => {
  // First, get the image description
  const { description } = await imageToText({
    buffer,
    prompt: `
    First, determine if this is a clear human face portrait suitable for beauty analysis.

    If it IS a suitable portrait, analyze these precise facial measurements:
    1. Facial Proportions:
       - Vertical thirds ratio (1:1:1 ideal): forehead:midface:lower face
       - Facial width to height ratio (ideal 3:4)
       - Bilateral symmetry percentage (100% being perfect symmetry)

    2. Eyes:
       - Interpupillary distance (ideal: 1/2 of face width)
       - Eye width to face width ratio (ideal: 1/5 each eye)
       - Eye spacing (ideal: one eye width between eyes)
       - Upper to lower eyelid ratio

    3. Nose:
       - Nose width to face width ratio (ideal: 1/5 of face width)
       - Nose length to face height ratio (ideal: 1/3 of face)
       - Nasolabial angle (ideal: 90-120 degrees)
       - Nasofrontal angle (ideal: 115-130 degrees)

    4. Mouth:
       - Mouth width to interpupillary distance ratio (ideal: 1.5:1)
       - Upper to lower lip ratio (ideal: 1:1.6)
       - Lip height to face height ratio
       - Vermillion border definition (high/medium/low)

    5. Technical Quality:
       - Image resolution (high/medium/low)
       - Lighting evenness (percentage)
       - Focus sharpness (high/medium/low)
       - Color accuracy (high/medium/low)

    Provide numerical estimates where possible. Be precise and objective.
    `
  })

  // Now use a text-based model to analyze the description and generate a score
  const cloudflareAI = createAI()

  const prompt = `
  # Portrait Analysis System
  You are an AI portrait analyzer with expertise in facial aesthetics and photography.

  ## REFERENCE SCALE
  - 10/10: Perfect (theoretical only)
  - 8-9/10: Exceptional (top models/celebrities)
  - 7/10: Audrey Hepburn (reference point)
  - 5-6/10: Average
  - 3-4/10: Below average
  - 1-2/10: Poor
  
  ## PORTRAIT DESCRIPTION
  ${description}

  ## SCORING GUIDELINES
  - Be conservative with scores. Most portraits should score between 3-6.
  - Base scores on objective facial proportions and technical quality.
  - Consider classical beauty standards and photographic principles.
  
  ## OUTPUT FORMAT
  Respond ONLY with a valid JSON object following this exact structure:

  {
    "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
    "areas_for_improvement": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>"],
    "summary": "<3-4 sentence comprehensive assessment covering facial features, technical quality, and overall impression>"
    "overall_score": <number between 1-10 with one decimal place>,
    "facial_features": {
      "eyes": <integer 1-10>,
      "nose": <integer 1-10>,
      "mouth": <integer 1-10>,
      "facial_structure": <integer 1-10>
    },
    "technical_aspects": {
      "lighting": <integer 1-10>,
      "composition": <integer 1-10>,
      "clarity": <integer 1-10>,
      "color_balance": <integer 1-10>
    },
    "expression": <integer 1-10>,
  }
  `

  const analysisResult = await cloudflareAI.run('@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', {
    prompt,
    stream: false,
    temperature: 0.2,
    max_tokens: 10000,
    top_p: 0.9,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  })

  if ('response' in analysisResult) {
    try {
      // The model might return text before or after the JSON, so we need to extract just the JSON part
      const jsonMatch = analysisResult.response?.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        console.error('No valid JSON found in the response:', analysisResult.response)
        return {
          error: 'Failed to analyze portrait. Please try again.',
          errorDetail: 'No valid JSON structure found in the AI response',
          raw_response: analysisResult.response
        }
      }

      const jsonString = jsonMatch[0]
      try {
        const scoreData = JSON.parse(jsonString)
        await incrementUserAnalysisUsage(userId)
        return scoreData
      } catch (parseError) {
        console.error('Failed to parse JSON from response:', parseError)
        return {
          error: 'Failed to process portrait analysis. Please try again.',
          errorDetail: 'Invalid JSON structure in the AI response',
          raw_response: jsonString
        }
      }
    } catch (error) {
      console.error('Failed to parse portrait scoring result:', error)
      return {
        error: 'Something went wrong with your portrait analysis. Please try again.',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
        raw_response: analysisResult
      }
    }
  }
}
