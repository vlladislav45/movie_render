import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseTheme, setDarkTheme } from 'reducers/themeReducer';
import { logout } from 'reducers/auth';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-24px.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile-24px.svg';
import { ReactComponent as BookmarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as NotInBookmarkIcon } from 'assets/icons/not_in_bookmark.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import MenuItem from './MenuItem';
import { MenuItems, MenuItemTitle } from './styles';
import { DrawerDivider } from '../styles';

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { isDark, bookmarks, isLoggedIn, selectedMovieInfo } = useSelector(
    ({
       themeReducer: { themeColors },
       bookmarksReducer: { bookmarks },
       auth: { isLoggedIn },
       moviesReducer: { selectedMovie: { movieInfo: selectedMovieInfo } },
     }) => ({
      isDark: themeColors.isDark,
      bookmarks,
      isLoggedIn,
      selectedMovieInfo,
    }))
  
  const shouldRenderCurrentMovie = React.useMemo(() => {
    if (!selectedMovieInfo.movieId || location.pathname.split('/')[1] !== 'movie') return false;
    // If it is not in the bookmarks
    return !bookmarks.some(bookmark => Number(bookmark.movieId) === Number(selectedMovieInfo.movieId))
  }, [selectedMovieInfo, location.pathname])
  

  const logOut = () => dispatch(logout());
  return (
    <>
      <MenuItems>
        <MenuItemTitle>Navigation</MenuItemTitle>
        <MenuItem
          name='Home'
          to='/'
          icon={HomeIcon}
          isActive={location.pathname === '/'}
        />
        {isLoggedIn && (
          <>
            <MenuItem
              name='Profile'
              to='/profile'
              isActive={location.pathname === '/profile'}
              icon={ProfileIcon}
            />
            <MenuItem
              name='Logout'
              onClick={logOut}
              icon={LogoutIcon}
            />
          </>
        )}
      </MenuItems>
      <DrawerDivider/>
      {isLoggedIn && (
        <MenuItems>
          <MenuItemTitle>Bookmarks</MenuItemTitle>
          {/* First item should be the current movie page */}
          {shouldRenderCurrentMovie && (
            <MenuItem
              autoFocus
              title='This movie is not added to your bookmarks'
              to={location.pathname}
              name={selectedMovieInfo.movieName}
              icon={NotInBookmarkIcon}
              isActive={true}
            />
          )}
          {bookmarks.map(bookmark => {
            return (
              <MenuItem
                key={bookmark.movieId}
                name={bookmark.movieName}
                to={`/movie/${bookmark.movieId}`}
                icon={BookmarkIcon}
                isActive={location.pathname === `/movie/${bookmark.movieId}`}
              />
            )
          })}
        </MenuItems>
      )}
    </>
  );
};

export default DrawerMenu;

