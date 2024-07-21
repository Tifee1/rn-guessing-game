import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButtons from '../components/CustomButtons'

const GameOverScreen = ({ selectedNumber, roundsNumber, startNewGame }) => {
  return (
    <View className='p-6 items-center justify-center'>
      <View>
        <Text className='text-2xl font-extrabold text-white border-2 border-white p-4 text-center m-4 font-[open-sans-bold]'>
          Game Over!!!
        </Text>
        <View className='w-[400px] h-[400px] border-[3px] border-[#4e0329] rounded-full overflow-hidden mx-auto my-9'>
          <Image
            source={require('../../assets/images/success.png')}
            className='w-full h-full object-cover'
          />
        </View>
        <Text className='font-[open-sans-bold] text-3xl text-center'>
          You needed <Text className='text-[#4e0329]'>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text className='text-[#4e0329]'>{selectedNumber}</Text>
        </Text>
        <View className='mt-4 items-center'>
          <CustomButtons onPress={startNewGame}>Start New Game</CustomButtons>
        </View>
      </View>
    </View>
  )
}

export default GameOverScreen
