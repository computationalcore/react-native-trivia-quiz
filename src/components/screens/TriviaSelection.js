import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Font from 'expo-font';
import Button from '../Button';
import TriviaLoader from '../TriviaLoader';
import * as actions from '../../actions';
import { scale, moderateScale, verticalScale} from '../../Scaling';

const SELECT_FONT = require('../../../assets/fonts/BadaboomBB_Reg.ttf');

const DIFFICULTY_OPTIONS = ["Mixed", "Easy", "Medium", "Hard"];
const NUMBER_OF_QUESTIONS = ["10", "20", "30", "40", "50"];

/**
 * @description	Trivia setup page screen.
 * @constructor
 */
class TriviaSelection extends React.Component {

  constructor() {
    super()

    /**
		 * @typedef {Object} ComponentState
		 * @property {Object[]} fontLoaded - Indicates whether custom fonts already loaded.
		 */

		/** @type {ComponentState} */
    this.state = {
      selectedCategoryId: -1,
      selectedDifficulty: 0,
      selectedQuestion: 0,
      fontLoaded: false
    }		
  }

  async componentDidMount() {
    // Call the action to fetch quiz data.
    this.props.triviaCategoryFetch();

    await Font.loadAsync({
      'select-font': SELECT_FONT,
    });
    this.setState({ fontLoaded: true });
  }

  handleCategorySelect = (value) => {
    console.log(value);
    this.setState({ selectedCategoryId: value });
  }

  handleQuestionSelect = (index) => {
    console.log(index);
    this.setState({ selectedQuestion: index });
  }

  handleDifficultySelect = (index) => {
    this.setState({ selectedDifficulty: index });
  }

  handleStartGame = () => {
    const { selectedCategoryId, selectedDifficulty, selectedQuestion } = this.state;
    this.props.startGame(
      selectedCategoryId, 
      DIFFICULTY_OPTIONS[selectedDifficulty], 
      NUMBER_OF_QUESTIONS[selectedQuestion]
    );
  }

  render() {
    return (
      (this.state.fontLoaded) &&
      <TriviaLoader
        loading={this.props.loading}
        error={this.props.error}
        loadingText="Requesting Categories"
        onRetryPressed={() => this.props.startGameSelection()}
      >
        <View style={styles.container}>
          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitle}>Select Options</Text>
          </View>
          <View style={styles.Separator} />
          <Text style={styles.headerText}>Category</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{}}
            value={this.state.selectedCategoryId}
            items={this.props.categories}
            onValueChange={this.handleCategorySelect}
          />
          <View style={styles.Separator} />
          <Text style={styles.headerText}>Difficulty</Text>
          <SegmentedControlTab
            selectedIndex={this.state.selectedDifficulty}
            values={DIFFICULTY_OPTIONS}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            onTabPress={this.handleDifficultySelect}
          />
          <View style={styles.Separator} />
          <Text style={styles.headerText}>Number of Questions</Text>
          <SegmentedControlTab
            selectedIndex={this.state.selectedQuestion}
            values={NUMBER_OF_QUESTIONS}
            onTabPress={this.handleQuestionSelect}
          />
          <View style={styles.Separator} />
          <Button onPress={this.handleStartGame}>
            Start Quiz
            </Button>
        </View>
      </TriviaLoader>      
    );
  }
}

/* TriviaSelection StyleSheet */
const styles = StyleSheet.create({
  gameTitle: {
    fontFamily: 'select-font',
    color: '#000000',
    fontSize: moderateScale(60)
  },
  gameTitleContainer: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#FFFFFFDD',
    width: '100%',
    height: '100%'
  },
  parentContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  tabViewText: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: scale(50),
    fontSize: moderateScale(18),
  },
  titleText: {
    color: '#444444',
    padding: scale(20),
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  headerText: {
    fontFamily: 'select-font',
    padding: scale(8),
    fontSize: moderateScale(24),
    color: '#444444',
  },
  tabContent: {
    color: '#444444',
    fontSize: scale(18),
    margin: scale(24),
  },
  Separator: {
    marginHorizontal: scale(-10),
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    marginTop: scale(24),
  },
  tabStyle: {
    borderColor: '#D52C43',
    paddingHorizontal: scale(10),
  },
  activeTabStyle: {
    backgroundColor: '#D52C43',
  },
  tabTextStyle: {
    color: '#D52C43',
  },
});

/* RNPickerSelect StyleSheet */
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: scale(24),
      textAlign: 'center',
      fontWeight: "900",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = ({ trivia }) => {
  const { error, loading, categories } = trivia;

  return {
    error,
    loading,
    categories
  };
};

export default connect(mapStateToProps,
  actions
)(TriviaSelection);