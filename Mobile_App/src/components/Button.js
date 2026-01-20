import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Button({ marginTop, title, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: marginTop ? marginTop : 0 }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#198754',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default Button
