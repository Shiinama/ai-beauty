import PageError from '@/components/page-error'

export const runtime = 'edge'

const NotFound = () => {
  return <PageError message="Page not found" />
}

export default NotFound
