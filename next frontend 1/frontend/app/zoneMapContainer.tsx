import React from 'react';

interface ZoneMapContainerProps {
    title: string,
}

const ZoneMapContainer: React.FC<ZoneMapContainerProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default ZoneMapContainer