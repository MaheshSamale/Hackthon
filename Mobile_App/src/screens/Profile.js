import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Button from '../components/Button'
import React, { useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getProfile, updateUser } from '../services/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../App'


function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const { setUser } = useContext(UserContext)

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile()
    }, [])
  )

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setUser(null)
  }

  const getUserProfile = async () => {
    const result = await getProfile()
    if (result.status === 'success') {
      setName(result.data.full_name)
      setEmail(result.data.email)
      setMobile(result.data.phone_no)
    } else {
      Alert.alert('Error', result.error)
    }
  }

  const updateUserProfile = async () => {
    const result = await updateUser(mobile)
    if (result.status === 'success') {
      Alert.alert('Success', 'Mobile updated')
    } else {
      Alert.alert('Error', result.error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
           <View style={styles.signinContainer}>
                    <Text style={styles.signin}>Profile</Text>
                  </View>
        <TextInput style={styles.input} value={name} editable={false} />
        <TextInput style={[styles.input, styles.spacing]} value={email} editable={false} />
        <TextInput
          style={[styles.input, styles.spacing]}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        {/* 🔹 Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Update Mobile" onPress={updateUserProfile} />
          <View style={{ height: 15 }} />

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b6ffd',
  },
  innerContainer: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  spacing: {
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 30,
  },

  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',       // Text color
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 5,
  },
})

export default Profile
