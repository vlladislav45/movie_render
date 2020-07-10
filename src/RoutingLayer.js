import React, { useEffect, useMemo, useRef } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Inner } from './baseStyles';
import { Loading } from './components';
// import MainPage from './pages/MainPage';
// import ProfilePage from './pages/ProfilePage';
// import SingleMoviePage from './pages/SingleMoviePage';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));

const styleObj = {
  width: '100%',
  height: '100%',
};
const relStyle = {
  ...styleObj,
  position: 'relative',
};
const absStyle = {
  ...styleObj,
  position: 'absolute',
};
export default () => {
  // TODO: Work with nodeRef to not use findDOMNode
  // const ref = useRef();
  const location = useLocation();

  useEffect(() => {
  }, [location]);


  return (
    <Inner>
      {/*<TransitionGroup>*/}
      {/*  <CSSTransition*/}
      {/*    // nodeRef={TODO}*/}
      {/*    timeout={300}*/}
      {/*    classNames='fade'*/}
      {/*    key={location.key}*/}
      {/*  >*/}
      {/*    <div key='wrapper' style={absStyle}>*/}
            <React.Suspense fallback={<Loading/>}>
              <Switch location={location}>
                <Route exact path='/' component={MainPage}/>
                <Route path='/profile' component={ProfilePage}/>
                <Route path='/movie/:movieId' component={SingleMoviePage}/>
                <Redirect to='/'/>
              </Switch>
            </React.Suspense>
          {/*</div>*/}
      {/*  </CSSTransition>*/}
      {/*</TransitionGroup>*/}
    </Inner>
  );
}

/*
 *
 *
 *
 *
const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));
 *
return (
    <React.Suspense fallback={<Loading/>}>
      <Inner id='page'>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path='/profile' component={ProfilePage}/>
          <Route path='/movie/:movieId' component={SingleMoviePage}/>
        </Switch>
      </Inner>
    </React.Suspense>
  );
 *
 *
 *
 */
