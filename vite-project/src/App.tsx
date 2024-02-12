import "./App.css";
import { Timer } from "./TimerComponents/Timer";
import { Settings } from "./TimerComponents/Settings";
import Layout from "./TimerComponents/Layout";
import { useState } from "react";

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const [thresholdType, setThresholdType] = useState<"minutes" | "percentage">("minutes");
  const [thresholdValue, setThresholdValue] = useState<number>(5);

  const [testTime, setTestTime] = useState<number>(600);
  const [totalTime, setTotalTime] = useState<number>(testTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  function handleSetThresholdType(type: "minutes" | "percentage") {
    setThresholdType(type);
  }

  function handleSetThresholdValue(value: number) {
    setThresholdValue(value);
  }

  function handleIsRunning() {
    setIsRunning((x) => !x);
  }

  function handleSetTestTime(time: number) {
    setTestTime(time);
  }

  function handleSetTotalTime(time: number) {
    setTotalTime(time);
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={<Timer ThresholdType={thresholdType} ThresholdValue={thresholdValue} totalTime={totalTime} isRunning={isRunning} testTime={testTime} setTestTime={handleSetTestTime} />}
      />
      <Route
        path="settings"
        element={<Settings thresholdValue={thresholdValue} setTotalTime={handleSetTotalTime} setThresholdType={handleSetThresholdType} setThresholdValue={handleSetThresholdValue} setTestTime={handleSetTestTime} setIsRunning={handleIsRunning} isRunning={isRunning} />}
      />
    </Route>
  ));

  return <RouterProvider router={router} />;
}

export default App;
