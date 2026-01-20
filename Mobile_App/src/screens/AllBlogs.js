import { View, Text, Alert, FlatList, StyleSheet, TextInput } from 'react-native'
import React, { useState } from "react";
import { getBlog, findBlog } from "../services/blog";
import { getCategory } from '../services/category'
import { getUsers } from '../services/user'
import { useFocusEffect } from '@react-navigation/native';

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getBlogs();
      getCategoriesName();
      getUsersBYname();
    }, [])
  );

  const getUsersBYname = async () => {
    const result = await getUsers()
    if (result.status === 'success') {
      setUsers(result.data)
    } else {
      Alert.alert('Error', result.error)
    }
  }

  const getCategoriesName = async () => {
    const result = await getCategory()
    if (result.status === 'success') {
      setCategories(result.data)
    } else {
      Alert.alert('Error', result.error)
    }
  }

  const getBlogs = async () => {
    const result = await getBlog();
    if (result.status === "success") {
      setAllBlogs(result.data);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  // 🔍 Search Blogs
  const handleSearch = async (text) => {
    setSearchText(text)

    if (text.trim() === '') {
      getBlogs()
      return
    }

    const result = await findBlog(text)
    if (result.status === 'success') {
      setAllBlogs(result.data)
    } else {
      Alert.alert('Error', result.error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.signinContainer}>
          <Text style={styles.signin}>All Blogs</Text>
        </View>

        {/* 🔍 Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search blogs..."
          value={searchText}
          onChangeText={handleSearch}
        />

        <FlatList
          data={allBlogs}
          keyExtractor={(item) => item.blog_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <View style={styles.cardContent}>


                <Text style={styles.categoryName}>
                  {categories.find(c => c.category_id === item.category_id)?.title || 'No Category'}
                </Text>


                <Text style={styles.cardTitle}>{item.title}</Text>


                <Text style={styles.cardDescription}>{item.contents}</Text>


                <Text style={styles.userName}>
                  {`By ${users.find(u => u.user_id === item.user_id)?.full_name || 'Unknown'}`}
                </Text>

              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
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
  searchInput: {
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },

  listContainer: {
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },

  categoryName: {
    backgroundColor: '#0b6ffd',
    width: 100,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 8,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  userName: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'right',
  },
})

export default AllBlogs
