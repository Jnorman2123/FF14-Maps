import { TypeQuest, TypeJob, TypeReward, TypeItem, TypeStep, TypeNpc } from "@/types";
import { getJobsState, getRewardsState, getStepsState, getItemsState, getNpcsState, 
getQuestsState } from "@/store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { inter400, inter600 } from "@/styles/fonts";
import { useRouter } from "next/router";

export default function QuestInfoContainer() {
    const router = useRouter();
    const { asPath } = router;
    let toggledQuest: TypeQuest | undefined;
    let jobs: TypeJob[] = useSelector(getJobsState);
    let rewards: TypeReward[] = useSelector(getRewardsState);
    let steps: TypeStep[] = useSelector(getStepsState);
    let items: TypeItem[] = useSelector(getItemsState);
    let npcs: TypeNpc[] = useSelector(getNpcsState);
    let stepIndex: number = 0;
    let rewardLinesNumber: number = 0;
    let guaranteedRewardDetails: {
        theme: string,
        rewardItem: TypeItem | undefined,
    }[] = [];
    let optionalRewardDetails: {
        theme: string,
        rewardItem: TypeItem | undefined,
    }[] = [];
    let quests: TypeQuest[] = useSelector(getQuestsState);
    let questName: string;

    if (asPath.split('/')[1] === 'quest' && asPath.split('/').slice(-1)[0].split('+')[1]) {
        questName = asPath.split('/').slice(-1)[0].split('+')[1].split(/(?=[A-Z])/).join(' '); 
    }
    toggledQuest = quests.find((quest: TypeQuest) => quest.quest_name === questName);

    const createRewardGrid = ((lines: number, rewardItems: TypeItem[], rewardDetails: any[]) => {
        for (let i = 0; i < lines; i++) {
            let theme: string = '';
            let rewardDetail: {
                theme: string,
                rewardItem: TypeItem | undefined
            };

            if (i % 2 === 0) {
                theme = 'bg-questrewardbg1';
            } else {
                theme = 'bg-questrewardbg2';
            }

            if (i === lines - 1) {
                theme = theme + ' rounded-b-questinfo';
            }

            if (rewardItems[i] && rewardItems[i].item_quantity > 0) {
                rewardDetail = {
                    theme: theme,
                    rewardItem: rewardItems[i],
                } 
                
                rewardDetails.push(rewardDetail);
            } else {
                rewardDetail = {
                    theme: theme,
                    rewardItem: undefined,
                }
                rewardDetails.push(rewardDetail);
            }
        }
    })
    
    if (toggledQuest !== undefined) {
        let questClass: TypeJob | undefined;
        let questSteps: TypeStep[];
        let questReward: TypeReward | undefined;
        let guaranteedItems: TypeItem[] = [];
        let optionalItems: TypeItem[] = [];
        let questLvlIcon: string = toggledQuest.quest_level.toString();
        let questTypeIcon: string = toggledQuest.quest_type.split(' ').join('');
        let questClassIcon: string | undefined = '';
        
        if (questReward?.id !== null) {
            questReward = rewards.find((r: TypeReward) => r.id === toggledQuest?.quest_reward)
        }
        questSteps = steps.filter((s: TypeStep) => s.quest_step === toggledQuest?.id);
        questReward?.reward_items.map((ri: number) => {
            let rewardItem = items.find((item: TypeItem) => item.id === ri);
            if (rewardItem?.item_optional) {
                optionalItems.push(rewardItem);
            } else if (rewardItem?.item_optional === false) {
                guaranteedItems.push(rewardItem);
            }
        })

        if (guaranteedItems.length > optionalItems.length) {
            rewardLinesNumber = guaranteedItems.length;
        } else if (optionalItems.length >= guaranteedItems.length) {
            rewardLinesNumber = optionalItems.length;
        }

        createRewardGrid(rewardLinesNumber, guaranteedItems, guaranteedRewardDetails);
        createRewardGrid(rewardLinesNumber, optionalItems, optionalRewardDetails);
        
        return <div className="col-span-3 h-full text-center relative bg-cover bg-no-repeat
            bg-[url('/icons/quest_info_ui_components/QuestInfoComponentBg.jpg')]"
            style={{padding: 10}}>
            <div className={`bg-[url('/icons/quest_info_ui_components/QuestNameContainerBg.png')] 
                bg-contain bg-no-repeat flex items-center justify-center ${inter600.className} text-questinfoheader 
                text-questinfoheadercolor`} style={{height: 50}}>
                        {toggledQuest.quest_name}
            </div>
            <div className="bg-[url('/icons/quest_info_ui_components/QuestInfoContainerBg.jpg')] bg-cover bg-no-repeat
                h-questinfocontainer w-11/12 absolute left-5 rounded-b-questinfo overflow-auto" style={{paddingBottom: 50}}>
                <div className="grid grid-cols-10 gap-1" style={{paddingTop: 10, paddingBottom: 15}}>
                    <div className="col-span-1"></div>
                    <div className="relative col-span-1">
                        <Image src='/icons/quest_info_ui_components/LevelIcon.png' alt='Quest Level Container' 
                        width={50} height={50} className="object-cover"/>
                        <Image src={`/icons/quest_numbers/${questLvlIcon}.png`} alt='Quest Level Number' 
                        title={`Level ${questLvlIcon}`} width={25} height={25} className="absolute top-4 left-2"/>
                    </div>
                    <div className="col-span-1">
                        <Image src={`/icons/quest_type_icons/${questTypeIcon}.png`} alt='Quest Type' 
                        title={`${toggledQuest.quest_type} Quest`} width={50} height={50} />
                    </div>
                    {toggledQuest.quest_class.map((qc: number) => {
                        if (questClass?.id !== null) {
                            questClass = jobs.find((j: TypeJob) => j.id === qc)
                        }
                        questClassIcon = questClass?.job_name;
                        return <div className="col-span-1" key={qc}>
                            <Image src={`/icons/class_icons/${questClassIcon}.png`} alt='Quest Class' title={questClassIcon} 
                            width={50} height={50}/>
                        </div>
                    })}
                </div>
                <div className={`bg-queststepsbg rounded-questinfo w-11/12 relative left-5 ${inter400.className}
                text-queststepstext text-queststepstextsize text-left shadow-2xl`} 
                style={{paddingBottom: 10}}>
                    <Image src='/icons/quest_info_ui_components/QuestStepsContainerHeader.jpg' alt='Quest Steps Header' 
                    width={750} height={70} className="rounded-t-questinfo"/>
                    <div style={{padding: 10}}>
                        <ul>
                            {questSteps.map((step: TypeStep) => {
                                let stepNpcZone = npcs.find((npc: TypeNpc) => 
                                npc.id === step.step_npc)?.npc_zone.split('(')[0];
                                let zoneLink = stepNpcZone?.split(' ').filter((word: string) => word !== '').join('');
                                let stepNumber = '';
                                if (stepIndex === 0) {
                                    stepNumber = 'Start';
                                } else if (stepIndex === questSteps.length - 1) {
                                    stepNumber = 'Turn In'
                                } else {
                                    stepNumber = stepIndex.toString();
                                }
                                stepIndex++;
                                return <li key={step.step_description}>
                                    {`${stepNumber}. ${step.step_description} (`}
                                    <Link href={`/quest/${zoneLink}+${questName.split(' ').join('')}`} 
                                    className="text-blue-500 underline underline-offset-2">
                                        {stepNpcZone}
                                    </Link>
                                    {`)`}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div style={{height: 15}}></div>
                <div className="bg-queststepsbg rounded-questinfo w-11/12 relative left-5 shadow-2xl">
                    <Image src='/icons/quest_info_ui_components/RewardContainerHeader.jpg' alt='Quest Reward Header'
                    width={750} height={70} className="rounded-t-questinfo" />
                    <div className="grid grid-cols-2 gap-1" style={{padding: 10}}>
                            <div className="col-span-1 rounded-questinfo shadow-2xl">
                                <Image src='/icons/quest_info_ui_components/RewardGuaranteedHeader.jpg' 
                                alt='Guaranteed Reward Header' width={750} height={70} className="rounded-t-questinfo"/> 
                                <div>
                                    <ul>
                                        {guaranteedRewardDetails.map((rewardDetail: any) => {
                                            if (rewardDetail.rewardItem) {
                                                return <li className={rewardDetail.theme} 
                                                key={rewardDetail.rewardItem.item_name}>
                                                    <div className="grid grid-cols-4 gap-1 items-center" 
                                                    style={{padding: 5, height: 50}}>
                                                        <div className={`col-span-3 text-left text-questrewardtext 
                                                        text-questrewardtextsize ${inter400.className}`}>
                                                            {rewardDetail.rewardItem.item_name}
                                                        </div>
                                                        <div className={`col-span-1 text-right text-questrewardnumber
                                                        text-questrewardnumbersize ${inter400.className}
                                                        flew items-center`}>
                                                            {rewardDetail.rewardItem.item_quantity}
                                                        </div>
                                                    </div>
                                                </li>
                                            } else {
                                                return <li className={rewardDetail.theme} 
                                                key={Math.random()}>
                                                    <div style={{padding: 5, height: 50}}>
                                                        <br></br>
                                                    </div>
                                                </li>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-span-1 rounded-questinfo shadow-2xl">
                                <Image src='/icons/quest_info_ui_components/RewardOptionalHeader.jpg' 
                                alt='Optional Reward Header' width={750} height={70} className="rounded-t-questinfo"/>
                                <div>
                                    <ul>
                                        {optionalRewardDetails.map((rewardDetail: any) => {
                                            if (rewardDetail.rewardItem) {
                                                return <li className={rewardDetail.theme} 
                                                key={rewardDetail.rewardItem.item_name}>
                                                    <div className="grid grid-cols-4 gap-1 items-center" 
                                                    style={{padding: 5, height: 50}}>
                                                        <div className={`col-span-3 text-left text-questrewardtext 
                                                        text-questrewardtextsize ${inter400.className}`}>
                                                            {rewardDetail.rewardItem.item_name}
                                                        </div>
                                                        <div className={`col-span-1 text-right text-questrewardnumber
                                                        text-questrewardnumbersize ${inter400.className}
                                                        flew items-center`}>
                                                            {rewardDetail.rewardItem.item_quantity}
                                                        </div>
                                                    </div>
                                                </li>
                                            } else {
                                                return <li className={rewardDetail.theme} 
                                                key={Math.random()}>
                                                    <div style={{padding: 5, height: 50}}>
                                                        <br></br>
                                                    </div>
                                                </li>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div className="grid grid-cols-4">
                        <div className="col-span-1">
                            <div className="grid grid-cols-2" style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 20}}>
                                <Image  src='/icons/quest_info_ui_components/ExpIcon.png' alt='Experience' 
                                title='Experience' width={40} height={40} className="col-span-1"/>
                                <div className={`col-span-1 flex justify-center items-center text-questrewardtext 
                                ${inter600.className}`}>
                                        {questReward?.reward_experience}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="grid grid-cols-2" style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 20}}>
                                <Image  src='/icons/quest_info_ui_components/GilIcon.png' alt='Gil' 
                                title='Gil' width={40} height={40} className="col-span-1"/>
                                <div className={`col-span-1 flex justify-center items-center text-questrewardtext 
                                ${inter600.className}`}>
                                        {questReward?.reward_gil}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`text-left text-questrewardtext ${inter400.className}`} style={{padding: 10}}>
                        Other Reward: {questReward?.reward_other}
                    </div>
                </div>
                <div className="grid grid-cols-2" style={{padding: 10}}>
                    <div className="col-span-1 text-center">
                        <div className="grid-rows-2">
                            <div className={`row-span-1 text-questrewardtext ${inter600.className} text-previousquestsize`}>
                                Previous Quest
                            </div>
                            <div className={`row-span-1 text-blue-500 ${inter600.className} text-questrewardnumbersize
                            underline underline-offset-2`}>
                                {toggledQuest.previous_quest}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 text-center">
                        <div className="grid-rows-2">
                            <div className={`row-span-1 text-questrewardtext ${inter600.className} text-previousquestsize`}>
                                Next Quest
                            </div>
                            <div className={`row-span-1 text-blue-500 ${inter600.className} text-questrewardnumbersize
                            underline underline-offset-2`}>
                                {toggledQuest.next_quest}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else if (asPath.split('/')[1] === 'quest' && toggledQuest === undefined) {
        return <div className="bg-white text-black col-span-3 h-full">
            <h6>No quest by that name exists.</h6>
        </div>
    } else {
        return <div className="bg-white text-black col-span-3 h-full">
            <h6>No quest selected.</h6>
        </div>
    }
}