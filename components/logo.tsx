import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image alt="logo" src="/logo.svg" width={32} height={32} />
      <p className="text-xl font-semibold">Next Template</p>
    </Link>
  )
}

export default Logo
