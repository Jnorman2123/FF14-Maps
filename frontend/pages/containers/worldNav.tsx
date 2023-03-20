import React from 'react';

interface WorldNavProps {
    title: string,
}

const WorldNav: React.FC<WorldNavProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default WorldNav