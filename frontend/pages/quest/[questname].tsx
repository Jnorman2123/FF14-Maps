import { useRouter } from 'next/router';
import Zone from '../zone/[zonename]';

type QuestProps = {
    zoneName?: string;
    questName?: string;
}



export default function Quest({ zoneName, questName }: QuestProps) {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string[] = asPath.split('/').slice(1);
    zoneName = splitPathName[0];

    return (
        <>
            <Zone zoneName={zoneName} />
        </>
    )
}