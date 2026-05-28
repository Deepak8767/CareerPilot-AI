package com.ai.Resume.analyser.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class analysisHistoryDetailResponse {
    private Long id;
    private String roles;
    private int score;
    private int atsoptimizationscore;
    private List<String> pros;
    private List<String> cons;
    private List<String> suggestions;
    private String resumeSummary;
    private String resumeText;
    private String fullReport;
    private Date createdAt;
}
