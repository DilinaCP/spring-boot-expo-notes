import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addNote, updateNote } from '../store/slices/notesSlice';
import { RootState, AppDispatch } from '../store'; 
import { Note } from '../types';

export default function AddNoteScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>(); 
  const { loading } = useSelector((state: RootState) => state.notes);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const params = useLocalSearchParams();

 
  useEffect(() => {
    if (params.note) {
      try {
        const noteData = JSON.parse(params.note as string);
        setEditingNote(noteData);
        setTitle(noteData.title);
        setContent(noteData.content || '');
      } catch (error) {
        console.error('Error parsing note data:', error);
        Alert.alert('Error', 'Failed to load note data');
      }
    }
  }, [params.note]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your note');
      return;
    }

    try {
      if (editingNote && editingNote.id) {
      
        await dispatch(updateNote({
          ...editingNote,
          title,
          content,
          lastUpdated: new Date().toISOString(),
        })).unwrap();
        Alert.alert('Success', 'Note updated successfully!');
      } else {
       
        await dispatch(addNote({
          title,
          content,
          dateCreated: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        })).unwrap();
        Alert.alert('Success', 'Note created successfully!');
      }
      
      router.back(); 
    } catch (error: any) {
      console.error('Save error:', error);
      Alert.alert('Error', error.message || 'Failed to save note. Please try again.');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {editingNote ? 'Edit Note' : 'Create New Note'}
        </Text>
        <Text className="text-gray-600">
          {editingNote ? 'Update your note details' : 'Add a new note to your collection'}
        </Text>
      </View>

      <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
        {/* Title Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Title *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            placeholder="Enter note title"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text className="text-xs text-gray-500 mt-1 text-right">
            {title.length}/100 characters
          </Text>
        </View>

        {/* Content Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Content</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 h-32 text-align-top"
            placeholder="Write your note content here..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={1000}
          />
          <Text className="text-xs text-gray-500 mt-1 text-right">
            {content.length}/1000 characters
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 bg-gray-300 px-4 py-3 rounded-lg mr-3"
            onPress={handleCancel}
            disabled={loading}
          >
            <Text className="text-gray-700 font-semibold text-center">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-blue-500 px-4 py-3 rounded-lg"
            onPress={handleSubmit}
            disabled={loading || !title.trim()}
          >
            <Text className="text-white font-semibold text-center">
              {loading ? 'Saving...' : editingNote ? 'Update' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}