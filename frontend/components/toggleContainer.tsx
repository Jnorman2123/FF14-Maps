import { getClassesState, updateClassByName } from "@/store/slices/dataStoreSlice";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest } from "@/types";
import { MouseEventHandler } from "react";

export default function ToggleContainer() {
    let classes: TypeClass[] = [];
    let quests: TypeQuest[] = [];
    const dispatch = useDispatch();

    const updateClass: MouseEventHandler<HTMLButtonElement> = () => {
        let m: TypeClass | undefined;
        if (m?.name !== null) {
            m = classes.find(c => c.name === 'Marauder');
        }
        if (m?.active) {
            dispatch(updateClassByName({name: 'Marauder', active: false}));
            return classes;
        } else {
            dispatch(updateClassByName({name: 'Marauder', active: true}));
            return classes;
        }
        
    }

    const setQuests = () => {
        const { data, error, isLoading } = useGetQuestsQuery('quests');
        if (isLoading) {
        return quests = [];
        } else {
        return quests = data
        }
    }

    setQuests();
    classes = useSelector(getClassesState);
    console.log(classes);

    return <div className="bg-gray-500 col-span-3 h-full">
        <button onClick={updateClass}>Update Class</button>
        {classes.map((c: TypeClass) => {
            return <span key={c.name}>{c.name}</span>
        })}
        hello
    </div>
}