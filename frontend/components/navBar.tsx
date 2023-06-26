import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { getLaNosceaZoneNamesState, getTheBlackShroudZoneNamesState, getThanalanZoneNamesState,
getRegionNamesState } from '@/store/slices/dataStoreSlice';
import { inter400 } from "@/styles/fonts";
import { useRouter } from "next/router";
import { useState, useEffect} from 'react';


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const [logoIndex, setLogoIndex] = useState<number>(1);
    const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();
    let regionNames = useSelector(getRegionNamesState).slice(0, 3);
    let laNosceaZoneNames = useSelector(getLaNosceaZoneNamesState);
    let theBlackShroudZoneNames = useSelector(getTheBlackShroudZoneNamesState);
    let thanalanZoneNames = useSelector(getThanalanZoneNamesState);
    let logoUrl: string = `/nav_bar/logos/HelperQuestLogo${logoIndex}.png`
    let backgroundUrl: string = `/nav_bar/backgrounds/NavBackground${backgroundIndex}.jpg`;
    let worldButtonUrl: string = '/icons/nav_icons/HomeButton.png';

    useEffect(() => {
        const interval = setInterval(() => {
          setLogoIndex((prevLogoIndex) =>
            prevLogoIndex === 40 ? 1 : prevLogoIndex + 1
          );
          setBackgroundIndex((prevBackgroundIndex) => 
            prevBackgroundIndex === 116 ? 0 : prevBackgroundIndex + 1
          )
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    const navigateToWorld = () => {
        router.push(`/`);
    }

    if (hovered) {
        worldButtonUrl = '/icons/nav_icons/HomeButtonHover.png';
    }

    return (
        <div className='aspect-h-9 relative' style={{backgroundImage: `url(${backgroundUrl})`, 
        backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className='grid grid-cols-12 gap-1' >
                <button className="col-span-3" onClick={navigateToWorld}> 
                    <Image src={logoUrl} alt='HelperQuest Logo' title='Navigate to World Map'
                    width={600} height={140} />
                </button>
                <button className='col-span-1 relative' onClick={navigateToWorld} onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} style={{padding: 0}} >
                    <Image src={worldButtonUrl} alt='Home Button' title='Navigate to the World Map' width={40} height={40} 
                        className='absolute bottom-0 left-5 ' />
                </button>
                {regionNames.map((regionName: string) => {
                    let zones = [];
                    let regionTabUrl: string = regionName.split(' ').join('');
                    if (regionName === 'La Noscea') {
                        zones = laNosceaZoneNames;
                    } else if (regionName === 'The Black Shroud') {
                        zones = theBlackShroudZoneNames;
                    } else {
                        zones = thanalanZoneNames;
                    }
                    return <div className='col-span-1 relative' key={regionName}>
                        <Menu  as="div" className="text-left absolute bottom-0 w-full">
                            <Menu.Button className="w-full justify-center py-2 hover:opacity-95 opacity-80 
                            relative">
                                <Image src={`/nav_bar/${regionTabUrl}NavTab.png`} alt={`${regionName} Tab`} 
                                width={200} height={50} className='absolute bottom-0'/>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className={`absolute left-0 z-[1000] mt-2 w-56 origin-top-right rounded-md bg-lightbg 
                                shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${inter400.className}`}>
                                    <div className="py-1">
                                        <Menu.Item>
                                        {({ active }) => (
                                            <Link href={`/region/${regionTabUrl}`}
                                            className={classNames(
                                                active ? 'bg-queststepsbg text-blue-500' : 'bg-questrewardbg1 text-blue-500',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                                {regionName}
                                            </Link>
                                        )}
                                        </Menu.Item>
                                        {zones.map((zone: string) => {
                                            let zoneLink = zone.split(' ').join('');
                                            return <Menu.Item key={zone}>
                                            {({ active }) => (
                                                <Link href={`/zone/${zoneLink}`}
                                                className={classNames(
                                                    active ? 'bg-queststepsbg text-blue-500' : 'text-blue-500',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                >
                                                {zone}
                                                </Link>
                                            )}
                                            </Menu.Item>
                                        })}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                })}
            </div>
        </div>
    )
}