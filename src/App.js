import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "./components/FilterSidebar";
import Dashboard from "./components/DashboardCharts";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    topic: "", sector: "", region: "", country: "", city: "",
    end_year: "", pestle: "", source: "", swot: ""
  });

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    axios.get(`http://localhost:8000/data?${query}`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [filters]);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f4f6f8", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ width: "260px", backgroundColor: "#fff", borderRight: "1px solid #e0e0e0", padding: "20px", overflowY: "auto" }}>
        <h2 style={{ color: "#4f46e5", marginBottom: "30px" }}>InsightX</h2>
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "30px" }}>
        <Dashboard data={data} />
      </div>
    </div>
  );
}

export default App;
