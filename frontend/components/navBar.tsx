import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { getLaNosceaZoneNamesState, getTheBlackShroudZoneNamesState, getThanalanZoneNamesState,
getRegionNamesState } from '@/store/slices/dataStoreSlice';
import { inter400 } from "@/styles/fonts";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

    let regionNames = useSelector(getRegionNamesState).slice(0, 3);
    let laNosceaZoneNames = useSelector(getLaNosceaZoneNamesState);
    let theBlackShroudZoneNames = useSelector(getTheBlackShroudZoneNamesState);
    let thanalanZoneNames = useSelector(getThanalanZoneNamesState);

  return (
    <div className="aspect-h-9 relative bg-[url('/nav_bar/NavBar.jpg')] bg-cover bg-no-repeat">
        <div className='grid grid-cols-12 gap-1' >
            <div className='col-span-3'>
                <Image src='/nav_bar/logos/HelperQuest_Logo.png' alt='HelperQuest Logo' width={600} height={140} />
            </div>
            {regionNames.map((regionName: string) => {
                let zones = [];
                let regionTabUrl: string = regionName.split(' ').join('');
                let regionLink: string = regionName.split(' ').join('-');
                if (regionName === 'La Noscea') {
                    zones = laNosceaZoneNames;
                } else if (regionName === 'The Black Shroud') {
                    zones = theBlackShroudZoneNames;
                } else {
                    zones = thanalanZoneNames;
                }
                return <div className='grid-cols-1 relative' key={regionName}>
                    <Menu  as="div" className="text-left absolute bottom-0 w-full">
                        <Menu.Button className="inline-flex w-full justify-center bg-transparent py-2 hover:opacity-95 opacity-80 
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
                                        <Link href={`/region/${regionLink}`}
                                        className={classNames(
                                            active ? 'bg-queststepsbg text-blue-500' : 'text-blue-500',
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