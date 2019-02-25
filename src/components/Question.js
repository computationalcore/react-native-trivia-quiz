import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import QuestionOptionItem from './QuestionOptionItem';
import { scale, moderateScale, verticalScale} from '../Scaling';

/**
 * This object is used for type checking the props of the component.
 */
const propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['boolean', 'multiple']).isRequired,
  difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * This object sets default values to the optional props.
 */
const defaultProps = {
  onItemSelected: () => { },
};

/**
 * @callback onItemSelected
 * @param {string} selected - Text of the option selected.
 */

/**
 * @description	Individual quiz question with options.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.category - The id of the book.
 * @param {string} props.type - The url of the book cover image.
 * @param {string} props.difficulty - The title of the book.
 * @param {boolean} props.question - Indicates whether the book is updating. Shows the loader layer if true.
 * @param {} props.onItemSelected - Executed when an option is selected.
*/
function Question(props) {
  return (
    <View style={styles.questionDataContainer}>

      <View style={styles.questionData}>

        <Text style={styles.questionDescription}>{props.question}</Text>

      </View>

      <FlatList
          style={styles.questionOptions}
          data={props.options}
          contentContainerStyle={styles.questionOptionsContainer}
          renderItem={({ item }) => (
            <QuestionOptionItem
              optionDescription={item}
              onPressItem={props.onItemSelected}
            />
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
          onPressItem={props.onItemSelected}
          scrollEnabled={true}
        />
    </View>
  );
}

/**
 * Question component StyleSheet.
 */
const styles = StyleSheet.create({
  questionDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(16),
    marginRight: scale(16),
  },

  questionData: {
    padding: scale(16),
    marginTop: scale(32),
    marginBottom: scale(32),
    alignSelf: 'stretch',
    maxHeight: verticalScale(280),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },

  questionDescription: {
    color: '#000',
    fontSize: moderateScale(20),
    textAlign: 'center',
  },

  questionOptions: {
    width: '100%',
  },
  questionOptionsContainer: {
    marginTop: 0,
  }
});

// Type checking the props of the component
Question.propTypes = propTypes;
// Assign default values to the optional props
Question.defaultProps = defaultProps;

export default Question;