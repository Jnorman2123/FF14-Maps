import React from 'react';

type QuestProps = {
    quests: object[]
}

const Quest: React.FC<QuestProps> = (props) => {
    return (
        <ul>
            {props.quests.map((q: any) => {
                return <li key={q.quest_name} >{q.quest_name}</li>
            })}
        </ul>
    )
}

export default Quest