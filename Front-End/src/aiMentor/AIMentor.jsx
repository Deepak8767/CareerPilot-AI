import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Sidebar from "../components/Sidebar";
import styles from "../components/dashboard.module.css";

function AIMentor() {
  const { serviceURL, islogged } = useContext(usercontext);
  const [loading, setLoading] = useState(true);
  const [mentorLoading, setMentorLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogged) return;
    fetchHistory();
  }, [islogged, serviceURL]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serviceURL}/career/history`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
        if (data?.length) {
          setReport(data[0]);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load AI mentor history.");
    } finally {
      setLoading(false);
    }
  };

  const generateMentor = async () => {
    setMentorLoading(true);
    try {
      const response = await fetch(`${serviceURL}/career/suggestions`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to generate guidance");
      }
      const data = await response.json();
      setReport(data);
      toast.success("AI mentor report generated.");
      fetchHistory();
    } catch (error) {
      console.error(error);
      toast.error("Could not generate AI mentor guidance.");
    } finally {
      setMentorLoading(false);
    }
  };

  const summaryItems = [
    { label: "Career Suggestions", value: report?.careerSuggestions },
    { label: "Recommended Technologies", value: report?.recommendedTechnologies },
    { label: "Missing Skills", value: report?.missingSkills },
    { label: "Project Ideas", value: report?.projectIdeas },
    { label: "Interview Prep", value: report?.interviewPrep },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <main className={styles.contentPanel}>
        <div className={styles.pageHeader}>
          <div>
            <h1>AI Mentor Dashboard</h1>
            <p>Explore growth guidance, roadmap recommendations and your latest career advice in one place.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.secondaryButton} onClick={() => navigate("/ai-mentor/history")}>View Mentor History</button>
            <button className={styles.actionButton} onClick={generateMentor} disabled={mentorLoading}> {mentorLoading ? "Generating…" : "Generate New Guidance"} </button>
          </div>
        </div>

        <section className={styles.cardsGrid}>
          {summaryItems.map((item) => (
            <div key={item.label} className={styles.summaryCard}>
              <h2>{item.label}</h2>
              {item.value?.length ? (
                <ul>
                  {item.value.slice(0, 3).map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p>No guidance yet. Generate a new report to see recommendations.</p>
              )}
            </div>
          ))}
        </section>

        <section className={styles.detailCard}>
          <div className={styles.metaRow}>
            <div>
              <strong>Personalized Roadmap</strong>
              <p className={styles.smallText}>A concise career path based on your profile and AI insights.</p>
            </div>
            <button className={styles.secondaryButton} onClick={() => navigate("/ai-mentor/history")}>View full history</button>
          </div>
          <p>{report?.roadmap || "Generate your first AI career roadmap to see customized next steps."}</p>
        </section>

        {loading ? (
          <div className={styles.loadingState}>Loading mentor history...</div>
        ) : (
          <section className={styles.detailCard}>
            <div className={styles.metaRow}>
              <div>
                <strong>Latest Mentor Snapshot</strong>
                <p className={styles.smallText}>Use the latest AI suggestions as your career planning starting point.</p>
              </div>
              <button className={styles.secondaryButton} onClick={() => navigate("/ai-mentor/history")}>View Full Details</button>
            </div>

            {!report ? (
              <p className={styles.smallText}>No mentor report is available yet.</p>
            ) : (
              <div className={styles.listBlock}>
                {summaryItems.map(
                  (item) =>
                    item.value?.length && (
                      <div key={item.label}>
                        <strong>{item.label}</strong>
                        <ul>
                          {item.value.slice(0, 4).map((value, idx) => (
                            <li key={idx}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            )}
          </section>
        )}

        <section className={styles.previewCard}>
          <div className={styles.metaRow}>
            <div>
              <strong>How to use AI Mentor guidance</strong>
            </div>
          </div>
          <p>Use the summary cards above to open the full mentor report, track progress, and update your profile to improve recommendations over time.</p>
        </section>
      </main>
    </div>
  );
}

export default AIMentor;
