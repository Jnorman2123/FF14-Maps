import React, { PropsWithChildren } from 'react';
import WorldNav from '../containers/worldNav';
import QuestInfoContainer from '../containers/questInfoContainer';
import ToggleContainer from '../containers/toggleContainer';
import { getQuestIconBgColorsState, getClassesState, getQuestTypesState, getQuestLevelsState, updateClass, updateQuestType,
updateQuestLevel } from '@/store/slices/dataStoreSlice';
import { useGetQuestsQuery, useGetRewardsQuery, useGetItemsQuery, useGetJobsQuery, useGetNpcsQuery, 
useGetStepsQuery } from "@/store/services/helperquest";
import type { TypeQuest, TypeReward, TypeNpc, TypeItem,  TypeJob, TypeStep } from "./types";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const Layout = ({children}: PropsWithChildren) => {

    const [questId, setQuestId] = useState(null);
    const [navigate, setNavigate] = useState(false);
    const [navigateLink, setNavigateLink] = useState('');
    const [toggledQuests, setToggledQuests] = useState<any>([]);
    const [activeQuests, setActiveQuests] = useState<any>([]);

    let quests: TypeQuest[] = [];
    let rewards: TypeReward[] = [];
    let npcs: TypeNpc[] = [];
    let items: TypeItem[] = [];
    let jobs: TypeJob[] = [];
    let steps: TypeStep[] = [];

    const setQuests = () => {
        const { data, error, isLoading } = useGetQuestsQuery('quests');
        if (isLoading) {
        return quests = [];
        } else {
        return quests = data
        }
    }

    const setRewards = () => {
        const { data, error, isLoading } = useGetRewardsQuery('rewards');
        if (isLoading) {
        return rewards = [];
        } else {
        return rewards = data
        }
    }

    const setNpcs = () => {
        const { data, error, isLoading } = useGetNpcsQuery('npcs');
        if (isLoading) {
        return npcs = [];
        } else {
        return npcs = data
        }
    }

    const setItems = () => {
        const { data, error, isLoading } = useGetItemsQuery('items');
        if (isLoading) {
        return items = [];
        } else {
        return items = data
        }
    }

    const setSteps = () => {
        const { data, error, isLoading } = useGetStepsQuery('steps');
        if (isLoading) {
        return steps = [];
        } else {
        return steps = data
        }
    }

    const setJobs = () => {
        const { data, error, isLoading } = useGetJobsQuery('jobs');
        if (isLoading) {
        return jobs = [];
        } else {
        return jobs = data
        }
    }

    const revertLat = (x: number, y: number) => {
        return [-y, x];
    } 

    const setNewQuestId = (e: any) => {
        console.log(e)
        // setQuestId(Object.entries(e.target)[1][1].quest_id);
    }

    const setNewActiveQuests = () => {
        let bgColors = useSelector(getQuestIconBgColorsState);
        let activeClasses = useSelector(getClassesState).filter((c: any) => c.active === true).map((c: any) => c.name);
        let activeQuestTypes = useSelector(getQuestTypesState).filter((qt: any) => qt.active === true).map((qt: any) => qt.name);
        let activeQuestLevels = useSelector(getQuestLevelsState).filter((ql: any) => ql.active === true).map((ql: any) => {
          let lvlRanges = ql.name.split('-');
            return [parseInt(lvlRanges[0]), parseInt(lvlRanges[1])]
        });
        let activeJobs = jobs.filter((j: any) => activeClasses.includes(j.job_name)).map((j: any) => j.id);
        let activeQuestsArray: TypeQuest[] = [];
        let i = 0;
        if (quests.length !== 0) {
          quests.map((q: any) => {
            let questType = q.quest_type.split(' ').join('');
            if (activeQuestTypes.includes(questType)) {
                q.quest_class.map((qc: any) => {
                    if (activeJobs.includes(qc) || qc === 30) {
                        activeQuestLevels.map((ql: any) => {
                            if (q.quest_level >= ql[0] && q.quest_level <= ql[1]
                            && !activeQuestsArray.includes(q)) {
                                q.bg_color = bgColors[i];
                                activeQuestsArray.push(q);
                                i ++;
                                if (i >= bgColors.length) {
                                  i = 0;
                                }
                            }
                            return ql;
                        })
                    }
                    return qc;
                })
            }
            return q;
          });
        }
        setActiveQuests(activeQuestsArray);
    }

    const setClassActive = (event: any) => {
        let className = event.target.name;
        let col = useSelector(getClassesState);
        col.map((c: any) => {
            if (c.name === className) {
              c.active = !c.active;
              updateClass(c);
            }
            return c.active
        })
        setNewActiveQuests();
    }

    const setTypeActive = (event: any) => {
        let typeName = event.target.name;
        let col = useSelector(getQuestTypesState);
        col.map((c: any) => {
            if (c.name === typeName) {
              c.active = !c.active;
              updateQuestType(c);
            }
            return c.active
        })
        setNewActiveQuests();
    }

    const setLevelActive = (event: any) => {
        let levelName = event.target.name;
        let col = useSelector(getQuestLevelsState);
        col.map((c: any) => {
            if (c.name === levelName) {
              c.active = !c.active;
              updateQuestLevel(c);
            }
            return c.active
        })
        setNewActiveQuests();
    }

    const toggleQuest = (quest: any, questCol: any) => {
        let toggledQuestsArray: TypeQuest[] = [];
        if (!toggledQuestsArray.includes(quest) && questCol.includes(quest)) {
            toggledQuestsArray.push(quest);
            setToggledQuests(toggledQuestsArray)
        } else {
            toggledQuestsArray.filter((q: any) => q !== quest);
            setToggledQuests(toggledQuestsArray)
        }
    }

    const deleteQuest = (quest: any, questCol: any) => {
        setActiveQuests(questCol.filter((q: any) => q !== quest))
    }

    setQuests();
    setRewards();
    setSteps();
    setNpcs();
    setItems();
    setJobs();
    console.log(useSelector(getClassesState));

    const setQuestType = (quests: any, type: any) => {
        return quests.filter((q: any) => q.quest_type === type)
    }
  
    const setQuestStarters = (type: any) => {
        let quests = setQuestType(activeQuests, type).map((aq: any) => {
            let starterNpc = npcs.filter((npc: any) => npc.id === aq.quest_npcs[0]);
            return starterNpc[0];
        });
        return quests;
    }
  
    const setStartersLength = (starters: any, area: any) => {
        return starters.filter((q: any) => q.npc_zone.includes(area)).length
    }

    let quest_starters = {
        class_starters: setQuestStarters('Class'),
        main_starters: setQuestStarters('Main Story'),
        hunting_starters: setQuestStarters('Hunting Log'),
        side_starters: setQuestStarters('Side')
    };

    let WorldMapContainer = dynamic(
        () => import('../containers/worldMapContainer'),
        { ssr: false }
    )
  
    let RegionMapContainer = dynamic(
        () => import('../containers/regionMapContainer'),
        { ssr: false }
    )
  
    let ZoneMapContainer = dynamic(
        () => import('../containers/zoneMapContainer'),
        { ssr: false }
    )
  

    if (quests.length < 1) {
        return <div>Loading...</div>
      } else {
        return (
            <>
                <Row>
                    <WorldNav />
                </Row>
                <Row>
                    <Col>
                        <ToggleContainer title='Toggle Container' />
                    </Col>
                    <Col>
                        <main>{children}</main>
                    </Col>
                    <Col>
                        <QuestInfoContainer title='Quest Info Container' />
                    </Col>
                </Row>
            </>
        )
      }
}

export default Layout