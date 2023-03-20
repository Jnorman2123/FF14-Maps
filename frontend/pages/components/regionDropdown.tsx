import React from 'react';

interface RegionDropdownProps {
    region: string,
    renderDropdowns: (region: string) => void,
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({renderDropdowns, region}) => {
    return (
        <>
        {renderDropdowns(region)}
        </>
    )
}

export default RegionDropdown;