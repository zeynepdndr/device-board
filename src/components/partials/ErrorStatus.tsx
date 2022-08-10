const ErrorStatus = ({
  onContent,
  message,
}: {
  onContent: boolean;
  message: string;
}) => {
  return (
    <>
      <span className="custom-marker red" style={{ color: "red" }}>
        <i
          className="pi pi-exclamation-triangle"
          style={{
            fontSize: `${onContent ? "2em" : "1em"}`,
          }}
        />
      </span>
      <p style={{ color: "red" }}>{message} </p>
    </>
  );
};

export default ErrorStatus;
