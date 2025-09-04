import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Note } from '../types';
import { Colors } from '../constants/Colors';

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <View className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-gray-900 flex-1 mr-2">
          {note.title}
        </Text>
        <View className="flex-row space-x-2">
          <Link 
            href={{
              pathname: '/Add-Note',
              params: { 
                note: JSON.stringify(note),
                isEditing: 'true'
              }
            }} 
            asChild
          >
            <TouchableOpacity className="bg-green-500 px-3 py-1 rounded mr-3">
              <Text className="text-white text-sm">Edit</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity 
            className="bg-red-500 px-3 py-1 rounded"
            onPress={onDelete}
          >
            <Text className="text-white text-sm">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      
      {note.content && (
        <Text className="text-gray-600 mt-2" numberOfLines={3}>
          {note.content}
        </Text>
      )}
      

      
      <Text className="text-gray-400 text-xs mt-3">
        {new Date(note.lastUpdated || note.dateCreated || '').toLocaleDateString()}
      </Text>
    </View>
  );
}