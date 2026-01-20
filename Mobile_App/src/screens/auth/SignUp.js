import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import Button from '../../components/Button'
import { useState } from "react"
import { registerUser } from '../../services/user'

function SignUp({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')


    const signup = async () => {
        //to-do  -> check for the validations if user have entered the data in the input fields
        const result = await registerUser(name, email, password, mobile)
        if (result.status == 'success') {
            Alert.alert('Signup Successful')
            navigation.goBack()
        }
        else
            Alert.error(result.error)
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.signinContainer}>
                    <Text style={styles.signin}>Signup</Text>
                </View>

                <TextInput
                    style={styles.input}
                    value={name}
                    label='Name'
                    placeholder='enter your name here'
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    value={mobile}
                    marginTop={10}
                    label='Phone Number'
                    placeholder='enter your phone number here'
                    onChangeText={setMobile}
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    marginTop={10}
                    label='Email'
                    placeholder='enter your email here'
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    isPassword={true}
                    marginTop={10}
                    label='Password'
                    placeholder='enter your password here'
                    onChangeText={setPassword}
                />

                <View style={styles.signinHereContainer}>
                    <Text>Already have an account yet? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Text style={styles.signinHere}>Signin here</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title='Signup'
                    marginTop={20}
                    onPress={signup}
                />
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
    input: {
        borderRadius: 5,
        borderColor: 'lightgray',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 15,
    },
    innerContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    signinContainer: {
        marginTop: -40,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signin: {
        textAlign: 'center',
        backgroundColor: '#198754',
        width: 150,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 15,
        borderRadius: 8,
        elevation: 5,
    },
    text: {
        marginTop: 20,
        fontSize: 17,
    },
    signinHere: {
        fontWeight: 'bold',
        color: '#0b6ffd',
    },
    signinHereContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
})

export default SignUp