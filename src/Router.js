import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import TriviaGame from './components/screens/TriviaGame';
import GameOver from './components/screens/GameOver';
import MainMenu from './components/screens/MainMenu';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main" hideNavBar={true} initial>
        <Scene key="mainMenu" component={MainMenu} />
        <Scene key="triviaGame" component={TriviaGame} />
        <Scene key="gameOver" component={GameOver} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
