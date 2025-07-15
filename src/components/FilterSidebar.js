import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FilterSidebar({ filters, setFilters }) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/data")
      .then(res => {
        const all = res.data;
        const unique = field => Array.from(new Set(all.map(item => item[field]).filter(Boolean)));
        setOptions({
          topic: unique("topic"),
          region: unique("region"),
          sector: unique("sector"),
          end_year: unique("end_year"),
          pestle: unique("pestle"),
          source: unique("source"),
          swot: unique("swot"),
          country: unique("country"),
          city: unique("city"),
        });
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fields = [
    "topic", "sector", "region", "country", "city",
    "end_year", "pestle", "source", "swot"
  ];

  return (
    <div style={{
      width: "260px",
      padding: "1rem",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e0e0e0",
      overflowY: "auto",
      boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
      position: "sticky",
      top: 0,
      height: "100vh"
    }}>
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>Filters</h3>
      {fields.map(field => (
        <div key={field} style={{ marginBottom: "1rem" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", textTransform: "capitalize", display: "block", marginBottom: "4px" }}>
            {field.replace("_", " ")}
          </label>
          <select
            name={field}
            value={filters[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#f1f1f1"
            }}
          >
            <option value="">All</option>
            {options[field]?.map((val, idx) => (
              <option key={idx} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
