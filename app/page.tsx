import { AIBeauty } from '@/app/ai-beauty'
import { FAQSection } from '@/components/ai-beauty/faq-section'
import { HeroSection } from '@/components/ai-beauty/hero-section'
import { HowItWorksSection } from '@/components/ai-beauty/how-it-works-section'
import { PromotionSection } from '@/components/ai-beauty/promotion-section'

export const runtime = 'edge'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <HeroSection />

      <AIBeauty />

      <div className="mt-16">
        <HowItWorksSection />
        <FAQSection />
        <PromotionSection />
      </div>
    </main>
  )
}
