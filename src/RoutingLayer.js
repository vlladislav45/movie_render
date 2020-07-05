import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Inner } from './baseStyles';
import { Loading } from './components';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const SingleMoviePage = React.lazy(() => import('pages/SingleMoviePage'));
// const Register = React.lazy(
//   () => import('modules/authentication/RegisterForm'));

// TODO: Route transitions
export default () => {
  const location = useLocation();

  return (
    <React.Suspense fallback={<Loading/>}>
      <Inner id='page'>
        {/*<TransitionGroup>*/}
        {/*  <CSSTransition*/}
        {/*    key={location.key}*/}
        {/*    classNames="fade"*/}
        {/*    timeout={1200}*/}
        {/*  >*/}
            <Switch>
              <Route exact path='/' component={MainPage}/>
              <Route path='/profile' component={ProfilePage}/>
              <Route path='/movie/:movieId' component={SingleMoviePage}/>
              {/*<Route path='/register' component={Register}/>*/}
            </Switch>
        {/*  </CSSTransition>*/}
        {/*</TransitionGroup>*/}
      </Inner>
      {/*TODO: Redirect not working properly*/}
      {/*<Redirect to={{ pathname: '/', search: browserHistory.location.search}} />*/}
    </React.Suspense>
  );
}
