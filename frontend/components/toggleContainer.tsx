import { getClassesState, getQuestTypesState, getQuestLevelsState, updateClassActiveByName, updateClassHoveredByName, 
updateQuestTypeActiveByName, updateQuestTypeHoveredByName, updateQuestLevelActiveByName, 
updateQuestLevelHoveredByName, updateActiveQuests, getActiveQuestsState, updateToggledQuest,
getQuestsState, getJobsState } from "@/store/slices/dataStoreSlice";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest, TypeQuestType, TypeQuestLevel, TypeJob } from "@/types";
import { MouseEventHandler, useState, useEffect } from "react";
import Image from "next/image";

export default function ToggleContainer() {
    const [clicked, setClicked] = useState<boolean>(false);
    const [dropdownQuests, setDropdownQuests] = useState<boolean>(false);
    let classes: TypeClass[] = [];
    let questTypes: TypeQuestType[] = [];
    let questLevels: TypeQuestLevel[] = [];
    let buttonIcon: string = '';
    let filteredByJobAndClassArray: TypeQuest[] = [];
    let activeQuestsArray: TypeQuest[] = [];
    let activeClasses: string[] = [];
    let activeQuestTypes: string[] = [];
    let activeQuestLevels: string[] = [];
    let activeJobs: number[] = [];
    let activeQuestLevelNumbers: [
        number[]
    ] = [[]];
    let activeQuests: TypeQuest[] = [];
    const dispatch = useDispatch();
    let quests: TypeQuest[] = useSelector(getQuestsState);
    let jobs: TypeJob[] = useSelector(getJobsState);

    useEffect(() => {
        dispatch(updateActiveQuests({activeQuestArray: activeQuestsArray}));
    }, [clicked])

    const updateClassActive: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        setClicked(!clicked);
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

    const updateQuestTypeActive: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        setClicked(!clicked);
        let questTypeObject: TypeQuestType | undefined;
        if (questTypeObject?.name !== null) {
            questTypeObject = questTypes.find(qt => qt.name === event.target.alt);
        }
        if (questTypeObject?.active) {
            dispatch(updateQuestTypeActiveByName({name: event.target.alt, active: false}));
            return questTypes;
        } else {
            dispatch(updateQuestTypeActiveByName({name: event.target.alt, active: true}));
            return questTypes;
        }
        
    }

    const updateQuestTypeHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let questTypeObject: TypeQuestType | undefined;
        if (questTypeObject?.name !== null) {
            questTypeObject = questTypes.find(qt => qt.name === event.target.alt);
        }
        if (!questTypeObject?.active) {
            dispatch(updateQuestTypeHoveredByName({name: event.target.alt, hovered: true}));
        }
        return questTypes;
    }

    const updateQuestTypeNotHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let questTypeObject: TypeQuestType | undefined;
        if (questTypeObject?.name !== null) {
            questTypeObject = questTypes.find(qt => qt.name === event.target.alt);
        }
        dispatch(updateQuestTypeHoveredByName({name: event.target.alt, hovered: false}));
        return questTypes;
    }

    const updateQuestLevelActive: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        setClicked(!clicked);
        let questLevelObject: TypeQuestLevel | undefined;
        if (questLevelObject?.name !== null) {
            questLevelObject = questLevels.find(ql => ql.name === event.target.alt);
        }
        if (questLevelObject?.active) {
            dispatch(updateQuestLevelActiveByName({name: event.target.alt, active: false}));
            return questLevels;
        } else {
            dispatch(updateQuestLevelActiveByName({name: event.target.alt, active: true}));
            return questLevels;
        }
        
    }

    const updateQuestLevelHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let questLevelObject: TypeQuestLevel | undefined;
        if (questLevelObject?.name !== null) {
            questLevelObject = questLevels.find(ql => ql.name === event.target.alt);
        }
        if (!questLevelObject?.active) {
            dispatch(updateQuestLevelHoveredByName({name: event.target.alt, hovered: true}));
        }
        return questLevels;
    }

    const updateQuestLevelNotHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let questLevelObject: TypeQuestLevel | undefined;
        if (questLevelObject?.name !== null) {
            questLevelObject = questLevels.find(ql => ql.name === event.target.alt);
        }
        dispatch(updateQuestLevelHoveredByName({name: event.target.alt, hovered: false}));
        return questLevels;
    }

    const toggleQuest: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let toggledQuestObject: TypeQuest | undefined;
        if (toggledQuestObject?.quest_name !== null) {
            toggledQuestObject = quests.find(q => q.quest_name === event.target.innerText)
        }
        
        dispatch(updateToggledQuest({tQuest: toggledQuestObject}));
    }

    const toggleDropdownQuests: MouseEventHandler<HTMLButtonElement> = () => {
        setDropdownQuests(!dropdownQuests);
        console.log(dropdownQuests);
    }

    const setAvailableQuestData = () => {
        if (dropdownQuests) {
            return <div className="h-availablequests overflow-auto w-11/12" style={{paddingLeft: 15}}>
                {activeQuests.map((aq: TypeQuest) => {
                    return <div key={aq.quest_name}>
                        <button onClick={toggleQuest}>{aq.quest_name}</button>
                    </div>
                })}
            </div>
        } else {
            return <div></div>
        }
    }


    classes = useSelector(getClassesState);
    questTypes = useSelector(getQuestTypesState);
    questLevels = useSelector(getQuestLevelsState);
    activeClasses = classes.filter((c: TypeClass) => c.active).map((ac: TypeClass) => ac.name);
    activeQuestTypes = questTypes.filter((qt: TypeQuestType) => qt.active).map((aqt: TypeQuestType) => aqt.name);
    activeQuestLevels = questLevels.filter((ql: TypeQuestLevel) => ql.active).map((aql: TypeQuestLevel) => aql.name);
    activeQuestLevels.map((aql: string) => {
        let splitAql: number[] = [];
        splitAql = aql.split('-').map((n: string) => parseInt(n))
        return activeQuestLevelNumbers.push(splitAql);
    })
    
    if (jobs !== undefined && jobs.length > 0) {
        activeJobs = jobs.filter((j: TypeJob) => activeClasses.includes(j.job_name)).map((aj: TypeJob) => aj.id);
    }

    
    if (quests !== undefined && quests.length > 0) {
        quests.map((q: TypeQuest) => {
            q.quest_class.map((qc: number) => {
                if ((activeJobs.includes(qc) || qc === 30) && activeQuestTypes.includes(q.quest_type.split(' ').join(''))) {
                    filteredByJobAndClassArray.push(q);
                } 
            })
        })
    }

    filteredByJobAndClassArray.map((aq: TypeQuest) => {
        activeQuestLevelNumbers.slice(1).map((aqln: number[]) => {
            if (aq.quest_level >= aqln[0] && aq.quest_level <= aqln[1] && !activeQuestsArray.includes(aq)) {
                activeQuestsArray.push(aq);
            }
            return activeQuestsArray;
        })
    })

    activeQuests = useSelector(getActiveQuestsState);

    return <div className="bg-gray-500 col-span-3 relative bg-[url('/icons/ui_components/ToggleContainerBg.jpg')] 
        bg-cover bg-no-repeat ju">
        <Image src={`/icons/ui_components/SelectClassHeader.jpg`} alt='Select Class Header' width={500} height={10} />
        <div className="grid grid-cols-5 gap-1 justify-items-center" style={{padding: 10}}>
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
                    onMouseEnter={updateClassHovered} onMouseLeave={updateClassNotHovered} >
                        <Image src={`/icons/class_icons/${buttonIcon}.png`} alt={c.name} width={45} height={45} />
                    </button>
                </div>
            })}
        </div>
        <Image src={`/icons/ui_components/SelectQuestHeader.jpg`} alt='Select Quest Header' width={500} height={10} />
        <div className="grid grid-cols-6 gap-1 justify-items-center" style={{padding: 10}}>
            <div></div>
            {questTypes.map((qt: TypeQuestType) => {
                if (qt.active) {
                    buttonIcon = `${qt.name}Active`;
                } else if (qt.hovered && !qt.active) {
                    buttonIcon = `${qt.name}Hover`;
                } else {
                    buttonIcon = `${qt.name}`;
                }
                return <div key={qt.name}>
                    <button name={qt.name} onClick={updateQuestTypeActive} 
                    onMouseEnter={updateQuestTypeHovered} onMouseLeave={updateQuestTypeNotHovered}>
                        <Image src={`/icons/quest_type_icons/${buttonIcon}.png`} alt={qt.name} width={45} height={45} />
                    </button>
                </div>
            })}
            <div></div>
        </div>
        <Image src={`/icons/ui_components/SelectLevelHeader.jpg`} alt='Select Level Header' width={500} height={10} />
        <div className="grid grid-cols-6 gap-1 justify-items-center" style={{padding: 10}}>
            {questLevels.map((ql: TypeQuestLevel) => {
                if (ql.active) {
                    buttonIcon = `${ql.name}Active`;
                } else if (ql.hovered && !ql.active) {
                    buttonIcon = `${ql.name}Hover`;
                } else {
                    buttonIcon = `${ql.name}`;
                }
                return <div key={ql.name}>
                    <button name={ql.name} onClick={updateQuestLevelActive} 
                    onMouseEnter={updateQuestLevelHovered} onMouseLeave={updateQuestLevelNotHovered}>
                        <Image src={`/icons/quest_level_icons/${buttonIcon}.png`} alt={ql.name} width={45} height={45} />
                    </button>
                </div>
            })}
        </div>
        <div className="items-start" style={{paddingLeft: 40, paddingTop: 10}}>
            <button className="bg-image bg-cover" onClick={toggleDropdownQuests}>
                <Image src='/icons/ui_components/AvailableQuestsHeader.jpg' alt='Available Quests Header' 
                width={400} height={10} style={{paddingBottom: 10}} />
            </button>
            {setAvailableQuestData()}
        </div>
    </div>
}