package com.ai.Resume.analyser.repository;

import com.ai.Resume.analyser.model.analysisHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface analysisHistoryRepo extends JpaRepository<analysisHistory, Long> {
    List<analysisHistory> findAllByEmailOrderByCreatedAtDesc(String email);
    java.util.Optional<analysisHistory> findByIdAndEmail(Long id, String email);
}
