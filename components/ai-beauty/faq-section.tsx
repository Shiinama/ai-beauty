export const FAQSection = () => {
  const faqs = [
    {
      question: 'How accurate is this AI attractiveness test?',
      answer:
        'Our AI beauty analyzer provides a highly accurate assessment based on facial symmetry, proportions, and features that are universally considered attractive. While beauty is subjective, our algorithm has been trained on thousands of faces to identify common beauty standards across cultures.'
    },
    {
      question: 'Is this similar to Prettyscale?',
      answer:
        'Yes, our face analysis tool is similar to Prettyscale but uses more advanced AI technology for greater accuracy. We provide more detailed breakdowns of facial features and skin analysis, along with personalized recommendations.'
    },
    {
      question: 'How is my beauty score calculated?',
      answer:
        'Your face score is calculated by analyzing key facial features (eyes, nose, mouth, structure), skin quality, symmetry, and proportions. The AI compares these measurements to beauty standards and generates an overall attractiveness score on a scale of 1-10.'
    },
    {
      question: 'Is my photo stored or shared?',
      answer:
        'Your privacy is our priority. Your uploaded photos are processed for analysis only and are not permanently stored or shared with third parties. All processing happens securely on our servers and images are deleted after analysis.'
    },
    {
      question: 'Can I use this for skin analysis too?',
      answer:
        'Yes! Our AI beauty analyzer includes comprehensive skin analysis as part of its assessment. It evaluates skin clarity, tone, texture, and overall complexion, providing specific recommendations for skin care improvements.'
    },
    {
      question: 'How can I improve my attractiveness score?',
      answer:
        'After your analysis, we provide personalized recommendations based on your specific results. These may include tips for better photo angles, lighting, skincare suggestions, or features to emphasize. Remember that our tool is meant to be fun and informative!'
    }
  ]

  return (
    <div className="mt-8 rounded-xl border-0 bg-gray-900/50 p-8 backdrop-blur-sm">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently Asked Questions</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg bg-gray-800/50 p-5">
            <h3 className="mb-2 font-medium text-purple-400">{faq.question}</h3>
            <p className="text-sm text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
