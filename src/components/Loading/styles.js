import styled from 'styled-components';

const cogWheel = require('../../assets/loading/loading-img.png');
export const LoadingOuter = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const LoadingInner = styled.div`
    position: absolute;
    z-index: 999;
    background: ${props => props.theme.disabled}66;
    min-width: 100px;
    min-height: 50px;
    width: 100%;
    height: 100%;
`;

export const CogWheel = styled.div`
    position: absolute;
    display: inline-block;
    top: 2px;
    background: url("${cogWheel}") no-repeat;
    background-size: contain;
    
    &.first {
        left: calc(47% - 50px);
        width: 50px;
        height: 50px;
        animation: spin 5s infinite;
        // animation-duration: 5s;
        animation-timing-function: linear;
    }
    
    &.second {
        left: calc((47% - 50px) + 47px);
        width: 40px;
        height: 40px;
        animation: spin-aclockwise 3s infinite;
        animation-duration: 3s;
        animation-timing-function: linear;
    }
    
    &.third {
        left: calc((47% - 50px) + 82px);
        width: 35px;
        height: 35px;
        animation: spin 3.5s infinite;
        animation-duration: 3.5s;
        animation-timing-function: linear;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    @keyframes spin-aclockwise {
        from {
            transform: rotate(-12 deg);
        }
        to {
            transform: rotate(-372deg);
        }
    }
`;
