import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  return <div>
    <h1>Welcome to Next.js!</h1>
    <Link href={{pathname: '/region/thanalan', query: {regionName: 'Thanalan', message: 'hey'}}}>Thanalan</Link>
    <Link href={{pathname: '/region/lanoscea', query: {regionName: 'La Noscea', message: 'hi'}}}>La Noscea</Link>
    <Link href={{pathname: '/region/theblackshroud', query: {regionName: 'The Black Shroud', message: 'hello'}}}>The Black Shroud</Link>
  </div>
}
