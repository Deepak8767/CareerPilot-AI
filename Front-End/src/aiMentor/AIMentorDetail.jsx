import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Sidebar from "../components/Sidebar";
import styles from "../components/dashboard.module.css";

function AIMentorDetail() {
  const { serviceURL, islogged } = useContext(usercontext);
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogged) return;
    if (id) {
      fetchReport();
    }
  }, [id, islogged, serviceURL]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serviceURL}/career/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load report");
      }
      setReport(await response.json());
    } catch (error) {
      console.error(error);
      toast.error("Could not load AI mentor report.");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, items) => {
    if (!items || !items.length) return null;
    return (
      <div className={styles.summaryCard}>
        <h2>{title}</h2>
        <ul>
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString();
  };

  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <main className={styles.contentPanel}>
        <div className={styles.pageHeader}>
          <div>
            <h1>AI Mentor Report</h1>
            <p>View the complete AI mentor session, including roadmap, skills, and recommended projects.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.secondaryButton} onClick={() => navigate("/ai-mentor/history")}>Back to History</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading report details...</div>
        ) : !report ? (
          <div className={styles.summaryCard}>This AI mentor report could not be loaded.</div>
        ) : (
          <>
            <section className={styles.detailCard}>
              <div className={styles.metaRow}>
                <div>
                  <h2>{report.title || "AI Mentor Guidance"}</h2>
                  <p className={styles.smallText}>Created at {formatDate(report.createdAt)}</p>
                </div>
              </div>
              <p>{report.summary || "No summary was provided."}</p>
            </section>
            <section className={styles.cardsGrid}>
              {renderSection("Career Suggestions", report.careerSuggestions)}
              {renderSection("Projects to Build", report.projectIdeas)}
              {renderSection("Skills to Learn", report.skillsToLearn)}
              {renderSection("Recommended Technologies", report.recommendedTechnologies)}
            </section>
            <section className={styles.cardsGrid}>
              {renderSection("Interview Preparation", report.interviewPrep)}
              {renderSection("Missing Skills", report.missingSkills)}
              {renderSection("Improvement Areas", report.improvementAreas)}
              {renderSection("Resume Tips", report.resumeTips)}
            </section>
            {report.roadmap && (
              <section className={styles.detailCard}>
                <h2>Roadmap Summary</h2>
                <p>{report.roadmap}</p>
              </section>
            )}
            {report.fullReport && (
              <section className={styles.detailCard}>
                <h2>Full AI Response</h2>
                <pre style={{ whiteSpace: "pre-wrap", color: "#cbd5e1" }}>{report.fullReport}</pre>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AIMentorDetail;
