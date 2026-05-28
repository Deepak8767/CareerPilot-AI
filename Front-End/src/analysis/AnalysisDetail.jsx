import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Sidebar from "../components/Sidebar";
import styles from "../components/dashboard.module.css";

function AnalysisDetail() {
  const { serviceURL, islogged } = useContext(usercontext);
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogged) return;
    if (id) {
      fetchAnalysis();
    }
  }, [id, islogged, serviceURL]);

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serviceURL}/analysis/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load analysis details");
      }
      setAnalysis(await response.json());
    } catch (error) {
      console.error(error);
      toast.error("Could not load analysis details.");
    } finally {
      setLoading(false);
    }
  };

  const renderList = (title, items) => {
    if (!items?.length) return null;
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
            <h1>Resume Analysis Report</h1>
            <p>Explore the full ATS score, strengths, weaknesses, missing skills and AI suggestions for your uploaded resume.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.secondaryButton} onClick={() => navigate("/analysis/history")}>Back to History</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading full analysis...</div>
        ) : !analysis ? (
          <div className={styles.summaryCard}>Analysis details could not be loaded.</div>
        ) : (
          <>
            <section className={styles.detailCard}>
              <div className={styles.metaRow}>
                <div>
                  <h2>ATS Score</h2>
                  <p className={styles.smallText}>Overall score: {analysis.score} • Created {formatDate(analysis.createdAt)}</p>
                </div>
                <span className={styles.metaTag}>ATS {analysis.atsoptimizationscore}</span>
              </div>
              <p>{analysis.resumeSummary || "No summary available."}</p>
            </section>
            <section className={styles.cardsGrid}>
              {renderList("Strengths", analysis.pros)}
              {renderList("Weaknesses", analysis.cons)}
            </section>
            <section className={styles.cardsGrid}>
              {renderList("AI Suggestions", analysis.suggestions)}
            </section>
            {analysis.resumeText && (
              <section className={styles.detailCard}>
                <h2>Extracted Resume Text</h2>
                <pre style={{ whiteSpace: "pre-wrap", color: "#cbd5e1" }}>{analysis.resumeText}</pre>
              </section>
            )}
            {analysis.fullReport && (
              <section className={styles.detailCard}>
                <h2>Full Analysis Report</h2>
                <pre style={{ whiteSpace: "pre-wrap", color: "#cbd5e1" }}>{analysis.fullReport}</pre>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AnalysisDetail;
