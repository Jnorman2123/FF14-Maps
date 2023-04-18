import { useRouter } from 'next/router';
import { TypeNpc, TypeQuest, TypeQuestDetail, TypeStep } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { getNpcsState, getActiveQuestsState, getQuestIconBgColorsState, getStepsState, updateQuestDetails} from '@/store/slices/dataStoreSlice';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ZoneMap = () => {
    const router = useRouter();
    const { asPath } = router;
    let splitPathName: string = asPath.split('/').slice(-1)[0];
    let zoneName: string = splitPathName.split('-').filter((word: string) => word !== '-').join(' ');
    let npcs: TypeNpc[] = useSelector(getNpcsState).filter((npc: TypeNpc) => npc.npc_zone.includes(zoneName) && 
    npc.npc_type !== 'Aetheryte' && npc.npc_type !== 'Delivery Moogle' && !npc.npc_name.includes('Chocobokeep'));
    let npcIds: number[] = npcs.map((n: TypeNpc) => n.id);
    let activeQuests: TypeQuest[] = useSelector(getActiveQuestsState);
    let activeInZoneQuests: TypeQuest[] = [];
    let activeInZoneQuestIds: number[] = [];
    let questColors: string[] = useSelector(getQuestIconBgColorsState);
    let colorIndex: number = 0;
    let questDetailArray: TypeQuestDetail[] = [];
    let steps: TypeStep[] = useSelector(getStepsState);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateQuestDetails({questDetailsArray: questDetailArray}));
    }, [questDetailArray])

    const MapWithNoSSR = dynamic(() => import('../../components/ZoneMap'), { ssr: false });

    activeQuests.map((aq: TypeQuest) => {
        aq.quest_npcs.map(npc => {
            if (npcIds.includes(npc) && !activeInZoneQuests.includes(aq)) {
                activeInZoneQuests.push(aq);
                activeInZoneQuestIds = activeInZoneQuests.map((quest: TypeQuest) => quest.id);
            }
        })
    })

    activeInZoneQuests.map((activeQuest: TypeQuest) => {
        let questDetailObject: TypeQuestDetail | undefined = {
            questBgColor: '',
            questBgColorIcon: '',
            questTypeIcon: '',
            questSteps: {
                questStarter: {
                    starterIcon: '',
                    starterLocX: 0,
                    starterLocY: 0,
                    tooltipDetails: {
                        npcName: '',
                        questName: '',
                        stepDescription: ''
                    }
                },
                questNumberedSteps: [],
                questTurnIn: {
                    turnInIcon: '',
                    turnInLocX: 0,
                    turnInLocY: 0,
                    tooltipDetails: {
                        npcName: '',
                        questName: '',
                        stepDescription: ''
                    }
                }
            }
        };
        let starterNpc: TypeNpc | undefined;
        let starterStep: TypeStep | undefined;
        let stepNpc: TypeNpc | undefined;
        let numberedStepNpc: {
            stepIcon: string,
            stepLocX: number, 
            stepLocY: number,
            tooltipDetails: {
                npcName: string,
                questName: string,
                stepDescription: string
            }
        };
        let numberedStep: TypeStep | undefined;
        let turnInNpc: TypeNpc | undefined;
        let turnInStep: TypeStep | undefined;
        starterNpc = npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[0]);
        turnInNpc = npcs.find((npc: TypeNpc) => npc.id === activeQuest.quest_npcs[activeQuest.quest_npcs.length - 1]);
        {/* {npcs.map((npc: TypeNpc) => {
            let npcSteps: TypeStep[] = steps.filter((step: TypeStep) => 
            step.step_npc === npc.id && activeInZoneQuestIds.includes(step.quest_step));
            if (npcSteps.length > 0) {
                return npcSteps.map((step: TypeStep) => {
                    let stepQuest: TypeQuest | undefined;
                    if (stepQuest?.id !== null) {
                        stepQuest = activeInZoneQuests.find((quest: TypeQuest) => quest.id === step.quest_step)
                    }
                    if (stepQuest) {
                        return <div key={step.step_description}>
                            <h4>{npc.npc_name}</h4>
                            <h6>Quest Name: {stepQuest.quest_name}</h6>
                            <h6>Step Description: {step.step_description}</h6>
                            <div>---------------------------------------------</div>
                        </div>
                    }
                })
            }
        })} */}

        if (questDetailObject) {
            questDetailObject.questBgColor = questColors[colorIndex];
            questDetailObject.questBgColorIcon = `/icons/second_layer/${questColors[colorIndex]}Bg.png`;
            questDetailObject.questTypeIcon = `/icons/fourth_layer/${activeQuest.quest_type.split(' ').join('')}QuestIcon.png`;

            if (starterNpc) {
                starterStep = steps.find((step: TypeStep) => step.step_npc === starterNpc?.id 
                && activeQuest.id === step.quest_step);
                questDetailObject.questSteps.questStarter.starterIcon = 
                `/icons/cluster_icons/${activeQuest.quest_type.split(' ').join('')}StartIcon.png`;
                questDetailObject.questSteps.questStarter.starterLocX = parseFloat(starterNpc.npc_location_x);
                questDetailObject.questSteps.questStarter.starterLocY = parseFloat(starterNpc.npc_location_y);
                questDetailObject.questSteps.questStarter.tooltipDetails.npcName = starterNpc.npc_name;
                questDetailObject.questSteps.questStarter.tooltipDetails.questName = activeQuest.quest_name;
                if (starterStep) { 
                    questDetailObject.questSteps.questStarter.tooltipDetails.stepDescription = starterStep?.step_description;
                }
            }

            if (activeQuest.quest_npcs.slice(1,-1).length > 0) {
                let stepIndex: number = 1;
                activeQuest.quest_npcs.slice(1,-1).map((questNpc: number) => {
                    stepNpc = npcs.find((npc: TypeNpc) => npc.id === questNpc);
                    if (stepNpc) {
                        numberedStep = steps.find((step: TypeStep) => step.step_npc === stepNpc?.id 
                        && activeQuest.id === step.quest_step);
                        if (numberedStep) {
                            numberedStepNpc = {
                                stepIcon: `/icons/third_layer/Step${stepIndex}Icon.png`,
                                stepLocX: parseFloat(stepNpc.npc_location_x),
                                stepLocY: parseFloat(stepNpc.npc_location_y),
                                tooltipDetails: {
                                    npcName: stepNpc.npc_name,
                                    questName: activeQuest.quest_name,
                                    stepDescription: numberedStep?.step_description,
                                }
                            }
                        }
                    }
                    questDetailObject?.questSteps.questNumberedSteps.push(numberedStepNpc)
                    stepIndex ++;
                });
            }

            if (turnInNpc) {
                turnInStep = steps.find((step: TypeStep) => step.step_npc === turnInNpc?.id 
                && activeQuest.id === step.quest_step);
                questDetailObject.questSteps.questTurnIn.turnInIcon = 
                `/icons/clusterIcons/${activeQuest.quest_type.split(' ').join('')}TurninIcon.png`;
                questDetailObject.questSteps.questTurnIn.turnInLocX = parseFloat(turnInNpc.npc_location_x);
                questDetailObject.questSteps.questTurnIn.turnInLocY = parseFloat(turnInNpc.npc_location_y);
                questDetailObject.questSteps.questTurnIn.tooltipDetails.npcName = turnInNpc.npc_name;
                questDetailObject.questSteps.questTurnIn.tooltipDetails.questName = activeQuest.quest_name;
                if (turnInStep) {
                    questDetailObject.questSteps.questTurnIn.tooltipDetails.stepDescription = turnInStep.step_description;
                }
            }
        }

        if (colorIndex < questColors.length - 1) {
            colorIndex ++;
        } else {
            colorIndex = 0;
        }

        if (questDetailObject) {
            questDetailArray.push(questDetailObject);
        }
    })
    

    console.log(npcs)
    console.log(activeQuests)
    console.log(activeInZoneQuests)
    console.log(questDetailArray)
    

    return <div>
        <h1>Welcome to {zoneName} map!</h1>
        <div id='map'>
            <MapWithNoSSR />
        </div>
    </div>;
}

export default ZoneMap;