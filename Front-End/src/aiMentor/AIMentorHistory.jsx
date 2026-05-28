import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Sidebar from "../components/Sidebar";
import styles from "../components/dashboard.module.css";

function AIMentorHistory() {
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
      const response = await fetch(`${serviceURL}/career/history`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to load history");
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load AI mentor history.");
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
            <h1>Previous AI Mentor Suggestions</h1>
            <p>Review all saved AI career guidance sessions and open the full report for each one.</p>
          </div>
          <div className={styles.pageActions}>
            <button className={styles.secondaryButton} onClick={() => navigate("/ai-mentor")}>Back to Mentor</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>Loading mentor history...</div>
        ) : history.length === 0 ? (
          <div className={styles.summaryCard}>
            <p>No AI mentor history found yet. Generate your first report to populate this section.</p>
          </div>
        ) : (
          <section className={styles.cardsGrid}>
            {history.map((item) => (
              <article key={item.id} className={styles.historyCard}>
                <div className={styles.metaRow}>
                  <div>
                    <h2>{item.title || "AI Mentor Report"}</h2>
                    <p className={styles.smallText}>{formatDate(item.createdAt)}</p>
                  </div>
                  <span className={styles.metaTag}>Result</span>
                </div>
                <p>{item.summary || item.roadmap || "No summary available."}</p>
                <div className={styles.metaRow}>
                  <button className={styles.secondaryButton} onClick={() => navigate(`/ai-mentor/${item.id}`)}>
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

export default AIMentorHistory;
