import React from 'react'
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native'

import { Provider } from 'react-redux'
import store from './store/store'
import { ToastProvider } from 'react-native-toast-notifications'
import StackNavigator from './StackNavigator'



const App: React.FC = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  )
}

export default App
