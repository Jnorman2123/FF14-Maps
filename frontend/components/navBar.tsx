import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getLaNosceaZoneNamesState, getTheBlackShroudZoneNamesState, getThanalanZoneNamesState,
getRegionNamesState } from '@/store/slices/dataStoreSlice';

export default function NavBar() {
    let regionNames = useSelector(getRegionNamesState).slice(0, 3);
    let laNosceaZoneNames = useSelector(getLaNosceaZoneNamesState);
    let theBlackShroudZoneNames = useSelector(getTheBlackShroudZoneNamesState);
    let thanalanZoneNames = useSelector(getThanalanZoneNamesState);

    return <div className='h-navbar w-auto text-3xl font-bold underline bg-slate-400'>
        <div>Nav Bar</div>
            {regionNames.map((regionName: string) => {
                let zones = [];
                let regionLink = regionName.split(' ').join('-');
                if (regionName === 'La Noscea') {
                    zones = laNosceaZoneNames;
                } else if (regionName === 'The Black Shroud') {
                    zones = theBlackShroudZoneNames;
                } else {
                    zones = thanalanZoneNames;
                }
                return <div key={regionName} >
                    <h6><Link href={`/region/${regionLink}`}>{regionName}</Link></h6>
                    <ul>
                        {zones.map((zone: string) => {
                            let zoneLink = zone.split(' ').join('');
                            console.log(zoneLink)
                            return <li key={zone} ><Link href={`/zone/${zoneLink}`} >{zone}</Link></li>
                        })}
                    </ul>
                </div>
            })}
        </div>
}