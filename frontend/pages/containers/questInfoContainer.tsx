import React from 'react';

interface QuestInfoContainerProps {
    title: string,
}

const QuestInfoContainer: React.FC<QuestInfoContainerProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default QuestInfoContainer