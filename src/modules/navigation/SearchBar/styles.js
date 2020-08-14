import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/icons/search-24px.svg';
import { transitionDurations, transitionFunctions } from 'config/animationConstants';
import { Input } from 'components/basic';

const { deceleratedEasing, acceleratedEasing } = transitionFunctions;
const { mediumExpand, mediumCollapsing } = transitionDurations;
const INPUT_WIDTH = 200;
export const StyledSearchBar = styled.div`
	position: relative;
`;

export const ToggleButton = styled(SearchIcon)`
	position: absolute;
	width: 100%;
	height: 100%;
	cursor: pointer;
	z-index: 999;
	
	transition: transform ${mediumCollapsing}ms ${deceleratedEasing};
	${props => props.extendedstate === 1 && `
		transition: transform ${mediumExpand}ms ${acceleratedEasing};
		transform: translateX(-${INPUT_WIDTH}px);
	`};
`;


export const EXTEND_STATES = {
	INITIAL: 0,
	EXTENDED: 1,
	NOT_EXTENDED: 2,
}
//https://stackoverflow.com/a/50428572
const stateToAnimation = {
	[EXTEND_STATES.INITIAL]: 'none',
	[EXTEND_STATES.EXTENDED]: `extend ${mediumExpand}ms ${acceleratedEasing} forwards`,
	[EXTEND_STATES.NOT_EXTENDED]: `shrink ${mediumCollapsing}ms ${deceleratedEasing}`,
}
export const SearchInputContainer = styled.div`
	overflow: hidden;
	position: absolute;
	width: 0;
	left: -16px;
  top: -12px;
	
	animation: ${props => stateToAnimation[props.extendedstate]};

	@keyframes extend {
		from {
			transform: translateX(0);
		  width: 0;
		}
		to {
			transform: translateX(-${INPUT_WIDTH}px);
			width: 230px;
		}
	}
	
	@keyframes shrink {
		from {
			transform: translateX(-${INPUT_WIDTH}px);
			width: 230px;
		}
		to {
			transform: translateX(0);
		  width: 0;
		}
	}
`;

// Customize the input a bit
export const SearchInput = styled(Input)`
	& > div {
		height: 48px;
	}
`;
