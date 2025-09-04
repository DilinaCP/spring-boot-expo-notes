import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { fetchNotes, deleteNote } from '../store/slices/notesSlice';
import { RootState } from '../store';
import NoteCard from '../components/NoteCard';
import { useEffect, useState } from 'react';
import type { AppDispatch } from '../store';


export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error } = useSelector((state: RootState) => state.notes);
  

  useEffect(() => {
    console.log('Fetching notes...');
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
  };

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-red-500 text-center mb-4">Error: {error}</Text>
        <TouchableOpacity 
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => dispatch(fetchNotes())}
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-bold text-gray-900">My Notes</Text>
        <Link href="/Add-Note" asChild>
          <TouchableOpacity className="bg-blue-500 px-4 py-3 rounded-lg">
            <Text className="text-white font-semibold">New Note</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <NoteCard note={item} onDelete={() => handleDelete(item.id!)} />
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg text-center">
              No notes yet.{'\n'}Create your first note to get started!
            </Text>
          </View>
        }
        contentContainerStyle={items.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}