import React, { useState, useEffect } from "react";

const GoalSetter = () => {
  const [goal, setGoal] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["dailyGoal"], data => {
      if (data.dailyGoal) setGoal(data.dailyGoal);
    });
  }, []);

  const saveGoal = () => {
    chrome.storage.local.set({ dailyGoal: goal });
  };

  return (
    <div>
      <h3>Set Daily Goal (in minutes)</h3>
      <input
        type="number"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />
      <button onClick={saveGoal}>Save Goal</button>
    </div>
  );
};

export default GoalSetter;
