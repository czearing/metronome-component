import React from "react";
import MetronomeDown from "./wav/Metronome.wav";
import MetronomeUp from "./wav/MetronomeUp.wav";
import "./styles.css";
// import Metronome from "./Metronome";

export default function App() {
  const [BPM, setBPM] = React.useState(150);
  const [active, setActive] = React.useState(false);
  const [interval, setInterval] = React.useState(0);

  const metronomeUp = new Audio(MetronomeUp);
  const metronomeDown = new Audio(MetronomeDown);

  const onClick = () => {
    setActive(!active);
    setInterval(0);
  };

  React.useEffect(() => {
    let timer = null;

    if (active) {
      timer = setTimeout(() => {
        setInterval((interval + 1) % 4);
        interval === 0 ? metronomeUp.play() : metronomeDown.play();
      }, (60 / BPM) * 1000);

      return () => clearInterval(timer);
    }
  }, [interval, active, BPM]);

  return (
    <div className="App">
      <div className="metronome-icon">
        <div
          className="metronome-icon-button"
          style={{ backgroundColor: interval === 0 ? "green" : "white" }}
        />
        <div
          className="metronome-icon-button"
          style={{ backgroundColor: interval === 1 ? "yellow" : "white" }}
        />
        <div
          className="metronome-icon-button"
          style={{ backgroundColor: interval === 2 ? "yellow" : "white" }}
        />
        <div
          className="metronome-icon-button"
          style={{ backgroundColor: interval === 3 ? "yellow" : "white" }}
        />
      </div>
      <div className="content">
        <button className="metronome-button" onClick={onClick}>
          {active ? "OFF" : "ON"}
        </button>
        <h1 className="beats-per-minute">{BPM} </h1>
        <h1 className="time-signature"> 4 / 4</h1>
      </div>
    </div>
  );
}
