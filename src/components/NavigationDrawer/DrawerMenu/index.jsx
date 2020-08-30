import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { logout } from 'reducers/auth';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-24px.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profile-24px.svg';
import { ReactComponent as BookmarkIcon } from 'assets/icons/bookmark.svg';
import { ReactComponent as SelectedMovieIcon } from 'assets/icons/selected_movie_icon.svg';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import MenuItem from './MenuItem';
import { MenuItems, MenuItemTitle } from './styles';
import { DrawerDivider } from '../styles';


const selector = createSelector(
  store => store.userReducer.bookmarks,
  store => store.auth.isLoggedIn,
  store => store.moviesReducer.selectedMovie.movieInfo.movieId,
  store => store.moviesReducer.selectedMovie.movieInfo.movieName,
  (bookmarks, isLoggedIn, selectedMovieId, selectedMovieName) => ({
    bookmarks, isLoggedIn, selectedMovieId, selectedMovieName
  })
);
const DrawerMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { bookmarks, isLoggedIn, selectedMovieId, selectedMovieName } = useSelector(selector)
  
  const shouldRenderCurrentMovie = React.useMemo(() => {
    if (!selectedMovieId || location.pathname.split('/')[1] !== 'movie') return false;
    // If it is not in the bookmarks
    return !bookmarks.some(bookmark => Number(bookmark.movieId) === Number(selectedMovieId))
  }, [selectedMovieId, location, isLoggedIn])
  
  function logOut() {
    dispatch(logout())
  }
  
  return (
    <>
      <MenuItems>
        <MenuItemTitle>Navigation</MenuItemTitle>
        {/* First item should be the current movie page */}
        {shouldRenderCurrentMovie && (
          <MenuItem
            autoFocus
            to={location.pathname}
            name={selectedMovieName}
            icon={SelectedMovieIcon}
            isActive={true}
          />
        )}
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
              to={location.pathname}
              icon={LogoutIcon}
            />
          </>
        )}
      </MenuItems>
      <DrawerDivider/>
      {isLoggedIn && (
        <MenuItems>
          <MenuItemTitle>Bookmarks</MenuItemTitle>
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

