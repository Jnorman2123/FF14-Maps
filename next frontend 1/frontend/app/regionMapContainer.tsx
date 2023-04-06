import React from 'react';

interface RegionMapContainerProps {
    title: string,
}

const RegionMapContainer: React.FC<RegionMapContainerProps> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

export default RegionMapContainer