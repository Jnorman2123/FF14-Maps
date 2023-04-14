import Link from 'next/link';

export default function NavBar() {
    return <div className='h-navbar w-auto text-3xl font-bold underline bg-slate-400'>
        <div>Nav Bar</div>
        <Link href={{pathname: '/region/thanalan'}}>Thanalan</Link>
        <Link href={{pathname: '/region/lanoscea'}}>La Noscea</Link>
        <Link href={{pathname: '/region/theblackshroud'}}>The Black Shroud</Link>
        <Link href={{pathname: '/zone/centralthanalan'}}>Central Thanalan</Link>
        <Link href={{pathname: '/zone/northernthanalan'}}>Northern Thanalan</Link>
        <Link href={{pathname: '/zone/southernthanalan'}}>Southern Thanalan</Link>
        <Link href={{pathname: '/zone/westernthanalan'}}>Western Thanalan</Link>
        <Link href={{pathname: '/zone/easternthanalan'}}>Eastern Thanalan</Link>
        <Link href={{pathname: '/zone/centralshroud'}}>Central Shroud</Link>
        <Link href={{pathname: '/zone/northernshroud'}}>Northern Shroud</Link>
        <Link href={{pathname: '/zone/southernshroud'}}>Southern Shroud</Link>
        <Link href={{pathname: '/zone/westernshroud'}}>Western Shroud</Link>
        <Link href={{pathname: '/zone/easternshroud'}}>Eastern Shroud</Link>
        <Link href={{pathname: '/zone/centrallanoscea'}}>Central La Noscea</Link>
        <Link href={{pathname: '/zone/northernlanoscea'}}>Northern La Noscea</Link>
        <Link href={{pathname: '/zone/southernlanoscea'}}>Southern La Noscea</Link>
        <Link href={{pathname: '/zone/westernlanoscea'}}>Western La Noscea</Link>
        <Link href={{pathname: '/zone/easternlanoscea'}}>Eastern La Noscea</Link>
        </div>
}