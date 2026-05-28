package com.ai.Resume.analyser.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class aiMentorHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String title;

    @Column(length = 1024)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String roadmap;

    @ElementCollection
    @Column(length = 500)
    private List<String> careerSuggestions;

    @ElementCollection
    @Column(length = 500)
    private List<String> projectIdeas;

    @ElementCollection
    @Column(length = 500)
    private List<String> skillsToLearn;

    @ElementCollection
    @Column(length = 500)
    private List<String> improvementAreas;

    @ElementCollection
    @Column(length = 500)
    private List<String> recommendedTechnologies;

    @ElementCollection
    @Column(length = 500)
    private List<String> interviewPrep;

    @ElementCollection
    @Column(length = 500)
    private List<String> missingSkills;

    @ElementCollection
    @Column(length = 500)
    private List<String> resumeTips;

    @Column(columnDefinition = "TEXT")
    private String fullReport;

    @CreationTimestamp
    private Date createdAt;
}
