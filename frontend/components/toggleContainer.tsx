import { getClassesState, updateClassByName } from "@/store/slices/dataStoreSlice";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest } from "@/types";
import { MouseEventHandler } from "react";

export default function ToggleContainer() {
    let classes: TypeClass[] = [];
    let quests: TypeQuest[] = [];
    let bgColor: string = '';
    const dispatch = useDispatch();

    const updateClass: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        console.log(event.target.name)
        let m: TypeClass | undefined;
        if (m?.name !== null) {
            m = classes.find(c => c.name === event.target.name);
        }
        if (m?.active) {
            dispatch(updateClassByName({name: event.target.name, active: false}));
            return classes;
        } else {
            dispatch(updateClassByName({name: event.target.name, active: true}));
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

    return <div className="bg-gray-500 col-span-3 h-full">
        {classes.map((c: TypeClass) => {
            if (c.active) {
                bgColor = 'black';
            } else {
                bgColor = 'white';
            }
            return <div key={c.name}>
                <button className={`bg-${bgColor}`} name={c.name} onClick={updateClass}>{c.name}</button>
                <br></br>
            </div>
        })}
    </div>
}