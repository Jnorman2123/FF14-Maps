import { getClassesState, updateClassActiveByName, updateClassHoveredByName } from "@/store/slices/dataStoreSlice";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest } from "@/types";
import { MouseEventHandler } from "react";

export default function ToggleContainer() {
    let classes: TypeClass[] = [];
    let quests: TypeQuest[] = [];
    let bgColor: string = '';
    const dispatch = useDispatch();

    const updateClassActive: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.name);
        }
        if (classObject?.active) {
            dispatch(updateClassActiveByName({name: event.target.name, active: false}));
            return classes;
        } else {
            dispatch(updateClassActiveByName({name: event.target.name, active: true}));
            return classes;
        }
        
    }

    const updateClassHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.name);
        }
        dispatch(updateClassHoveredByName({name: event.target.name, hovered: true}));
        return classes;
    }

    const updateClassNotHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.name);
        }
        dispatch(updateClassHoveredByName({name: event.target.name, hovered: false}));
        return classes;
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
            if (c.hovered) {
                bgColor = 'red';
            } else {
                bgColor = 'white';
            }
            return <div key={c.name}>
                <button className={`bg-${bgColor}`} name={c.name} onClick={updateClassActive} 
                onMouseEnter={updateClassHovered} onMouseLeave={updateClassNotHovered}>
                    {c.name}
                </button>
                <br></br>
            </div>
        })}
    </div>
}