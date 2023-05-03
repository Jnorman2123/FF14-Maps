import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getLaNosceaZoneNamesState, getTheBlackShroudZoneNamesState, getThanalanZoneNamesState,
getRegionNamesState } from '@/store/slices/dataStoreSlice';


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

    let regionNames = useSelector(getRegionNamesState).slice(0, 3);
    let laNosceaZoneNames = useSelector(getLaNosceaZoneNamesState);
    let theBlackShroudZoneNames = useSelector(getTheBlackShroudZoneNamesState);
    let thanalanZoneNames = useSelector(getThanalanZoneNamesState);

  return (
    <div className='h-navbar relative bg-center bg-cover' style={{ backgroundImage: "url('/nav_bar/NavBar.jpg')", height: '140px'}}>
        {regionNames.map((regionName: string) => {
            let zones = [];
            let divClassName = '';
            let regionLink = regionName.split(' ').join('-');
            if (regionName === 'La Noscea') {
                zones = laNosceaZoneNames;
                divClassName = "absolute bottom-0 left-10 inline-block text-left";
            } else if (regionName === 'The Black Shroud') {
                zones = theBlackShroudZoneNames;
                divClassName = "absolute bottom-0 left-40 inline-block text-left";
            } else {
                zones = thanalanZoneNames;
                divClassName = "absolute bottom-0 left-80 inline-block text-left";
            }
            return <Menu key={regionName} as="div" className={divClassName}>
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm 
                    font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {regionName}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1
                     ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                            {({ active }) => (
                                <Link href={`/region/${regionLink}`}
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
        })}
    </div>
  )
}