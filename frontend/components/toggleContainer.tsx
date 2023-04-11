import { getClassesState, updateClassActiveByName, updateClassHoveredByName } from "@/store/slices/dataStoreSlice";
import { useGetQuestsQuery } from "@/store/services/helperquest";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest } from "@/types";
import { MouseEventHandler } from "react";
import Image from "next/image";

export default function ToggleContainer() {
    let classes: TypeClass[] = [];
    let quests: TypeQuest[] = [];
    let buttonIcon: string = '';
    const dispatch = useDispatch();

    const updateClassActive: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.alt);
        }
        if (classObject?.active) {
            dispatch(updateClassActiveByName({name: event.target.alt, active: false}));
            return classes;
        } else {
            dispatch(updateClassActiveByName({name: event.target.alt, active: true}));
            return classes;
        }
        
    }

    const updateClassHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.alt);
        }
        if (!classObject?.active) {
            dispatch(updateClassHoveredByName({name: event.target.alt, hovered: true}));
        }
        return classes;
    }

    const updateClassNotHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let classObject: TypeClass | undefined;
        if (classObject?.name !== null) {
            classObject = classes.find(c => c.name === event.target.alt);
        }
        dispatch(updateClassHoveredByName({name: event.target.alt, hovered: false}));
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
                buttonIcon = `${c.name}Active`;
            } else if (c.hovered && !c.active) {
                buttonIcon = `${c.name}Hover`;
            } else {
                buttonIcon = `${c.name}`;
            }
            return <div key={c.name}>
                <button name={c.name} onClick={updateClassActive} 
                onMouseEnter={updateClassHovered} onMouseLeave={updateClassNotHovered}>
                    <Image src={`/icons/class_icons/${buttonIcon}.png`} alt={c.name} width={30} height={30} />
                </button>
                <br></br>
            </div>
        })}
    </div>
}