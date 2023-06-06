import { useRouter } from 'next/router';
import Zone from '../zone/[zonename]';

type QuestProps = {
    zoneName?: string;
}



export default function Quest({ zoneName }: QuestProps) {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    zoneName = splitPathName.split('-')[0];

    return (
        <>
            <Zone zoneName={zoneName} />
        </>
        
    )
}