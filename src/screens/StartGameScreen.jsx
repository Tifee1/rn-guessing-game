import React, { useState } from 'react'
import { Alert, Text, TextInput, View } from 'react-native'
import CustomButtons from '../components/CustomButtons'

const StartGameScreen = ({ setSelectedNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('')

  const handleReset = () => {
    setEnteredNumber('')
  }

  const handleSubmit = () => {
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: handleReset,
          },
        ]
      )
    } else {
      setSelectedNumber(chosenNumber)
    }
  }

  return (
    <View className='mt-[100px] gap-6 items-center'>
      <Text className='text-2xl font-extrabold text-white border-2 border-white p-4 text-center m-4 font-[open-sans-bold]'>
        Guess My Number 😎😎😎
      </Text>
      <View
        style={{ elevation: 4 }}
        className='bg-[#3b021f] mx-6 p-4 rounded-lg shadow-black shadow items-center'
      >
        <Text className='text-[#ddb52f] text-2xl font-[open-sans]'>
          Enter a number
        </Text>
        <TextInput
          className='w-[50px] h-[50px] text-[32px] text-center border-b-2 border-[#ddb52f] text-[#ddb52f] font-bold my-2'
          maxLength={2}
          keyboardType='number-pad'
          onChangeText={(e) => setEnteredNumber(e)}
          value={enteredNumber}
        />
        <View className='flex-row'>
          <View className='flex-1'>
            <CustomButtons onPress={() => setEnteredNumber('')}>
              Reset
            </CustomButtons>
          </View>
          <View className='flex-1'>
            <CustomButtons onPress={handleSubmit}>Confirm</CustomButtons>
          </View>
        </View>
      </View>
    </View>
  )
}

export default StartGameScreen
