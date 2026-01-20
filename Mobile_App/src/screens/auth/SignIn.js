import Button from "../../components/Button"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useState, useContext } from "react"
import { loginUser } from "../../services/user"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from "../../../App"

function SignIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)

  const signin = async () => {
    try {
      const result = await loginUser(email, password)

      if (result.status === 'success') {
        await AsyncStorage.setItem('token', result.data.token)

        setUser({
          name: result.data.name,
          email: result.data.email,
          token: result.data.token,
        })

        Alert.alert('Login Successful')
      } else {
        Alert.alert('Error', result.error)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.signinContainer}>
          <Text style={styles.signin}>Signin</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.signupHereContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupHere}>Signup here</Text>
          </TouchableOpacity>
        </View>

        <Button title="Signin" onPress={signin} marginTop={20} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b6ffd',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  signinContainer: {
    marginTop: -40,
    marginBottom: 20,
    alignItems: 'center',
  },
  signin: {
    backgroundColor: '#198754',
    width: 150,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    borderRadius: 8,
  },
  signupHere: {
    color:'#0b6ffd',
    fontWeight: 'bold',
  },
  signupHereContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
})

export default SignIn
