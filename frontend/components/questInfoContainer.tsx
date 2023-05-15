import { TypeQuest, TypeJob, TypeReward, TypeItem, TypeStep, TypeNpc } from "@/types";
import { getToggledQuestState, getJobsState, getRewardsState, getStepsState, getItemsState, 
getNpcsState } from "@/store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function QuestInfoContainer() {
    let toggledQuest: TypeQuest[] = useSelector(getToggledQuestState);
    let jobs: TypeJob[] = useSelector(getJobsState);
    let rewards: TypeReward[] = useSelector(getRewardsState);
    let steps: TypeStep[] = useSelector(getStepsState);
    let items: TypeItem[] = useSelector(getItemsState);
    let npcs: TypeNpc[] = useSelector(getNpcsState);
    let stepIndex: number = 0;
    
    if (toggledQuest[0] !== undefined) {
        let questClass: TypeJob | undefined;
        let questSteps: TypeStep[];
        let questReward: TypeReward | undefined;
        let guaranteedItems: TypeItem[] = [];
        let optionalItems: TypeItem[] = [];
        let questLvlIcon: string = toggledQuest[0].quest_level.toString();
        let questTypeIcon: string = toggledQuest[0].quest_type.split(' ').join('');
        let questClassIcon: string | undefined = '';
        
        if (questReward?.id !== null) {
            questReward = rewards.find((r: TypeReward) => r.id === toggledQuest[0].quest_reward)
        }
        questSteps = steps.filter((s: TypeStep) => s.quest_step === toggledQuest[0].id);
        questReward?.reward_items.map((ri: number) => {
            let rewardItem = items.find((item: TypeItem) => item.id === ri);
            if (rewardItem?.item_optional) {
                optionalItems.push(rewardItem);
            } else if (rewardItem?.item_optional === false) {
                guaranteedItems.push(rewardItem);
            }
        })
        
        return <div className="col-span-3 h-full text-center relative
            bg-[url('/icons/quest_info_ui_components/QuestInfoComponentBg.jpg')] bg-cover bg-no-repeat "
            style={{padding: 10}}>
                <div className="bg-[url('/icons/quest_info_ui_components/QuestNameContainerBg.png')] 
                    bg-contain bg-no-repeat flex items-center justify-center" style={{height: 50}}>
                            {toggledQuest[0].quest_name}
                </div>
                <div className="bg-[url('/icons/quest_info_ui_components/QuestInfoContainerBg.jpg')] bg-cover bg-no-repeat
                    h-full w-11/12 absolute left-5 rounded-b-lg">
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
                            title={`${toggledQuest[0].quest_type} Quest`} width={50} height={50} />
                        </div>
                        {toggledQuest[0].quest_class.map((qc: number) => {
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
                    <div className="bg-gray-500 rounded-lg w-11/12 relative left-5">
                        <Image src='/icons/quest_info_ui_components/QuestStepsContainerHeader.jpg' alt='Quest Steps Header' 
                        width={750} height={70} className="rounded-t-lg w-full"/>
                        <ul>
                            {questSteps.map((step: TypeStep) => {
                                let stepNpcZone = npcs.find((npc: TypeNpc) => 
                                npc.id === step.step_npc)?.npc_zone.split(' ').slice(0, -1).join(' ');
                                let zoneLink = stepNpcZone?.split(' ').join('-');
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
                                    {`${stepNumber} - ${step.step_description} (`}
                                    <Link href={`/zone/${zoneLink}`} >{stepNpcZone}</Link>
                                    {`)`}
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            
            
            <h4>Quest Rewards</h4>
            <h6>Experience: {questReward?.reward_experience}</h6>
            <h6>Gil: {questReward?.reward_gil}</h6>
            <h4>Guaranteed Items</h4>
            <ul>
                {guaranteedItems.map((item: TypeItem) => {
                    if (item.item_quantity > 0) {
                        return <li key={item.id} >{item.item_name} {item.item_quantity}</li>
                    }
                })}
            </ul>
            <h4>Optional Items</h4>
            <ul>
                {optionalItems.map((item: TypeItem) => {
                    if (item.item_quantity > 0) {
                        return <li key={item.id} >{item.item_name} {item.item_quantity}</li>
                    }
                })}
            </ul>
            <h4>Other Reward(s)</h4>
            <h6>{questReward?.reward_other}</h6>
        </div>
    } else {
        return <div className="bg-white text-black col-span-3 h-full">
            <h6>Quest Info Container</h6>
        </div>
    }
}