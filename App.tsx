import 'react-native-gesture-handler'
import React from 'react'

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { useRef, useEffect, useState } from 'react'

import {
  AppRegistry,
  RefreshControl,
  ScrollView,
  StyleSheet,
  BackHandler,
  StatusBar,
} from 'react-native'
import WebView from 'react-native-webview'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View } from './components/Themed'
import useColorScheme from './hooks/useColorScheme'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

const App = () => {
  AppRegistry.registerComponent('Wikit', () => App)
  const colorScheme = useColorScheme()

  const webViewRef = useRef()
  const [refresh, setRefresh] = useState(false)

  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack()
    } catch (err) {
      console.log('[handleBackButtonPress] Error : ', err.message)
    }
    return true
  }
  const reload = () => {
    try {
      if (refresh) {
        webViewRef.current?.reload()
      }
    } catch (err) {
      console.log('[handleBackButtonPress] Error : ', err.message)
    }
    return true
  }

  const handleScroll = (event: any) => {
    const yOffset = Number(event.nativeEvent.contentOffset.y)
    if (yOffset < 10) {
      setRefresh(true)
    } else {
      setRefresh(false)
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress)
    }
  }, [])

  return (
    <SafeAreaProvider>
      <ExpoStatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
      <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
        <ScrollView
          style={styles.ScrollStyle}
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={false} enabled={refresh} onRefresh={reload} />
          }
        >
          <WebView
            cacheEnabled={true}
            style={styles.container}
            allowsBackForwardNavigationGestures={true}
            source={{ uri: 'https://wts2.wt.social' }}
            ref={webViewRef}
            onScroll={handleScroll}
          />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  )
}

export default gestureHandlerRootHOC(App)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  ScrollStyle: {
    backgroundColor: 'white',
    position: 'relative',
  },
})

