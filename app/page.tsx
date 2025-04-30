import { TextButton } from '@/app/test'

export const runtime = 'edge'

export default async function Home() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6">
      <TextButton />
      {/* Hero Section */}
      <section className="mb-16 flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Next-Generation AI Image Technology Current Version v1.0.7
        </h1>
        <p className="text-muted-foreground mb-8 max-w-3xl text-xl md:text-2xl">
          Discover how artificial intelligence is revolutionizing image creation, recognition, and processing in today's
          digital landscape.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-8 py-3 font-medium">
            Explore AI Tools
          </button>
          <button className="btn bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md px-8 py-3 font-medium">
            Learn More
          </button>
        </div>
      </section>

      {/* Featured AI Image Technologies */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Leading AI Image Technologies</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Generative AI',
              description: 'Create stunning original images from text prompts using advanced neural networks.',
              icon: '🎨'
            },
            {
              title: 'Image Recognition',
              description: 'Identify objects, people, and scenes in images with remarkable accuracy.',
              icon: '👁️'
            },
            {
              title: 'Style Transfer',
              description: 'Transform photos into artwork mimicking famous artistic styles.',
              icon: '🖼️'
            },
            {
              title: 'Image Enhancement',
              description: 'Automatically improve image quality, resolution, and clarity.',
              icon: '✨'
            },
            {
              title: 'Visual Search',
              description: 'Find similar images or products using visual references instead of text.',
              icon: '🔍'
            },
            {
              title: 'Medical Imaging',
              description: 'Assist healthcare professionals in diagnosing conditions through image analysis.',
              icon: '🏥'
            }
          ].map((item, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Developments */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Latest in AI Imaging</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[
            {
              title: 'DALL-E 3 Sets New Standards for Text-to-Image Generation',
              date: 'October 2023',
              excerpt:
                "OpenAI's latest model produces remarkably accurate images from complex text descriptions, with improved understanding of spatial relationships."
            },
            {
              title: 'Midjourney v6 Enhances Photorealistic Capabilities',
              date: 'November 2023',
              excerpt:
                'The newest version offers unprecedented photorealism and improved handling of human anatomy and facial features.'
            },
            {
              title: "Google's Imagen 2 Focuses on Ethical AI Image Generation",
              date: 'September 2023',
              excerpt: 'New safeguards and filters help prevent misuse while maintaining high-quality creative output.'
            },
            {
              title: 'Adobe Firefly Integrates Directly with Creative Cloud',
              date: 'August 2023',
              excerpt:
                'Professional creators now have AI image generation tools seamlessly built into their existing workflows.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-card overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
              <div className="p-6">
                <p className="text-muted-foreground mb-2 text-sm">{item.date}</p>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.excerpt}</p>
                <button className="text-primary mt-4 inline-flex items-center font-medium">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">AI Image Applications</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            'E-commerce Product Photography',
            'Content Creation for Marketing',
            'Game Design & Development',
            'Interior Design Visualization',
            'Fashion Design Prototyping',
            'Educational Materials',
            'Film & Animation Production',
            'Architectural Rendering'
          ].map((item, index) => (
            <div key={index} className="bg-accent/20 hover:bg-accent/30 rounded-lg p-4 text-center transition-colors">
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 mb-16 rounded-xl p-8 text-center md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Stay Updated on AI Image Technology</h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          Subscribe to our newsletter for the latest developments, tutorials, and insights into the world of AI-powered
          imaging.
        </p>
        <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="border-input bg-background flex-grow rounded-md border px-4 py-2"
          />
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 font-medium">
            Subscribe
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              question: 'What is AI image generation?',
              answer:
                'AI image generation uses artificial intelligence algorithms, typically based on neural networks, to create new images from text descriptions, reference images, or other inputs. Popular models include DALL-E, Midjourney, and Stable Diffusion.'
            },
            {
              question: 'Are AI-generated images copyright-free?',
              answer:
                'The copyright status of AI-generated images is complex and evolving. Generally, the output may be influenced by the terms of service of the AI tool used. Some platforms grant users rights to commercial use, while others may have restrictions.'
            },
            {
              question: 'How accurate is AI image recognition?',
              answer:
                'Modern AI image recognition systems can achieve over 95% accuracy in many common scenarios, though performance varies based on the specific task, training data, and conditions. They excel at identifying objects, faces, and scenes in clear images.'
            },
            {
              question: 'What hardware is needed for AI image processing?',
              answer:
                'While cloud-based solutions require only an internet connection, running advanced AI image models locally typically requires a computer with a powerful GPU (graphics processing unit), sufficient RAM, and adequate storage space.'
            }
          ].map((item, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="mb-8 text-center text-3xl font-bold">Essential AI Image Resources</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Learning Platforms</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Coursera AI Specializations
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Fast.ai Computer Vision Course
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                DeepLearning.AI
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Popular AI Tools</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                DALL-E by OpenAI
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Midjourney
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Stable Diffusion
              </li>
            </ul>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Research Papers</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ArXiv Computer Vision Papers
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                CVPR Conference Proceedings
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ICCV Research Publications
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
