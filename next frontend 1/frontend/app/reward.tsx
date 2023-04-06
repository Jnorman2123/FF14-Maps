import React from 'react';

type RewardProps = {
    rewards: object[]
}

const Reward: React.FC<RewardProps> = (props) => {
    return (
        <ul>
            {props.rewards.map((r: any) => {
                return <li key={r.reward_quest_name} >{r.reward_quest_name}</li>
            })}
        </ul>
    )
}

export default Reward