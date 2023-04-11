//frontend/src/App.js
import React, { useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotsShow from './components/SpotsShow';
import SpotDetails from './components/SpotDetails';
import SpotForm from './components/SpotForm';
import SpotManagement from './components/SpotManagement';

function App() {
const dispatch = useDispatch();
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  dispatch(sessionActions.restoreUser()).then(()  => setIsLoaded(true));
}, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <SpotsShow isLoaded={isLoaded} />
          </Route>
          <Route path={`/spots/new`}>
            <SpotForm />
          </Route>
          <Route path='/spots/current'>
            < SpotManagement />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
    </>
  );
}
      

export default App;
