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
import EditSpotForm from './components/EditSpot';
import SpotReviews from './components/SpotReviews';

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
          <SpotsShow  />
          </Route>
          <Route path={`/spots/new`}>
            <SpotForm />
          </Route>
          <Route path='/spots/current'>
            < SpotManagement />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails  />
            < SpotReviews />
          </Route>
          <Route path="/spots/:spotId">
          </Route>
        </Switch>
      )}
    </>
  );
}
      

export default App;
