import Link from 'next/link';

export default function Home() {
  return <div>
    <h1>Welcome to Next.js!</h1>
    <Link href={{pathname: '/region/thanalan'}}>Thanalan</Link>
    <Link href={{pathname: '/region/lanoscea'}}>La Noscea</Link>
    <Link href={{pathname: '/region/theblackshroud'}}>The Black Shroud</Link>
  </div>
}
