import CourseGoalList from "./components/CourseGoalList.tsx";
import Header from "./components/Header.tsx";
import goalsImg from "./assets/goals.jpg";
// import goalsImg from "./assets/todo-list.jpg";
import { useState } from "react";
import NewGoal from "./components/newGoal.tsx";

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleAddGoal(goal: string, summary: string) {
    const newGoal: CourseGoal = {
      title: goal,
      description: summary,
      id: Math.random(),
    };

    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id != id);
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f6f8] to-[#e0e1e7] font-poppins">
      <main className="w-[90%] max-w-[40rem] mt-12 mx-auto p-8 bg-[#3a4346] text-[#1b1b1b] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.25)]">
        <Header image={{ src: goalsImg, alt: "A list of goals" }}>
          <h1 className="m-0 text-[1.75rem] text-[#f7e596]">
            Your Course Goals
          </h1>
        </Header>
        <NewGoal onAddGoal={handleAddGoal} />
        <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} />
      </main>
    </div>
  );
}
