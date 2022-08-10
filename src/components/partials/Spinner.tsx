import { ProgressSpinner } from "primereact/progressspinner";

//onContent is used for styling regarding where the spinner is shown
const Spinner = ({ onContent }: { onContent: boolean }) => {
  return (
    <ProgressSpinner
      style={{
        width: `${onContent ? "50px" : "30px"}`,
        height: `${onContent ? "50px" : "30px"}`,
      }}
      strokeWidth="7"
      fill={onContent ? `var(--surface-ground)` : undefined}
      animationDuration=".8s"
    />
  );
};

export default Spinner;
