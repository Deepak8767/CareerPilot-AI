package com.ai.Resume.analyser.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class profileUpdateRequest {
    private String username;
    private String phone;
    private String college;
    private String degree;
    private String skills;
    private String bio;
    private String linkedin;
    private String github;
    private String careerGoal;
    private String experience;
}
