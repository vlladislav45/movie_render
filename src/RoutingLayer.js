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
const ErrorPage = React.lazy(() => import('pages/ErrorPage'));


export default () => (
  <Inner>
    <React.Suspense fallback={<Loading/>}>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route path='/profile' component={ProfilePage}/>
        <Route path='/movie/:movieId' component={SingleMoviePage}/>
        <Route path='/error' component={ErrorPage}/>
        <Redirect to='/'/>
      </Switch>
    </React.Suspense>
  </Inner>
);


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
