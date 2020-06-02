import styled from 'styled-components';

export const StyledAuthButton = styled.a`
    cursor: pointer;
    position: relative;
    padding: 15px 30px;
    margin-top: 50px;
    color: ${({ background }) => background};
    text-transform: uppercase;
    letter-spacing: 4px;
    font-size: 24px;
    overflow: hidden;
    transition: 0.2s;

    &:hover {
        ${({ color, background }) => `
            color: ${color};
            background: ${background};
            box-shadow: 0 0 10px ${background}, 0 0 40px ${background}, 0 0 80px ${background};
            transition-delay: 1s;
        `}
    }

    & > span {
        position: absolute;
        display: block;
    }

    
    & > span:nth-child(1) {
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        ${({ background }) => `
            background: linear-gradient(90deg, transparent, ${background});
        `}
    }

    &:hover > span:nth-child(1) {
        left: 100%;
        transition: 1s;
    }

    & > span:nth-child(2) {
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        ${({ background }) => `
            background: linear-gradient(180deg, transparent, ${background});
        `}
    }
    
    &:hover span:nth-child(2) {
        top: 100%;
        transition: 1s;
        transition-delay: 0.25s;
    }
    
    & > span:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        ${({ background }) => `
            background: linear-gradient(90deg, transparent, ${background});
        `}
    }
    
    &:hover span:nth-child(3) {
        right: 100%;
        transition: 1s;
        transition-delay: 0.5s;
    }
    
    & > span:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        ${({ background }) => `
            background: linear-gradient(360deg, transparent, ${background});
        `}
    }
    
    &:hover > span:nth-child(4) {
        bottom: 100%;
        transition: 1s;
        transition-delay: 0.75s;
    }    
`;