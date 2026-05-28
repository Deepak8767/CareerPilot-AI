package com.ai.Resume.analyser.repository;

import com.ai.Resume.analyser.model.aiMentorHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface aiMentorHistoryRepo extends JpaRepository<aiMentorHistory, Long> {
    List<aiMentorHistory> findAllByEmailOrderByCreatedAtDesc(String email);
    Optional<aiMentorHistory> findByIdAndEmail(Long id, String email);
}
