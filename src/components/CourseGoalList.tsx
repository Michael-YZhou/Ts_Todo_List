import CourseGoal from "./CourseGoal";
import { type CourseGoal as CGoal } from "../App";
import InfoBox from "./InfoBox";
import { ReactNode } from "react";

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
  goals,
  onDeleteGoal,
}: CourseGoalListProps) {
  // Display a hint box if there are no goals
  if (goals.length === 0) {
    return <InfoBox mode="hint">No goals found. Maybe add one?</InfoBox>;
  }

  // Display a warning box if there are more than 3 goals
  let warningBox: ReactNode;
  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="medium">
        You have a lot of goals. Don't put too much on your plate!
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul className="grid gap-4 list-none p-0 m-0 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] mt-8">
        {goals.map((goal) => (
          <li
            className="bg-[#475357] p-4 rounded shadow-[0_0_10px_rgba(0,0,0,0.25)]"
            key={goal.id}
          >
            <CourseGoal title={goal.title} id={goal.id} onDelete={onDeleteGoal}>
              <p className="m-0 text-[0.85rem] text-[#dfd9be]">
                {goal.description}
              </p>
            </CourseGoal>
          </li>
        ))}
      </ul>
    </>
  );
}
