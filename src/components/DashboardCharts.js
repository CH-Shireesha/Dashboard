import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const groupBy = (arr, key) =>
  arr.reduce((acc, obj) => {
    const val = obj[key];
    if (val) acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

const sumBy = (arr, key, valueField) =>
  arr.reduce((acc, obj) => {
    const val = obj[key];
    const score = parseInt(obj[valueField]);
    if (val && !isNaN(score)) acc[val] = (acc[val] || 0) + score;
    return acc;
  }, {});

export default function DashboardCharts({ data }) {
  if (!data.length) return <div style={{ padding: "2rem" }}>No data available</div>;

  const topicIntensity = sumBy(data, "topic", "intensity");
  const regionLikelihood = sumBy(data, "region", "likelihood");
  const countryDist = groupBy(data, "country");
  const yearRelevance = sumBy(data, "start_year", "relevance");

  const cardStyle = {
    marginBottom: "2rem",
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  };

  const kpis = [
    { title: "Total Insights", value: data.length },
    { title: "Unique Topics", value: new Set(data.map(d => d.topic)).size },
    { title: "Countries", value: new Set(data.map(d => d.country)).size },
    { title: "Regions", value: new Set(data.map(d => d.region)).size },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "2rem", color: '#222' }}>Analytics Dashboard</h2>

      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{
            flex: "1 1 200px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <h4 style={{ fontSize: "14px", color: "#666" }}>{kpi.title}</h4>
            <div style={{ fontSize: "24px", color: "#4f46e5", fontWeight: "bold" }}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: "30px", gridTemplateColumns: "1fr 1fr", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h4 style={{ marginBottom: "1rem", color: "#333" }}>Topics vs Intensity</h4>
          <Bar data={{
            labels: Object.keys(topicIntensity),
            datasets: [{
              label: "Intensity",
              data: Object.values(topicIntensity),
              backgroundColor: "#4f46e5"
            }]
          }} />
        </div>

        <div style={cardStyle}>
          <h4 style={{ marginBottom: "1rem", color: "#333" }}>Region vs Likelihood</h4>
          <Bar data={{
            labels: Object.keys(regionLikelihood),
            datasets: [{
              label: "Likelihood",
              data: Object.values(regionLikelihood),
              backgroundColor: "#10b981"
            }]
          }} />
        </div>

        <div style={cardStyle}>
          <h4 style={{ marginBottom: "1rem", color: "#333" }}>Country Distribution</h4>
          <Pie data={{
            labels: Object.keys(countryDist),
            datasets: [{
              label: "Countries",
              data: Object.values(countryDist),
              backgroundColor: Object.keys(countryDist).map((_, i) => `hsl(${i * 30}, 70%, 60%)`)
            }]
          }} />
        </div>

        <div style={cardStyle}>
          <h4 style={{ marginBottom: "1rem", color: "#333" }}>Year vs Relevance</h4>
          <Line data={{
            labels: Object.keys(yearRelevance),
            datasets: [{
              label: "Relevance",
              data: Object.values(yearRelevance),
              borderColor: "#f97316",
              tension: 0.4
            }]
          }} />
        </div>
      </div>
    </div>
  );
}
