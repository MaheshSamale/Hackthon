import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, FlatList, Modal } from 'react-native'
import React, { useState } from "react"
import Button from '../components/Button'
import { addCategoryTitleDesc, getCategory, deleteCategory, update } from '../services/category'
import { useFocusEffect } from '@react-navigation/native';

function AddCategory() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [newTitle, setNewTitle] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            getCategories()
        }, [])
    );

    const getCategories = async () => {
        const result = await getCategory()
        if (result.status == 'success') {
            setCategories(result.data)
        } else {
            Alert.alert(result.error)
        }
    }

    const addCategoryName = async () => {
        if (!title || !description) {
            Alert.alert("Please fill all fields")
            return
        }
        const result = await addCategoryTitleDesc(title, description)
        if (result.status == 'success') {
            Alert.alert('Category Added')
            setTitle('')
            setDescription('')
            getCategories()
        } else {
            Alert.alert('Error', result.error)
        }
    }

    const deleteCategoryOne = async (category_id) => {
        const result = await deleteCategory(category_id)
        if (result.status == 'success') {
            Alert.alert('Category Deleted')
            getCategories()
        } else {
            Alert.alert('Error', result.error)
        }
    }

    const openUpdateModal = (c) => {
        setEditingCategory(c)
        setNewTitle(c.title)
        setShowUpdateModal(true)
    }

    const handleUpdate = async () => {
        if (!newTitle.trim()) {
            Alert.alert("Please enter a title")
            return
        }
        const result = await update(editingCategory.category_id, newTitle)

        if (result.status == 'success') {
            Alert.alert('Title Updated')
            getCategories()
        } else {
            Alert.alert('Error', result.error)
        }
        setShowUpdateModal(false)
        setEditingCategory(null)
        setNewTitle('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.signinContainer}>
                    <Text style={styles.signin}>Add Category</Text>
                </View>

                <TextInput
                    style={styles.input}
                    value={title}
                    placeholder='Enter your Title here'
                    placeholderTextColor="#999"
                    onChangeText={setTitle}
                />

                <TextInput
                    style={[styles.input, { marginTop: 10 }]}
                    value={description}
                    placeholder='Enter your description here'
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={3}
                    onChangeText={setDescription}
                />

                <Button
                    onPress={addCategoryName}
                    title='Add Category'
                    marginTop={20}
                />
            </View>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.category_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.categoryCard}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                        </View>
                        <View style={styles.cardButtons}>
                            <TouchableOpacity
                                style={styles.updateBtn}
                                onPress={() => openUpdateModal(item)}
                            >
                                <Text style={styles.btnUpdate}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => deleteCategoryOne(item.category_id)}
                            >
                                <Text style={styles.btnDelete}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />

            {/* Update Modal */}
            <Modal
                visible={showUpdateModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowUpdateModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowUpdateModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Update Category Title</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={newTitle}
                            placeholder="Enter new title"
                            placeholderTextColor="#999"
                            onChangeText={setNewTitle}
                            autoFocus
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => setShowUpdateModal(false)}
                            >
                                <Text style={styles.btnDelete}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.updateBtn}
                                onPress={handleUpdate}
                            >
                                <Text style={styles.btnUpdate}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    input: {
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 5,
    },
    listContainer: {
        paddingBottom: 20,
    },
    categoryCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 15,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        flex: 1,
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
    cardButtons: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'flex-end',
    },
    updateBtn: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#198754',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnUpdate: {
    color: '#198754',       
    fontSize: 16,
    fontWeight: 'bold',
    },
    deleteBtn: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff4d4d',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnDelete: {
        color: '#ff4d4d',       // Text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        margin: 20,
        padding: 25,
        borderRadius: 12,
        elevation: 10,
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    modalInput: {
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelBtn: {
        flex: 0.45,
        backgroundColor: '#ccc',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 16,
    },
    modalUpdateBtn: {
        flex: 0.45,
        backgroundColor: '#f1b25d',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default AddCategory
