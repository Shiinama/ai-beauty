'use server'

import { incrementUserAnalysisUsage } from '@/actions/userAnalysis'
import { createAI } from '@/lib/ai'

export const imageToText = async ({ buffer, prompt }: { buffer: Uint8Array<ArrayBuffer>; prompt?: string }) => {
  // Get Cloudflare AI instance
  const cloudflareAI = createAI()

  // Run the AI model with the image and prompt
  const result = await cloudflareAI.run('@cf/llava-hf/llava-1.5-7b-hf', {
    image: Array.from(buffer),
    prompt: prompt ?? 'Analyze this image in detail, focusing on visual elements, composition, and quality.',
    max_tokens: 512
  })
  return result
}

export const scorePortrait = async ({ buffer, userId }: { buffer: Uint8Array<ArrayBuffer>; userId: string }) => {
  // First, get the image description
  const imageDescription = await imageToText({
    buffer,
    prompt: `
    You are a professional portrait analyst and beauty expert.
    
    Analyze this portrait in detail, focusing specifically on:
    1. Facial features (eyes, nose, mouth, facial structure, symmetry)
    2. Skin quality and complexion
    3. Expression and emotional impact
    4. Technical aspects (lighting, composition, clarity, color balance)
    5. Overall aesthetic appeal
    
    Be objective, detailed, and comprehensive in your analysis.
    `
  })

  // Now use a text-based model to analyze the description and generate a score
  const cloudflareAI = createAI()

  const prompt = `
  You are a professional beauty analyst with expertise in facial aesthetics and portrait photography.
  
  ### TASK
  Based on the following portrait description, provide a detailed analysis and scoring in JSON format ONLY.
  
  ### PORTRAIT DESCRIPTION
  ${imageDescription}
  
  ### OUTPUT INSTRUCTIONS
  1. You MUST respond ONLY with a valid JSON object.
  2. Do NOT include any explanatory text, markdown formatting, or code blocks.
  3. Do NOT include phrases like "Here's the JSON" or "JSON response:".
  4. The JSON structure must strictly follow the template below.
  
  ### JSON TEMPLATE
  {
    "overall_score": <number between 1-10, with one decimal precision>,
    "facial_features": {
      "eyes": <integer between 1-10>,
      "nose": <integer between 1-10>,
      "mouth": <integer between 1-10>,
      "facial_structure": <integer between 1-10>
    },
    "technical_aspects": {
      "lighting": <integer between 1-10>,
      "composition": <integer between 1-10>,
      "clarity": <integer between 1-10>,
      "color_balance": <integer between 1-10>
    },
    "expression": <integer between 1-10>,
    "strengths": [<exactly 3-5 specific strengths as short phrases>],
    "areas_for_improvement": [<exactly 2-4 specific improvement suggestions as short phrases>],
    "summary": <concise 1-2 sentence summary of overall impression>
  }
  
  Remember: Your response must be ONLY the JSON object with no additional text.
  `

  // Use a text model to generate the structured analysis
  const analysisResult = await cloudflareAI.run('@cf/meta/llama-4-scout-17b-16e-instruct', {
    prompt,
    stream: false,
    max_tokens: 1024
  })

  if (typeof analysisResult === 'object') {
    try {
      // The model might return text before or after the JSON, so we need to extract just the JSON part
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
