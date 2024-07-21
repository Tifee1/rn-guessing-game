import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { generateRandomBetween } from '../utils'
import CustomButtons from '../components/CustomButtons'
import GuessLogItem from '../components/GuessLogItem'
let min = 1
let max = 100

const GameScreen = ({ selectedNumber, setGameIsOver, setNumberOfRounds }) => {
  const initialGuess = generateRandomBetween(1, 100, selectedNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [rounds, setRounds] = useState([initialGuess])

  useEffect(() => {
    if (currentGuess === selectedNumber) {
      setGameIsOver(true)
      setNumberOfRounds(rounds.length)
    }
  }, [currentGuess, selectedNumber, setGameIsOver])
  useEffect(() => {
    min = 1
    max = 100
  }, [])

  const guessHandler = (type) => {
    if (
      (type === 'lower' && currentGuess < selectedNumber) ||
      (type === 'higher' && currentGuess > selectedNumber)
    ) {
      Alert.alert("Don't lie 😏😏😏!", 'You know this is wrong...', [
        {
          text: 'Sorry',
          style: 'cancel',
        },
      ])
      return
    }

    if (type === 'lower') {
      max = currentGuess
    } else {
      min = currentGuess + 1
    }
    const newGuess = generateRandomBetween(min, max, currentGuess)
    setCurrentGuess(newGuess)
    setRounds((prev) => [newGuess, ...prev])
  }

  return (
    <View className='flex-1 p-4 mt-4'>
      <Text className='text-2xl font-extrabold text-white border-2 border-white p-4 text-center font-[open-sans-bold]'>
        Opponent's Guess
      </Text>
      <View className='border-4 border-[#ddb525] p-6 m-6 rounded-[8px] justify-center items-center'>
        <Text className='text-[#ddb525] text-4xl font-[open-sans-bold]'>
          {currentGuess}
        </Text>
      </View>
      <View
        style={{ elevation: 4 }}
        className='bg-[#3b021f] mx-6 p-4 rounded-lg shadow-black shadow items-center gap-4'
      >
        <Text className='text-[#ddb52f] text-2xl font-[open-sans]'>
          Higher or lower?
        </Text>
        <View className='flex-row gap-4'>
          <View className='flex-1'>
            <CustomButtons onPress={() => guessHandler('higher')}>
              <Ionicons name='add' size={24} color='white' />
            </CustomButtons>
          </View>
          <View className='flex-1'>
            <CustomButtons onPress={() => guessHandler('lower')}>
              <Ionicons name='remove' size={24} color='white' />
            </CustomButtons>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={rounds}
          renderItem={(item) => {
            return (
              <GuessLogItem
                guess={item.item}
                roundNumber={rounds.length - item.index}
              />
            )
          }}
          keyExtractor={(_, i) => i}
        />
      </View>
    </View>
  )
}

export default GameScreen
