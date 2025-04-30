export const HowItWorksSection = () => {
  return (
    <div className="rounded-xl border-0 bg-gray-900/50 p-8 backdrop-blur-sm">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">How Our Beauty Score Test Works</h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/50 text-2xl">
            1
          </div>
          <h3 className="mb-2 text-lg font-medium text-white">Upload Your Selfie</h3>
          <p className="text-sm text-gray-400">
            Take a clear selfie or upload an existing photo. Our AI works best with front-facing, well-lit images
            showing your full face.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/50 text-2xl">
            2
          </div>
          <h3 className="mb-2 text-lg font-medium text-white">AI Face Analysis</h3>
          <p className="text-sm text-gray-400">
            Our advanced AI analyzes your facial features, skin condition, symmetry, and proportions using the same
            technology as Prettyscale but with greater accuracy.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/50 text-2xl">
            3
          </div>
          <h3 className="mb-2 text-lg font-medium text-white">Get Your Beauty Score</h3>
          <p className="text-sm text-gray-400">
            Receive your attractiveness rating on a scale of 1-10, with detailed breakdowns of individual features and
            personalized enhancement recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}
