//frontend/src/App.js
import React, { useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SpotsShow from './components/SpotsShow';
import SpotDetails from './components/SpotDetails';


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
          <Route path="/spots/:spotId">
            <SpotDetails isLoaded={isLoaded} />
          </Route>
          <Route path="/">
          <SpotsShow isLoaded={isLoaded} />

          </Route>
        </Switch>
      )}
    </>
  );
}
      

export default App;
