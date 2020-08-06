import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Inner } from './baseStyles';
import { Loading } from './components';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));

export default () => {
  return (
    <Inner>
      <React.Suspense fallback={<Loading/>}>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path='/profile' component={ProfilePage}/>
          <Route path='/movie/:movieId' component={SingleMoviePage}/>
          <Redirect to='/'/>
        </Switch>
      </React.Suspense>
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
