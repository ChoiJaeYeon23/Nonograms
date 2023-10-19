import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

// 셀 컴포넌트 정의
const NonogramCell = ({ isFilled, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.cell, isFilled ? styles.filled : null]} />
);

const GameScreen = ({ route }) => {
  const { gridSize } = route.params;
  const size = parseInt(gridSize.split('x')[0]);
  
  const [grid, setGrid] = useState(Array(size).fill(Array(size).fill(false))); 
  // 셀이 탭되었을 때의 처리
  const handleCellPress = (rowIndex, columnIndex) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[rowIndex][columnIndex] = !newGrid[rowIndex][columnIndex];
    setGrid(newGrid);
  };

  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <NonogramCell
              key={columnIndex}
              isFilled={cell}
              onPress={() => handleCellPress(rowIndex, columnIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 25,
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: 'black',
  },
});

export default GameScreen;