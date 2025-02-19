import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCVEById } from "../api/cveApi";

const CVEDetails = () => {
  const { cveId } = useParams();
  const [cve, setCve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCveDetails = async () => {
      try {
        const data = await getCVEById(cveId);
        setCve(data.cve);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCveDetails();
  }, [cveId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cve) return <p>No CVE details found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{cve.id}</h1>
      <p>
        <strong>Description:</strong> {cve.descriptions?.[0]?.value || "N/A"}
      </p>
      <h3>CVSS V2 Metrics:</h3>
      {cve.metrics?.cvssMetricV2?.[0]?.cvssData && (
        <>
          <p>
            <strong>Severity:</strong>{" "}
            {cve.metrics.cvssMetricV2[0].baseSeverity}
          </p>
          <p>
            <strong>Score:</strong>{" "}
            {cve.metrics.cvssMetricV2[0].cvssData.baseScore}
          </p>
          <p>
            <strong>Vector String:</strong>{" "}
            {cve.metrics.cvssMetricV2[0].cvssData.vectorString}
          </p>
        </>
      )}

      {/* New Table for Access Vector, Complexity, etc. */}
      {cve.metrics?.cvssMetricV2?.[0]?.cvssData && (
        <>
          <h3>Impact Metrics:</h3>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Access Vector</th>
                <th>Access Complexity</th>
                <th>Authentication</th>
                <th>Confidentiality Impact</th>
                <th>Integrity Impact</th>
                <th>Availability Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.accessVector || "N/A"}
                </td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.accessComplexity ||
                    "N/A"}
                </td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.authentication || "N/A"}
                </td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.confidentialityImpact ||
                    "N/A"}
                </td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.integrityImpact ||
                    "N/A"}
                </td>
                <td>
                  {cve.metrics.cvssMetricV2[0].cvssData.availabilityImpact ||
                    "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <h3>Scores:</h3>
      {cve.metrics?.cvssMetricV2?.[0] && (
        <>
          <p>
            <strong>Exploitability Score:</strong>{" "}
            {cve.metrics.cvssMetricV2[0].exploitabilityScore}
          </p>
          <p>
            <strong>Impact Score:</strong>{" "}
            {cve.metrics.cvssMetricV2[0].impactScore}
          </p>
        </>
      )}

      <h3>CPE:</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Match Criteria ID</th>
            <th>Vulnerable</th>
          </tr>
        </thead>
        <tbody>
          {cve.configurations?.flatMap((config) =>
            config.nodes.flatMap((node) =>
              node.cpeMatch.map((cpeItem, index) => (
                <tr key={index}>
                  <td>{cpeItem.criteria}</td>
                  <td>{cpeItem.matchCriteriaId}</td>
                  <td>{cpeItem.vulnerable ? "Yes" : "No"}</td>
                </tr>
              ))
            )
          ) || (
            <tr>
              <td colSpan="3">No CPE data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CVEDetails;
