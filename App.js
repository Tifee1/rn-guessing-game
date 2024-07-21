import { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import './src/global.css'
import StartGameScreen from './src/screens/StartGameScreen'
import GameScreen from './src/screens/GameScreen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import GameOverScreen from './src/screens/GameOverScreen'

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(0)
  const [gameIsOver, setGameIsOver] = useState(false)
  const [numberOfRounds, setNumberOfRounds] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const startNewGame = () => {
    setSelectedNumber(0)
    setNumberOfRounds(0)
    setGameIsOver(false)
  }

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  async function prepare() {
    try {
      await SplashScreen.preventAutoHideAsync()
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (e) {
      console.warn(e)
    } finally {
      if (fontsLoaded) {
        setIsReady(true)
      }
    }
  }

  useEffect(() => {
    prepare()
  }, [fontsLoaded])

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  let screen = <StartGameScreen setSelectedNumber={setSelectedNumber} />

  if (selectedNumber) {
    screen = (
      <GameScreen
        selectedNumber={selectedNumber}
        setGameIsOver={setGameIsOver}
        setNumberOfRounds={setNumberOfRounds}
      />
    )
  }
  if (gameIsOver && selectedNumber) {
    screen = (
      <GameOverScreen
        selectedNumber={selectedNumber}
        roundsNumber={numberOfRounds}
        startNewGame={startNewGame}
      />
    )
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <LinearGradient colors={['#4e0329', '#ddb52f']} style={{ flex: 1 }}>
          <ImageBackground
            source={require('./assets/images/background.png')}
            resizeMode='cover'
            className='flex-1'
            imageStyle={{ opacity: 0.15 }}
          >
            <SafeAreaView style={{ flex: 1 }}>{screen}</SafeAreaView>
          </ImageBackground>
        </LinearGradient>
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
