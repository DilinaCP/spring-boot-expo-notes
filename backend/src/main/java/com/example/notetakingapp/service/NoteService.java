package com.example.notetakingapp.service;

import com.example.notetakingapp.model.Note;
import com.example.notetakingapp.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    // Get all notes
    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    // Get note by ID
    public Note getNoteById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
    }

    // Create new note with validation
    public Note createNote(Note note) {
        if (note.getTitle() == null || note.getTitle().trim().isEmpty()) {
            throw new RuntimeException("Title cannot be empty");
        }
        if (note.getContent() == null || note.getContent().trim().isEmpty()) {
            throw new RuntimeException("Content cannot be empty");
        }

        note.setDateCreated(LocalDateTime.now());
        note.setLastUpdated(LocalDateTime.now());

        return repository.save(note);
    }

    // Update note with validation
    public Note updateNote(Long id, Note noteDetails) {
        Note note = repository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));

        if (noteDetails.getTitle() == null || noteDetails.getTitle().trim().isEmpty()) {
            throw new RuntimeException("Title cannot be empty");
        }
        if (noteDetails.getContent() == null || noteDetails.getContent().trim().isEmpty()) {
            throw new RuntimeException("Content cannot be empty");
        }

        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setLastUpdated(LocalDateTime.now());
        return repository.save(note);
    }

    // Delete note
    public void deleteNote(Long id) {
        repository.deleteById(id);
    }
}
