import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { offerApi } from "../../../services/api/offer.api";
import styles from "./Offers.module.css";

const Offers = () => {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOffers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await offerApi.getAll();
      setOffers(response.data || []);
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to load offers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleAccept = async (id) => {
    if (!window.confirm("Accept this offer?")) return;

    try {
      await offerApi.accept(id);
      await loadOffers();
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to accept offer."
      );
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this offer?")) return;

    try {
      await offerApi.reject(id);
      await loadOffers();
    } catch (err) {
      const message = err.response?.data?.message;

      setError(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Failed to reject offer."
      );
    }
  };

  if (loading) {
    return <div className={styles.message}>Loading offers...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Offers</h2>
          <p>Manage candidate job offers.</p>
        </div>

        <button
          className={styles.primaryButton}
          onClick={() => navigate("/hr/recruitment/offers/add")}
        >
          Create Offer
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {offers.length === 0 ? (
        <div className={styles.empty}>
          <h3>No offers found</h3>
          <p>Create an offer for a selected candidate.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Location</th>
                <th>Employment Type</th>
                <th>Validity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>
                    {offer.applicant_name ||
                      offer.candidate_name ||
                      "-"}
                  </td>

                  <td>{offer.position || "-"}</td>

                  <td>{offer.salary || "-"}</td>

                  <td>
                    {offer.joining_date
                      ? new Date(
                          offer.joining_date
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>{offer.location || "-"}</td>

                  <td>{offer.employment_type || "-"}</td>

                  <td>
                    {offer.validity
                      ? new Date(
                          offer.validity
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span className={styles.status}>
                      {offer.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    <div className={styles.actions}>
                      {offer.status !== "Accepted" &&
                        offer.status !== "Rejected" && (
                          <>
                            <button
                              className={styles.acceptButton}
                              onClick={() =>
                                handleAccept(offer.id)
                              }
                            >
                              Accept
                            </button>

                            <button
                              className={styles.rejectButton}
                              onClick={() =>
                                handleReject(offer.id)
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Offers;