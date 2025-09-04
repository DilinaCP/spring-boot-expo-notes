package com.example.notetakingapp.repository;

import com.example.notetakingapp.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository  extends JpaRepository<Note, Long> {
    //automatically give the
    // methods like .save(), .findAll(), .findById(), and .deleteById()
}
