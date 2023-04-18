import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { getQuestDetailsState } from "@/store/slices/dataStoreSlice";

const ZoneMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join('');
    console.log(useSelector(getQuestDetailsState));

    return (
        <MapContainer crs={L.CRS.Simple} center={[-20.95, 20.95]} zoom={4.25} minZoom={4.25} maxZoom={7} scrollWheelZoom={true} 
        style={{height: '825px', width: '100%'}} maxBoundsViscosity={1} >
            <ImageOverlay url={`/maps/${zoneName}.jpg`} bounds={[[-1,1], [-41.9, 41.9]]} />
            {/* <Marker position={[40.8054, -74.0241]} draggable={true} >
                <Popup>
                    Marker
                </Popup>
            </Marker> */}
        </MapContainer>
    )
}

export default ZoneMap;

{/* <MapContainer crs={L.CRS.Simple} center={props.center} zoom={props.zoom} 
        minZoom={props.minZoom} maxZoom={props.maxZoom} maxBounds={props.bounds} 
        maxBoundsViscosity='1' scrollWheelZoom={true} style={{height: '825px', width: '100%'}} 
        className='bg-lightbg' >
            <ImageOverlay attribution='@ 2010-2023 SQUARE ENIX CO., LTD. All Rights Reserved' 
            url={`./maps/${props.mapName}.jpg`} bounds={props.bounds} opacity={1}/>
            {props.renderMarkers(props.unclustered_markers)}
            <InsideZoneLegend props={props} />
        </MapContainer> */}
