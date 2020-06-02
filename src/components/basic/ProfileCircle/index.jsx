import React, { useState } from 'react';
import { StyledProfileCircle, StyledContainer } from './styles';

const ProfileCircle = ({ size = 30, photoUrl, ...rest }) => {
    const [elevation, setElevation] = useState(rest.elevation || 10);
    const url = photoUrl || require('../../../assets/profile/blank-profile.png');

    console.log(elevation)
    return (
        <StyledContainer 
            onMouseEnter={() => setElevation(elevation + 4)}
            onMouseLeave={() => setElevation(elevation - 4)}
            elevation={elevation}
            {...rest}
        >
            <StyledProfileCircle
                size={50}
                url={url}
            />
        </StyledContainer>
    );
}

export default ProfileCircle;