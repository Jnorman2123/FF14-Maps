import React from 'react';

interface ToggleContainerProps {
    title: string,
}

const ToggleContainer: React.FC<ToggleContainerProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default ToggleContainer