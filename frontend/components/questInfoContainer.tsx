import { TypeQuest, TypeJob, TypeReward, TypeItem, TypeNpc, TypeStep } from "@/types";
import { getToggledQuestState } from "@/store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

interface QuestInfoContainerProps {
    quests: TypeQuest[];
    jobs: TypeJob[];
    rewards: TypeReward[];
    npcs: TypeNpc[];
    steps: TypeStep[];
    items: TypeItem[];
}

export default function QuestInfoContainer( {quests, jobs, rewards, npcs, steps, items}: QuestInfoContainerProps ) {
    let toggledQuest: TypeQuest[] = [];
    toggledQuest = useSelector(getToggledQuestState);
    if (toggledQuest[0] !== undefined) {
        let questClass: TypeJob | undefined;
        let questSteps: TypeStep[];
        let questReward: TypeReward | undefined;
        let guaranteedItems: TypeItem[] = [];
        let optionalItems: TypeItem[] = [];
        let stepIndex: number = 0;
        
        if (questReward?.id !== null) {
            questReward = rewards.find((r: TypeReward) => r.id === toggledQuest[0].quest_reward)
        }
        questSteps = steps.filter((s: TypeStep) => s.quest_step === toggledQuest[0].id)
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
            <h6>Start - {questSteps[0].step_description}</h6>
            {questSteps.slice(1, -1).map((qs: TypeStep) => {
                stepIndex ++;
                return <h6 key={qs.id} >{stepIndex} - {qs.step_description}</h6>
            })}
            <h6>Turn In - {questSteps[questSteps.length - 1].step_description}</h6>
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