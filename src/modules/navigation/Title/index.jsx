import React from 'react';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import browserHistory from 'utils/browserHistory';
import { StyledTitle } from './styles';

const Title = props => {
	const { device } = useDeviceDimensions('Title');
	return (
		<div {...props}>
			<StyledTitle
				device={device}
				onClick={() => browserHistory.push('/')}
			>
				Omega Twenty One
				{/*Гледайте онлайн филми*/}
			</StyledTitle>
		</div>
	);
};

export default Title;
