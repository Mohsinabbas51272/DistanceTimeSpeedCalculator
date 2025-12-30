import { useState } from "react";
import styles from "./Calculator.module.css";

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("distance");
  const [inputs, setInputs] = useState({ speed: "", time: "", distance: "" });
  const [result, setResult] = useState("");

  function handleTabChange(tab) {
    setActiveTab(tab);
    setResult("");
    setInputs({ speed: "", time: "", distance: "" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  function calculate() {
    let output = "";
    const { distance, speed, time } = inputs;

    if (activeTab === "distance") {
      if (speed && time) {
        output = `Distance = ${(speed * time).toFixed(2)} km`;
      } else {
        output = "Please enter valid values!";
      }
    } else if (activeTab === "time") {
      if (distance && speed) {
        const hours = distance / speed;
        const totalSeconds = hours * 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        output = `Time = ${hours.toFixed(2)} hours (${minutes} min ${seconds} sec)`;
      } else {
        output = "Please enter valid values!";
      }
    } else if (activeTab === "speed") {
      if (distance && time) {
        output = `Speed = ${(distance / time).toFixed(2)} km/h`;
      } else {
        output = "Please enter valid values!";
      }
    }

    setResult(output);
  }

  function reset() {
    setInputs({ speed: "", time: "", distance: "" });
    setResult("");
  }

  return (
    <>
          <div className={styles.container}>


      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "distance" ? styles.active : ""}`}
          onClick={() => handleTabChange("distance")}
        >
          Distance
        </button>
        <button
          className={`${styles.tab} ${activeTab === "time" ? styles.active : ""}`}
          onClick={() => handleTabChange("time")}
        >
          Time
        </button>
        <button
          className={`${styles.tab} ${activeTab === "speed" ? styles.active : ""}`}
          onClick={() => handleTabChange("speed")}
        >
          Speed
        </button>
      </div>

      <div className={styles.container}>
        {activeTab === "distance" && (
          <>
            <h2>Find Distance</h2>
            <label>Speed (km/h):</label>
            <input
              type="number"
              name="speed"
              value={inputs.speed}
              onChange={handleChange}
              placeholder="Enter speed"
            />
            <label>Time (hours):</label>
            <input
              type="number"
              name="time"
              value={inputs.time}
              onChange={handleChange}
              placeholder="Enter time"
            />
          </>
        )}

        {activeTab === "time" && (
          <>
            <h2>Find Time</h2>
            <label>Distance (km):</label>
            <input
              type="number"
              name="distance"
              value={inputs.distance}
              onChange={handleChange}
              placeholder="Enter distance"
            />
            <label>Speed (km/h):</label>
            <input
              type="number"
              name="speed"
              value={inputs.speed}
              onChange={handleChange}
              placeholder="Enter speed"
            />
          </>
        )}

        {activeTab === "speed" && (
          <>
            <h2>Find Speed</h2>
            <label>Distance (km):</label>
            <input
              type="number"
              name="distance"
              value={inputs.distance}
              onChange={handleChange}
              placeholder="Enter distance"
            />
            <label>Time (hours):</label>
            <input
              type="number"
              name="time"
              value={inputs.time}
              onChange={handleChange}
              placeholder="Enter time"
            />
          </>
        )}

        <div className={styles.buttons}>
          <button className={styles.calc} onClick={calculate}>
            Calculate
          </button>
          <button className={styles.reset} onClick={reset}>
            Reset
          </button>
        </div>

        <div className={styles.result}>Results: {result}</div>
      </div>
        </div>
    </>
  );
}
