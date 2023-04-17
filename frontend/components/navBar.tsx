import Link from 'next/link';

export default function NavBar() {
    return <div className='h-navbar w-auto text-3xl font-bold underline bg-slate-400'>
        <div>Nav Bar</div>
        <Link href={{pathname: '/region/Thanalan'}}>Thanalan</Link>
        <Link href={{pathname: '/region/La-Noscea'}}>La Noscea</Link>
        <Link href={{pathname: '/region/The-Black-Shroud'}}>The Black Shroud</Link>
        <Link href={{pathname: '/zone/Central-Thanalan'}}>Central Thanalan</Link>
        <Link href={{pathname: '/zone/Northern-Thanalan'}}>Northern Thanalan</Link>
        <Link href={{pathname: '/zone/Southern-Thanalan'}}>Southern Thanalan</Link>
        <Link href={{pathname: '/zone/Western-Thanalan'}}>Western Thanalan</Link>
        <Link href={{pathname: '/zone/Eastern-Thanalan'}}>Eastern Thanalan</Link>
        <Link href={{pathname: '/zone/Central-Shroud'}}>Central Shroud</Link>
        <Link href={{pathname: '/zone/Northern-Shroud'}}>Northern Shroud</Link>
        <Link href={{pathname: '/zone/Southern-Shroud'}}>Southern Shroud</Link>
        <Link href={{pathname: '/zone/Western-Shroud'}}>Western Shroud</Link>
        <Link href={{pathname: '/zone/Eastern-Shroud'}}>Eastern Shroud</Link>
        <Link href={{pathname: '/zone/Central-La-Noscea'}}>Central La Noscea</Link>
        <Link href={{pathname: '/zone/Northern-La-Noscea'}}>Northern La Noscea</Link>
        <Link href={{pathname: '/zone/Southern-La-Noscea'}}>Southern La Noscea</Link>
        <Link href={{pathname: '/zone/Western-La-Noscea'}}>Western La Noscea</Link>
        <Link href={{pathname: '/zone/Eastern-La-Noscea'}}>Eastern La Noscea</Link>
        </div>
}