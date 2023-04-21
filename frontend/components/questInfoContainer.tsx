import { TypeQuest, TypeJob, TypeReward, TypeItem, TypeStep, TypeNpc } from "@/types";
import { getToggledQuestState, getJobsState, getRewardsState, getStepsState, getItemsState, 
getNpcsState } from "@/store/slices/dataStoreSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

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
        
        return <div className="bg-white text-black col-span-3 h-full text-center">
            <h1>Quest Info Container</h1>
            <h4>Quest Name</h4>
            <h6>{toggledQuest[0].quest_name}</h6>
            <h4>Quest Details</h4>
            <h6>Quest Class(es) Quest Type Quest Level</h6>
            <ul>
                {toggledQuest[0].quest_class.map((qc: number) => {
                    if (questClass?.id !== null) {
                        questClass = jobs.find((j: TypeJob) => j.id === qc)
                    }
                    return <li key={qc}>{questClass?.job_name}</li>
                })}
            </ul>
            <h6>{toggledQuest[0].quest_type}</h6>
            <h6>{toggledQuest[0].quest_level}</h6>
            <h4>Previous Quest: {toggledQuest[0].previous_quest}</h4>
            <h4>Next Quest: {toggledQuest[0].next_quest}</h4>
            <h4>Quest Steps</h4>
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