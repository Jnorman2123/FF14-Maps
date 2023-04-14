import { TypeQuest } from "@/types";
import { getActiveQuestsState } from "@/store/slices/dataStoreSlice";
import { useSelector } from "react-redux";

export default function QuestInfoContainer() {
    let activeQuests: TypeQuest[] = [];
    activeQuests = useSelector(getActiveQuestsState);
    // console.log(activeQuests)

    return <div className="bg-white text-black col-span-3 h-full">Quest Info Container</div>
}