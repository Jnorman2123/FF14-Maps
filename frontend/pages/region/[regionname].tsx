import { useRouter } from 'next/router';

const RegionMap = () => {
    const router = useRouter();
    const { regionName, message } = router.query;

    return <div>
        <h1>Welcome to {regionName} map!</h1>
        <h4>{message}</h4>
    </div>;
}

export default RegionMap;