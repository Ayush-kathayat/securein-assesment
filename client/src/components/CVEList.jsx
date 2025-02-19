import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCVEList } from "../api/cveApi";

const CVEList = () => {
  const [cves, setCVEs] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState("published");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `Fetching data with sortField: ${sortField}, sortOrder: ${sortOrder}`
        );
        const data = await getCVEList(page, limit, sortField, sortOrder);
        console.log("API Response:", data);
        setCVEs(data.cves || []);
        setTotalRecords(data.totalRecords || 0);
      } catch (error) {
        console.error("Error fetching CVE data:", error);
      }
    };

    fetchData();
  }, [page, limit, sortField, sortOrder]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortField(field);
    console.log("Sorting by:", field, "Order:", newSortOrder);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
        padding: "20px",
      }}
    >
      <h2>Total Records: {totalRecords}</h2>
      <div style={{ maxHeight: "70vh", overflowY: "auto", width: "90%" }}>
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{
            margin: "20px auto",
            textAlign: "center",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>CVE ID</th>
              <th>Identifier</th>
              <th onClick={() => handleSort("publishedDate")}>
                Published Date{" "}
                {sortField === "publishedDate"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("lastModifiedDate")}>
                Modified Date{" "}
                {sortField === "lastModifiedDate"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cves.length > 0 ? (
              cves.map((item) => (
                <tr
                  key={item.cve.id}
                  onClick={() => navigate(`/cves/${item.cve.id}`)}
                >
                  <td>{item.cve.id}</td>
                  <td>{item.cve.sourceIdentifier || "N/A"}</td>
                  <td>{formatDate(item.cve.published)}</td>
                  <td>{formatDate(item.cve.lastModified)}</td>
                  <td>{item.cve.vulnStatus || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No CVEs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>
          Results Per Page:
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button
          disabled={cves.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CVEList;
