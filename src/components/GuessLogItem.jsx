import React from 'react'
import { Text, View } from 'react-native'

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View
      className='border border-[#4e0329] rounded-full p-3 bg-[#ddb52f] flex-row justify-between w-full shadow-black shadow-sm my-2'
      style={{ elevation: 4 }}
    >
      <Text className='font-[open-sans]'>#{roundNumber}</Text>
      <Text className='font-[open-sans]'>Opponent's Guess: {guess}</Text>
    </View>
  )
}

export default GuessLogItem
