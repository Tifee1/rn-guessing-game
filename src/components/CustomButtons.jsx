import React from 'react'
import { Pressable, Text, View } from 'react-native'

const CustomButtons = ({ children, onPress }) => {
  const handlePress = () => {
    console.log('Pressed')
  }
  return (
    <View
      className='rounded-[28px] m-1 overflow-hidden'
      style={{ elevation: 2 }}
    >
      <Pressable
        onPress={onPress}
        // style={({ pressed }) => (pressed ? { opacity: 0.15 } : '')}
        className='bg-[#72063c] px-4 py-4 active:opacity-75'
        // android_ripple={{ color: '#640233' }}
      >
        <Text className='text-white text-center'>{children}</Text>
      </Pressable>
    </View>
  )
}

export default CustomButtons
