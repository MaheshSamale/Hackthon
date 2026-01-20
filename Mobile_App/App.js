import { StyleSheet, View } from 'react-native'
import { createContext, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import SignIn from './src/screens/auth/SignIn'
import SignUp from './src/screens/auth/SignUp'
import Home from './src/screens/Home'

export const UserContext = createContext()

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Signin" component={SignIn} />
              <Stack.Screen name="Signup" component={SignUp} />
            </>
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
