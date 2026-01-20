import { View, Text, Alert, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { getCategory } from '../services/category'
import { addBlog } from '../services/blog'
import Button from '../components/Button'
import { useFocusEffect } from '@react-navigation/native';
function AddBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category_id, setCategory_id] = useState('')
  const [categories, setCategories] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      getCategories()
    }, [])
  );

  const getCategories = async () => {
    const result = await getCategory()
    if (result.status === 'success') {
      setCategories(result.data)
    } else {
      Alert.alert('Error', result.error)
    }
  }

  const addBlogs = async () => {
    if (!title || !content || !category_id) {
      Alert.alert('Validation', 'Please fill all fields')
      return
    }

    const result = await addBlog(title, content, category_id)
    if (result.status === 'success') {
      Alert.alert('Success', 'Blog Added Successfully')
      setTitle('')
      setContent('')
      setCategory_id('')
    } else {
      Alert.alert('Error', result.error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.signinContainer}>
          <Text style={styles.signin}>Add Blog</Text>
        </View>

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Content */}
        <TextInput
          style={[styles.input, { marginTop: 10, height: 100 }]}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Content"
          value={content}
          onChangeText={setContent}
        />

        {/* Category Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category_id}
            onValueChange={(value) => setCategory_id(value)}
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map((item) => (
              <Picker.Item
                key={item.category_id}
                label={item.title}
                value={item.category_id}
              />
            ))}
          </Picker>
        </View>

        {/* Button */}
        <Button title="Add Blog" onPress={addBlogs} />
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
    elevation: 5,
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
  input: {
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
  },
})

export default AddBlog
