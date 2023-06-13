import { getClassesState, getQuestTypesState, getQuestLevelsState, updateClassActiveByName, updateClassHoveredByName, 
updateQuestTypeActiveByName, updateQuestTypeHoveredByName, updateQuestLevelActiveByName, 
updateQuestLevelHoveredByName, updateActiveQuests, getQuestsState, getJobsState, getQuestDetailsState, 
getNpcsState } from "@/store/slices/dataStoreSlice";
import { useSelector, useDispatch } from "react-redux";
import { TypeClass, TypeQuest, TypeQuestType, TypeQuestLevel, TypeJob, TypeQuestDetail, TypeNpc } from "@/types";
import { MouseEventHandler, useState, useEffect } from "react";
import Image from "next/image";
import { inter300 } from "@/styles/fonts";
import { useRouter } from "next/router";

export default function ToggleContainer() {
    const [clicked, setClicked] = useState<boolean>(false);
    const [dropdownQuests, setDropdownQuests] = useState<boolean>(false);
    const [hovered, setHovered] = useState<string>('');
    const [filteredQuests, setFilteredQuests] = useState<TypeQuest[]>([]);
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
    let activeQuestLevelNumbers: [number[]] = [[]];
    const dispatch = useDispatch();
    const router = useRouter();
    const { asPath } = router;
    let quests: TypeQuest[] = useSelector(getQuestsState);
    let jobs: TypeJob[] = useSelector(getJobsState);
    let npcs: TypeNpc[] = useSelector(getNpcsState);
    let questDetails: TypeQuestDetail[] = useSelector(getQuestDetailsState);
    let questName: string;
    let toggledQuest: TypeQuest | undefined;
    let availableQuestCollapseImage: string = '';

    if (asPath.split('/')[1] === 'quest' && asPath.split('/').slice(-1)[0].split('+')[1]) {
        questName = asPath.split('/').slice(-1)[0].split('+')[1].split(/(?=[A-Z])/).join(' '); 
    }
    toggledQuest = quests.find((quest: TypeQuest) => quest.quest_name === questName); 

    useEffect(() => {
        dispatch(updateActiveQuests({activeQuestArray: activeQuestsArray}));
    }, [clicked, filteredQuests])

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
        let toggledQuestStarter: TypeNpc | undefined;
        let toggledQuestZone: string = '';
        let questUrl: string = '';
        if (toggledQuestObject?.quest_name !== null) {
            toggledQuestObject = quests.find(q => q.quest_name === event.target.id);
            toggledQuestStarter = npcs.find((npc: TypeNpc) => npc.id === toggledQuestObject?.quest_npcs[0]);
            if (toggledQuestStarter) {
                toggledQuestZone = toggledQuestStarter?.npc_zone.split('(')[0].split(' ').join('');
            }
        }
        questUrl = event.target.id.split(' ').join('');
        router.push(`/quest/${toggledQuestZone}+${questUrl}`)
    }

    const toggleDropdownQuests: MouseEventHandler<HTMLButtonElement> = () => {
        setDropdownQuests(!dropdownQuests);
    }

    const updateHovered: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        setHovered(event.target.id);
    }

    const clearHovered: MouseEventHandler<HTMLButtonElement> = () => {
        setHovered('');
    }

    const deleteQuest: MouseEventHandler<HTMLButtonElement> = (event: any) => {
        let questName: string = event.target.id.split(' ').splice(1).join(' ');
        let filteredQuest: TypeQuest[] = activeQuestsArray.filter((q: TypeQuest) => q.quest_name === questName);
        setFilteredQuests([...filteredQuests, filteredQuest[0]]) ;
    }

    const refreshAvailableQuests: MouseEventHandler<HTMLButtonElement> = () => {
        setFilteredQuests([]);
    }

    const setAvailableQuestData = () => {
        let availableQuestsTheme: string = '';
        let refreshIcon: string = '';

        if (dropdownQuests) {
            availableQuestsTheme = 'h-hiddenavailablequests overflow-hidden w-full bg-lightbg text-accordiontext rounded-lg'
            + ` transition-height duration-250 ease-in-out ${inter300.className}`;
        } else {
            availableQuestsTheme = 'h-availablequests overflow-auto w-full bg-lightbg text-accordiontext rounded-lg'
            + ` transition-height duration-250 ease-in-out ${inter300.className}`;
        }

        if (hovered === 'Refresh Available Quests') {
            refreshIcon = '/icons/available_quest_icons/RefreshAvailableQuestListHover.png';
        } else {
            refreshIcon = '/icons/available_quest_icons/RefreshAvailableQuestList.png';
        }

        if (questDetails.length > 0) {
            return <div style={{paddingLeft: 15}}>
                <div className={availableQuestsTheme}>
                    <div className="bg-refreshbarbg rounded-lg grid grid-cols-10 gap-1">
                        <div className="col-span-2"></div>
                        <div className="col-span-6 text-center"></div>
                        <div className="col-span-2 text-center" style={{paddingTop: 5}}>
                            <button onMouseEnter={updateHovered} onMouseLeave={clearHovered} onClick={refreshAvailableQuests}>
                                <Image src={refreshIcon} alt='refresh available quests' title='Refresh Available Quests'
                                width={30} height={30} id='Refresh Available Quests'/>
                            </button>
                        </div>
                    </div>
                    {questDetails.map((aq: TypeQuestDetail) => {
                        let questIconType: string = '';
                        let questIconColor: string = aq.questBgColor;
                        let deleteQuestIcon: string = '/icons/available_quest_icons/DeleteQuest';

                        if (aq.quest.quest_type === 'Main Story') {
                            questIconType = 'main_story_icons';
                        } else if (aq.quest.quest_type === 'Class') {
                            questIconType = 'class_icons';
                        } else if (aq.quest.quest_type === 'Side') {
                            questIconType = 'side_icons';
                        } else {
                            questIconType = 'hunting_log_icons';
                        }

                        let questIconUrl: string = `/icons/available_quest_icons/${questIconType}/${questIconColor}`;

                        if (hovered === aq.quest.quest_name && toggledQuest !== aq.quest) {
                            questIconUrl = questIconUrl + 'Hover';
                        } else if (hovered === `Delete ${aq.quest.quest_name}`) {
                            deleteQuestIcon = deleteQuestIcon + 'Hover'
                        }

                        if (toggledQuest === aq.quest) {
                            questIconUrl = questIconUrl + 'Active';
                        }

                        return <div key={aq.quest.quest_name} style={{paddingLeft: 10}} className="grid grid-cols-10 gap-1">
                            <button className="col-span-1 text-center" style={{paddingTop: 5}} 
                            onClick={toggleQuest} id={aq.quest.quest_name} onMouseEnter={updateHovered} onMouseLeave={clearHovered}>
                                <Image src={`${questIconUrl}.png`} width={25} 
                                height={25} alt='quest icon' id={aq.quest.quest_name}
                                title={`Toggle ${aq.quest.quest_name}.`}/>
                            </button>
                            <button className="col-span-8 text-left" onClick={toggleQuest} id={aq.quest.quest_name}>
                                {aq.quest.quest_name}
                            </button>
                            <button className="col-span-1 text-center" onMouseEnter={updateHovered} onMouseLeave={clearHovered}
                            id={`Delete ${aq.quest.quest_name}`} onClick={deleteQuest} >
                                <Image src={`${deleteQuestIcon}.png`} width={30} height={30} alt='delete quest' 
                                id={`Delete ${aq.quest.quest_name}`} title={`Delete ${aq.quest.quest_name}.`} />
                            </button>
                        </div>
                    })}
                </div>
            </div>
        } else {
            let startMessage = null;
            let questTypeWarning = null;
            let questClassWarning = null;
            let questLevelWarning = null;
            let noQuestsWarning = null;

            if (activeClasses.length === 0 && activeQuestTypes.length === 0 && activeQuestLevels.length === 0) {
                startMessage = <div className="text-center">
                    Make Your Selections, Quester.
                </div>
            }
            if (activeQuestTypes.length !== 0) {
                if (activeQuestLevels.length === 0) {
                    questLevelWarning = <div className="text-center">
                        Select Your Level.
                    </div>;
                }
                if (questTypes[1].active && activeClasses.length === 0) {
                    questClassWarning = <div className="text-center"> 
                        Select Your Class.
                    </div>;
                }
            }
            if (activeQuestLevels.length !== 0) {
                if (activeQuestTypes.length === 0) {
                    if (activeClasses.length === 0) {
                        questClassWarning = <div className="text-center"> 
                            Select Your Class.
                        </div>;
                    }
                    questTypeWarning = <div className="text-center">
                        Select Your Quest.
                    </div>;
                }
                if (questTypes[0].active) {
                    noQuestsWarning = <div className="text-center"> 
                        No Quests Meet Your Criteria.
                    </div>;
                }
                if (questTypes[1].active && activeClasses.length === 0) {
                    questClassWarning = <div className="text-center"> 
                        Select Your Class.
                    </div>;
                }
                if (questTypes[3].active) {
                    noQuestsWarning = <div className="text-center"> 
                        No Quests Meet Your Criteria.
                    </div>;
                }
            }
            if (activeClasses.length !== 0) {
                if (activeQuestLevels.length === 0) {
                    questLevelWarning = <div className="text-center">
                        Select Your Level.
                    </div>;
                } 
                if (activeQuestTypes.length === 0) {
                    questTypeWarning = <div className="text-center">
                        Select Your Quest.
                    </div>;
                }
            }
            if (activeClasses.length !== 0 && activeQuestTypes.length !== 0 && activeQuestLevels.length !== 0) {
                noQuestsWarning = <div className="text-center">
                    No Quests Meet Your Criteria.
                </div>;
            }
            return <div style={{paddingLeft: 15, paddingRight: 15}}>
                <div className={availableQuestsTheme}>
                    <div className="bg-refreshbarbg rounded-lg grid grid-cols-10 gap-1">
                        <div className="col-span-8"></div>
                        <div className="col-span-2 text-center" style={{paddingTop: 5}}>
                            <button onMouseEnter={updateHovered} onMouseLeave={clearHovered} onClick={refreshAvailableQuests}>
                                <Image src={refreshIcon} alt='refresh available quests' title='Refresh Available Quests'
                                width={30} height={30} id='Refresh Available Quests'/>
                            </button>
                        </div>
                    </div>
                    <div style={{paddingTop: 125}} className="text-center">
                        {questClassWarning}
                        {questLevelWarning}
                        {startMessage}
                        {noQuestsWarning}
                        {questTypeWarning}
                    </div>
                </div>
            </div>
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
            if (aq.quest_level >= aqln[0] && aq.quest_level <= aqln[1] && !activeQuestsArray.includes(aq)
            && !filteredQuests.includes(aq)) {
                activeQuestsArray.push(aq);
            }
            return activeQuestsArray;
        })
    })

    if (dropdownQuests) {
        availableQuestCollapseImage = '/icons/ui_components/Expand.png';
    } else {
        availableQuestCollapseImage = '/icons/ui_components/Collapse.png';
    }

    return <div className="bg-gray-500 col-span-3 relative bg-[url('/icons/ui_components/ToggleContainerBg.jpg')] 
        bg-cover bg-no-repeat">
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
                    onMouseEnter={updateClassHovered} onMouseLeave={updateClassNotHovered}>
                        <Image src={`/icons/class_icons/${buttonIcon}.png`} alt={c.name} width={45} height={45} 
                        title={c.name} />
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
                        <Image src={`/icons/quest_type_icons/${buttonIcon}.png`} alt={qt.name} width={45} height={45} 
                        title={qt.name} />
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
                        <Image src={`/icons/quest_level_icons/${buttonIcon}.png`} alt={ql.name} width={45} height={45} 
                        title={ql.name} />
                    </button>
                </div>
            })}
        </div>
        <div className="items-start" style={{paddingLeft: 30, paddingTop: 10, paddingRight: 30}}>
            <button className="relative" onClick={toggleDropdownQuests}>
                <Image src='/icons/ui_components/AvailableQuestsHeader.jpg' alt='Available Quests Header' 
                width={400} height={10} className="w-full h-full object-cover"/>
                <Image src={availableQuestCollapseImage} alt='Available Quests Header' 
                width={35} height={35} className="absolute top-3 right-5"/>
            </button>
            {setAvailableQuestData()}
        </div>
    </div>
}