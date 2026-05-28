package com.ai.Resume.analyser.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class careerSuggestionResponse {
    private List<String> careerSuggestions;
    private List<String> projectIdeas;
    private List<String> skillsToLearn;
    private List<String> improvementAreas;
    private List<String> recommendedTechnologies;
    private List<String> interviewPrep;
    private List<String> missingSkills;
    private List<String> resumeTips;
    private String personalizedRoadmap;
    private Integer profileCompletion;
    private Integer atsScore;
}
