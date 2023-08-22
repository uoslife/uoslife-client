import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, showDivider, leftContent, rightContent }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {showDivider && <View style={styles.divider} />}
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>{leftContent}</View>
        <View style={styles.rightContent}>{rightContent}</View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  
  card: {
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerText: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  leftContent: {
    flex: 1,
    paddingRight: 8,
  },
  rightContent: {
    flex: 1,
    paddingLeft: 8,
  },
});

export default Card;