import ReactDOM from "react-dom";
import { Button } from "primereact/button";
import { useEffect, useRef } from "react";
import "./Modal.css";

interface BackdropProps {
  onConfirm: any;
}
const Backdrop: React.FC<BackdropProps> = (props: any) => {
  return <div className="backdrop" onClick={props.onConfirm} />;
};

const ModalOverlay = (props: any) => {
  console.log("propşs", props);
  return (
    <div className="modal">
      <div className="modal-header">{props.title}</div>
      <div className="content">
        <h2></h2>
        <div>
          <p>{props.message}</p>
        </div>
      </div>
      <div className="modal-actions">
        <Button className="button--alt" onClick={props.onClose}>
          Close
        </Button>
        <Button onClick={props.onConfirm}>Okay</Button>

        {/* <Button
              type="submit"
              label={formMode === `edit` ? `Update Sensor` : `Add Sensor`}
              className="mr-5"
            />
            <Button
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button> */}
      </div>
    </div>
  );
};

const Modal = (props: any) => {
  const nodeRoot = useRef(document.getElementById("root"));
  const backdropRoot = document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-root");
  const overlayRoot = document.createElement("div");
  overlayRoot.setAttribute("id", "overlay-root");

  useEffect(() => {
    if (nodeRoot) {
      nodeRoot.current?.insertAdjacentElement("beforebegin", backdropRoot);
      nodeRoot.current?.insertAdjacentElement("beforebegin", overlayRoot);
    }
  }, []);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        backdropRoot
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onClose={props.onClose}
          children={props.children}
        />,
        overlayRoot
      )}
    </>
  );
};

export default Modal;
