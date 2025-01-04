import { type ReactNode } from "react";

type HintBoxProps = {
  mode: "hint";
  children: ReactNode;
};

type WarningBoxProps = {
  mode: "warning";
  severity: "low" | "medium" | "high"; // severity is optional, when not set, its value is undefined
  children: ReactNode;
};

// Union type of HintBoxProps and WarningBoxProps
type InfoBoxProps = HintBoxProps | WarningBoxProps;

export default function InfoBox(props: InfoBoxProps) {
  const { mode, children } = props;

  if (mode === "hint") {
    return (
      <aside className="my-8 p-2 text-center shadow-[0_0_10px_rgba(0,0,0,0.25)] text-[0.85rem] rounded">
        <p className="border border-[#96f5f7] text-[#96f5f7]">{children}</p>
      </aside>
    );
  }

  // only extract severity if mode is "warning"
  const { severity } = props;

  return (
    <aside
      className={`${severity} my-8 p-2 text-center shadow-[0_0_10px_rgba(0,0,0,0.25)] text-[0.85rem] rounded border border-[#f6d84f] text-[#f6d84f]`}
    >
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
