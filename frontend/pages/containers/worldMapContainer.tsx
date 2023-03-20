import React from 'react';

interface WorldMapContainerProps {
    title: string,
}

const WorldMapContainer: React.FC<WorldMapContainerProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default WorldMapContainer