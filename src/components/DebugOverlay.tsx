import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DebugOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Add to logs when location changes
    setLogs((prev) => [...prev, `Navigation to: ${location.pathname}`]);

    // Setup keyboard shortcut to toggle overlay
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [location]);

  const testNavigation = (path: string) => {
    setLogs((prev) => [...prev, `Test navigation to: ${path}`]);
    navigate(path);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "300px",
        height: "400px",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        zIndex: 9999,
        padding: "10px",
        overflow: "auto",
        fontFamily: "monospace",
        fontSize: "12px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px",
            marginRight: "5px",
          }}
        >
          Close
        </button>
        <button
          onClick={() => setLogs([])}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "5px",
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <div>Test Navigation:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          <button
            onClick={() => testNavigation("/")}
            style={{ padding: "3px", fontSize: "10px" }}
          >
            Home
          </button>
          <button
            onClick={() => testNavigation("/event/1")}
            style={{ padding: "3px", fontSize: "10px" }}
          >
            Event 1
          </button>
          <button
            onClick={() => testNavigation("/category/MUSIC")}
            style={{ padding: "3px", fontSize: "10px" }}
          >
            Music
          </button>
          <button
            onClick={() => testNavigation("/event-organizers")}
            style={{ padding: "3px", fontSize: "10px" }}
          >
            Organizers
          </button>
        </div>
      </div>

      <div>
        <div>Navigation Logs:</div>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {logs.map((log, index) => (
            <li
              key={index}
              style={{ borderBottom: "1px solid #333", padding: "3px 0" }}
            >
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugOverlay;
