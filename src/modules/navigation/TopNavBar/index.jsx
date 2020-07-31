import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { logout } from 'reducers/auth';
import { Loading } from 'components';
import { BASE_THEME, DARK_THEME } from 'utils/themes';
import useDeviceDimensions from 'hooks/useDeviceDimensions';
import browserHistory from 'utils/browserHistory';
import { ReactComponent as PaletteIcon } from 'assets/icons/palette-24px.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-24px.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile-24px.svg';
import {
	StyledTopNav,
	TopNavExpand,
	TopNavGenres,
	TopNavInner,
	TopNavMenu,
	TopNavRow,
	TopNavSearch,
	TopNavTitle
} from './styles';


const TopNavBar = () => {
	const dispatch = useDispatch();
	const navRef = createRef();
	const { device, width } = useDeviceDimensions();
	
	const [navHeight, setNavHeight] = useState(0);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	
	const { themeName } = useSelector(({ themeReducer }) => ({
		themeName: themeReducer.themeName,
	}));
	const isDark = themeName === DARK_THEME;
	
	function handleScroll(){
		let lastScroll = 0;
		
		return () => {
			const scroll = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
			if (scroll > lastScroll){
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
			lastScroll = scroll <= 0 ? 0 : scroll; // For Mobile or negative scrolling
		}
	}
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll());
		return () => window.removeEventListener('scroll', handleScroll());
	}, [])
	
	useEffect(() => {
		if (navRef.current) {
			const { height } = navRef.current.getBoundingClientRect();
			setNavHeight(height);
		}
	}, [navRef]);
	
	const toggleTheme = () =>
		themeName === BASE_THEME
			? dispatch(setDarkTheme)
			: dispatch(setBaseTheme);
	
	const logOut = () => dispatch(logout());
	
	
	return (
		<>
			<StyledTopNav
				ref={navRef}
				className='top-nav'
				device={device}
				isExtended={isExpanded}
				isScrolled={isScrolled}
			>
				{!!device
					? (
						<TopNavInner>
							<TopNavRow>
								<TopNavMenu/>
								<TopNavTitle deviceWidth={width}/>
								<TopNavSearch/>
								<TopNavExpand
									onClick={() => setIsExpanded(isExtended => !isExtended)}
									isExpanded={isExpanded}
								/>
							</TopNavRow>
							<TopNavRow>
								<TopNavGenres/>
							</TopNavRow>
						</TopNavInner>
					)
					: <Loading/>
				}
			</StyledTopNav>
			{/*<DropDown*/}
			{/*	topOffset={navHeight}*/}
			{/*	items={[*/}
			{/*		{*/}
			{/*			name: isDark ? 'Base theme' : 'Dark theme',*/}
			{/*			onClick: toggleTheme,*/}
			{/*			icon: PaletteIcon,*/}
			{/*		},*/}
			{/*		{*/}
			{/*			name: 'profile',*/}
			{/*			onClick: () => browserHistory.push('/profile'),*/}
			{/*			icon: ProfileIcon,*/}
			{/*		},*/}
			{/*		{ name: 'logout', onClick: logOut, icon: LogoutIcon },*/}
			{/*	]}*/}
			{/*/>*/}
		</>
	);
};

export default TopNavBar;
