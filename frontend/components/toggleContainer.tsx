import { getClassesState } from "@/store/slices/dataStoreSlice";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import { useSelector } from "react-redux";
import { TypeClass, TypeQuest } from "@/types";

export default function ToggleContainer() {
    let classes: TypeClass[] = [];
    let quests: TypeQuest[] = [];
    const setQuests = () => {
        const { data, error, isLoading } = useGetQuestsQuery('quests');
        if (isLoading) {
        return quests = [];
        } else {
        return quests = data
        }
    }
    setQuests();
    console.log(quests);
    classes = useSelector(getClassesState);
    console.log(classes);
    return <div className="bg-gray-500 col-span-3 h-full">
        {classes.map((c: TypeClass) => {
            return <span key={c.name}>{c.name}</span>
        })}
        hello
    </div>
}