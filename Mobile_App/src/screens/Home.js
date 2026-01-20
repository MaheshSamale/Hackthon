import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@react-native-vector-icons/ionicons'
import AllBlogs from './AllBlogs'
import AddBlog from './AddBlog'
import AddCategory from './AddCategory'
import MyBlogs from './MyBlogs'
import Profile from './Profile'

const Tab = createBottomTabNavigator()

function Home() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName

            switch (route.name) {
              case 'All Blogs':
                iconName = 'list-outline'
                break
              case 'Add Blog':
                iconName = 'add-circle-outline'
                break
              case 'Add Category':
                iconName = 'grid-outline'
                break
              case 'My Blogs':
                iconName = 'document-text-outline'
                break
              case 'Profile':
                iconName = 'person-outline'
                break
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#0b6ffd',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="All Blogs" component={AllBlogs} />
        <Tab.Screen name="Add Blog" component={AddBlog} />
        <Tab.Screen name="Add Category" component={AddCategory} />
        <Tab.Screen name="My Blogs" component={MyBlogs} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Home
