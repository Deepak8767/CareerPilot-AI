package com.ai.Resume.analyser.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class aiMentorSaveRequest {
    private String title;
    private String summary;
    private String roadmap;
    private List<String> careerSuggestions;
    private List<String> projectIdeas;
    private List<String> skillsToLearn;
    private List<String> improvementAreas;
    private List<String> recommendedTechnologies;
    private List<String> interviewPrep;
    private List<String> missingSkills;
    private List<String> resumeTips;
    private String fullReport;
}
