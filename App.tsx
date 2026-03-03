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
  Platform,
  ActivityIndicator,
} from 'react-native'
import WebView, { WebViewNavigation } from 'react-native-webview'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { View } from './components/Themed'
import useColorScheme from './hooks/useColorScheme'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import useCachedResources from './hooks/useCachedResources'

const App = () => {
  const isLoadingComplete = useCachedResources()
  AppRegistry.registerComponent('Wikit', () => App)
  const colorScheme = useColorScheme()

  const webViewRef = useRef()
  const [refresh, setRefresh] = useState(true)
  const [navUri, setNavUri] = React.useState('https://www.trustcafe.io')

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
      BackHandler.exitApp()
    }
  }, [])

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (Platform.OS === 'android') {
      return
    }
    if (navState.url.endsWith("/welcome")) { 
      setNavUri("https://www.trustcafe.io/")
    }
    if (navState.url.endsWith("/membership")) { 
      console.log("redirecting", "membership")
      setNavUri("https://www.trustcafe.io/")
    }
  }

  const myRule = () => {
    var support = `document.querySelector(\"[aria-label='Support Trust Café']\").style = 'display: none;';`;
    var android = "";
    if (Platform.OS === 'android') {
      support = "";
      android = "clearTimeout(window.apple);";
    }
    return support + `
    var logos = document.querySelectorAll(\"[alt='Trust Cafe Logo']\");
    logos.forEach(p => {if (p.src.indexOf('white') > 0) {p.src = 'https://lucid-code.com/Images/wikit-white.png';} else {p.src = 'https://lucid-code.com/Images/wikit-dark.png';}});
    clearTimeout(window.id);
    `
    + android +
    `
    true;
    `
  }

  const initialRule = () => {
    if (Platform.OS === 'android') {
      //return ""
    }
    return `
    window.id = setInterval(() => {
      var logos = document.querySelectorAll(\"[alt='Trust Cafe Logo']\");
      logos.forEach(p => {if (p.src.indexOf('white') > 0) {p.src = 'https://lucid-code.com/Images/wikit-white.png';} else {p.src = 'https://lucid-code.com/Images/wikit-dark.png';}});
    }, 16);
    
    window.apple = setInterval(() => {
      document.querySelector(\"[aria-label='Support Trust Café']\").style = 'display: none;';
    }, 1024);
    true;
    `
  }

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ExpoStatusBar style={colorScheme == 'light' ? 'dark' : 'light'} />
          <ScrollView
            style={styles.ScrollStyle}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={false} enabled={refresh} onRefresh={reload} />
            }
          >
            <WebView
              startInLoadingState={true}
              
              renderLoading={() => <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                    backgroundColor: colorScheme == 'light' ? 'white' : 'black',
                }}
                >
                  <ActivityIndicator size="large" color={colorScheme == 'light' ? 'white' : 'black'} />
                </View>}
              cacheEnabled={true}
              style={styles.container}
              allowsBackForwardNavigationGestures={true}
              source={{ uri: navUri }}
              ref={webViewRef}
              onScroll={handleScroll}     
              javaScriptEnabled={true}        
              onNavigationStateChange={handleNavigationStateChange}
              injectedJavaScript={'function injectRules() {' + myRule() + '};injectRules();'}
              injectedJavaScriptBeforeContentLoaded={'function initialRules() {' + initialRule() + '};initialRules();'}
              onMessage={(event) => {}}
              allowInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
            />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
}

export default gestureHandlerRootHOC(App)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'black',
  },
  ScrollStyle: {
    backgroundColor: 'black',
    position: 'relative',
  },
})

