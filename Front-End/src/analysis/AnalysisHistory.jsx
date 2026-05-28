import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Sidebar from "../components/Sidebar";
import styles from "../components/dashboard.module.css";

function AnalysisHistory() {
  const { serviceURL, islogged } = useContext(usercontext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!islogged) return;
    fetchHistory();
  }, [islogged, serviceURL]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serviceURL}/analysis/history`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load analysis history");
      }
      setHistory(await response.json());
    } catch (error) {
      console.error(error);
      toast.error("Could not load analysis history.");
    } finally {
      setLoading(false);
    }
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
            <h1>Resume Analysis History</h1>
            <p>Review your previous ATS resume analyses and open full reports for deeper feedback.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.secondaryButton} onClick={() => navigate("/uploaddoc")}>New Analysis</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading resume analysis history...</div>
        ) : history.length === 0 ? (
          <div className={styles.summaryCard}>
            <p>No analysis history found. Upload a resume and run a new analysis to start storing your reports.</p>
          </div>
        ) : (
          <section className={styles.cardsGrid}>
            {history.map((item) => (
              <article key={item.id} className={styles.historyCard}>
                <div className={styles.metaRow}>
                  <div>
                    <h2>ATS Score {item.atsoptimizationscore || "N/A"}</h2>
                    <p className={styles.smallText}>{formatDate(item.createdAt)}</p>
                  </div>
                  <span className={styles.metaTag}>Score {item.score}</span>
                </div>
                <p>{item.resumeSummary || "Resume preview not available."}</p>
                <div className={styles.metaRow}>
                  <button className={styles.secondaryButton} onClick={() => navigate(`/analysis/${item.id}`)}>
                    View Full Details
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default AnalysisHistory;
