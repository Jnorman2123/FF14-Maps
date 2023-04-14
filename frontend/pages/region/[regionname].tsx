import { useRouter } from 'next/router';

const RegionMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName = asPath.split('/').slice(-1)[0];

    return <div>
        <h1>Welcome to {splitPathName} map!</h1> 
    </div>;
    
}

export default RegionMap;