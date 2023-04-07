import { useRouter } from 'next/router';
import Link from 'next/link';

const RegionMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName = asPath.split('/').slice(-1)[0];

    if (splitPathName === 'thanalan') {
        return <div>
            <h1>Welcome to {splitPathName} map!</h1>
            <Link href={{pathname: '/zone/centralthanalan'}}>Central Thanalan</Link>
            <Link href={{pathname: '/zone/northernthanalan'}}>Northern Thanalan</Link>
            <Link href={{pathname: '/zone/southernthanalan'}}>Southern Thanalan</Link>
            <Link href={{pathname: '/zone/westernthanalan'}}>Western Thanalan</Link>
            <Link href={{pathname: '/zone/easternthanalan'}}>Eastern Thanalan</Link>
        </div>;
    } else if (splitPathName === 'theblackshroud') {
        return <div>
            <h1>Welcome to {splitPathName} map!</h1>
            <Link href={{pathname: '/zone/centralshroud'}}>Central Shroud</Link>
            <Link href={{pathname: '/zone/northernshroud'}}>Northern Shroud</Link>
            <Link href={{pathname: '/zone/southernshroud'}}>Southern Shroud</Link>
            <Link href={{pathname: '/zone/westernshroud'}}>Western Shroud</Link>
            <Link href={{pathname: '/zone/easternshroud'}}>Eastern Shroud</Link>
        </div>;
    } else {
        return <div>
            <h1>Welcome to {splitPathName} map!</h1>
            <Link href={{pathname: '/zone/centrallanoscea'}}>Central La Noscea</Link>
            <Link href={{pathname: '/zone/northernlanoscea'}}>Northern La Noscea</Link>
            <Link href={{pathname: '/zone/southernlanoscea'}}>Southern La Noscea</Link>
            <Link href={{pathname: '/zone/westernlanoscea'}}>Western La Noscea</Link>
            <Link href={{pathname: '/zone/easternlanoscea'}}>Eastern La Noscea</Link>
        </div>;
    }
    
}

export default RegionMap;