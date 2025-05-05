import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'

export const runtime = 'edge'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  const siteInfoT = await getTranslations('siteInfo')

  return {
    title: `${t('title')} | ${siteInfoT('brandName')}`,
    description: t('metaDescription')
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const siteInfoT = await getTranslations('siteInfo')

  // Get feature titles for the mission section
  const featureKeys = ['conversations', 'imageGeneration', 'customization', 'emotionalIntelligence', 'privacy']
  const featureTitles = featureKeys.map((key) => t(`features.${key}.title` as any))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          {t('subtitle', { brandName: siteInfoT('brandName') })}
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-20">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <h2 className="mb-6 text-3xl font-semibold">{t('mission.title')}</h2>
            <p className="text-xl text-gray-600">{t('mission.description')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {featureTitles.map((feature, index) => (
                <span key={index} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{t('aiBeautyAnalysis')}</h3>
                  <p className="text-muted-foreground mt-2">{t('mission.poweredBy')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="mb-10 text-center text-3xl font-semibold">{t('team.title')}</h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-xl text-gray-600">
          {t.rich('team.weAre', {
            company: () => <span>{t('team.company')}</span>,
            product: () => (
              <Link href={t('team.productUrl')} target="_blank" className="text-blue-600 hover:underline">
                {t('team.mainProduct')}
              </Link>
            )
          })}
        </p>
        <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-600">{t('team.expertise')}</p>

        <div className="mb-12">
          <h3 className="mb-8 text-center text-2xl font-medium">{t('team.whyChoose')}</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{t('features.conversations.title')}</CardTitle>
                <CardDescription className="mb-4">{t('features.conversations.description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-pink-400 to-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{t('features.imageGeneration.title')}</CardTitle>
                <CardDescription className="mb-4">{t('features.imageGeneration.description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{t('features.customization.title')}</CardTitle>
                <CardDescription className="mb-4">{t('features.customization.description')}</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{t('features.emotionalIntelligence.title')}</CardTitle>
                <CardDescription className="mb-4">{t('features.emotionalIntelligence.description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{t('features.privacy.title')}</CardTitle>
                <CardDescription className="mb-4">{t('features.privacy.description')}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-20">
        <div className="rounded-xl bg-gray-50 p-8">
          <h2 className="text-background mb-6 text-center text-3xl font-semibold">{t('story.title')}</h2>
          <p className="mx-auto max-w-3xl text-center text-xl text-gray-600">{t('story.description')}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="mx-auto mb-4 max-w-2xl text-lg text-gray-600 italic">{t('tagline')}</p>
        <p className="mx-auto mt-8 max-w-2xl text-sm text-gray-600">{t('acknowledgement')}</p>
      </div>
    </div>
  )
}
