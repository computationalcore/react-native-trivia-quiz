import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import GameOver from './components/screens/GameOver';
import MainMenu from './components/screens/MainMenu';
import TriviaGame from './components/screens/TriviaGame';
import TriviaSelection from './components/screens/TriviaSelection';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main" hideNavBar={true}>
        <Scene key="mainMenu" component={MainMenu} initial />
        <Scene key="triviaSelection" component={TriviaSelection}  />
        <Scene key="triviaGame" component={TriviaGame} />
        <Scene key="gameOver" component={GameOver} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
