import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/cves";

export const getCVEList = async (
  page = 1,
  limit = 10,
  sortField = "publishedDate",
  sortOrder = "asc"
) => {
  console.log("Fetching with params:", { page, limit, sortField, sortOrder }); // ✅ Debug
  try {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      params: {
        page,
        limit,
        sortField,
        sortOrder,
      },
    });
    console.log("API Response:", response.data); // ✅ Debug
    return response.data;
  } catch (error) {
    console.error("Error fetching CVE list:", error);
    return { total: 0, cves: [] };
  }
};

export const getCVEById = async (cveId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${cveId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching CVE details:", error);
    return null;
  }
};
