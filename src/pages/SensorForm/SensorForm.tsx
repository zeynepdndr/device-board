import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { addSensor, updateSensor } from "../../lib/api";

const SensorForm = () => {
  const navigate = useNavigate();
  const param = useParams();
  const {
    sendRequest: sendPostRequest,
    status: postStatus,
    error: postApiError,
  } = useHttp(addSensor);
  const {
    sendRequest: sendPutRequest,
    status: putStatus,
    error: putApiError,
  } = useHttp(updateSensor);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formMode, setFormMode] = useState<string>("add");
  const [userInput, setUserInput] = useState({
    enteredSensorId: "",
    enteredLocation: "",
    enteredCustomer: "",
  });

  const {
    value: enteredSensorId,
    isValid: enteredSensorIdIsValid,
    hasError: sensorIdInputHasError,
    valueChangeHandler: sensorIdChangeHandler,
    inputBlurHandler: sensorIdBlurHandler,
    reset: resetSensorIdInput,
  } = useInput((value: any) => value.trim() !== "", userInput.enteredSensorId);

  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
  } = useInput((value: any) => value.trim() !== "", userInput.enteredLocation);

  const {
    value: enteredCustomer,
    isValid: enteredCustomerIsValid,
    hasError: customerInputHasError,
    valueChangeHandler: customerChangeHandler,
    inputBlurHandler: customerBlurHandler,
    reset: resetCustomerInput,
  } = useInput((value: any) => value.trim() !== "", userInput.enteredCustomer);

  let formIsValid = false;

  if (
    enteredSensorIdIsValid &&
    enteredLocationIsValid &&
    enteredCustomerIsValid
  ) {
    formIsValid = true;
  }

  const onSaveSensorData = async (sensorData: any) => {
    setIsLoading(true);
    setError(null);

    if (formMode === "add") sendPostRequest(sensorData);
    if (formMode === "edit") sendPutRequest(sensorData.result);

    if (postStatus === "completed" || putStatus === "completed")
      setIsLoading(false);
    if (postApiError || putApiError) setError(error);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const sensorData = {
      result: {
        device_id: enteredSensorId,
        last_online: "",
        last_temp: 0,
        customer: enteredCustomer,
        location: enteredLocation,
        overview: {
          total_messages: 0,
          down_time: 0,
          alerts: 0,
        },
      },
    };

    onSaveSensorData(sensorData);
    resetCustomerInput();
    resetLocationInput();
    resetSensorIdInput();
  };

  useEffect(() => {
    if (Object.keys(param).length !== 0) {
      setFormMode("edit");
      setUserInput({
        enteredSensorId: param.device_id || "",
        enteredCustomer: param.customer || "",
        enteredLocation: param.location || "",
      });
    }
  }, []);

  useEffect(() => {
    if (
      (postStatus === "completed" || putStatus === "completed") &&
      !(postApiError || putApiError)
    )
      navigate("/dashboard");
  }, [postStatus, putStatus, postApiError, putApiError]);

  return (
    <div className="card">
      <h3
        style={{
          fontSize: "35px",
          color: "#2a333d",
          fontWeight: "700",
          marginTop: 0,
          marginBottom: " 12px",
        }}
      >
        {formMode === `edit`
          ? `Edit Sensor  (  ` + enteredSensorId + ` )`
          : `Add Sensor`}
      </h3>
      <form onSubmit={submitHandler} className="text-center">
        <div className="flex flex-wrap card-container p-fluid">
          <div className="flex-1 text-center p-4 border-round mx-4">
            <div className="field mb-5">
              <span className="p-float-label">
                <InputText
                  id="sensorId"
                  value={enteredSensorId}
                  onChange={sensorIdChangeHandler}
                  onBlur={sensorIdBlurHandler}
                  className={classNames({
                    "p-invalid": sensorIdInputHasError,
                  })}
                />
                <label
                  htmlFor="sensorId"
                  className={classNames({ "p-error": sensorIdInputHasError })}
                >
                  Sensor ID*
                </label>
              </span>
            </div>
            <div className="field mb-5">
              <span className="p-float-label">
                <InputText
                  id="location"
                  name="location"
                  value={enteredLocation}
                  onChange={locationChangeHandler}
                  onBlur={locationBlurHandler}
                  className={classNames({
                    "p-invalid": locationInputHasError,
                  })}
                />
                <label
                  htmlFor="location"
                  className={classNames({ "p-error": locationInputHasError })}
                >
                  Location*
                </label>
              </span>
            </div>
            <div className="field mb-5">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="customer"
                  name="customer"
                  value={enteredCustomer}
                  onChange={customerChangeHandler}
                  onBlur={customerBlurHandler}
                  className={classNames({
                    "p-invalid": customerInputHasError,
                  })}
                />
                <label
                  htmlFor="customer"
                  className={classNames({ "p-error": customerInputHasError })}
                >
                  Customer*
                </label>
              </span>
            </div>
          </div>
          <div className="flex-1 text-center p-4 border-round mx-4">
            <div className="flex-column mb-5">
              <div className="field">
                <span className="p-float-label">
                  <InputText id="minTemp" name="minTemp" />
                  <label htmlFor="minTemp">Min Temp. Threshold</label>
                </span>
              </div>
              <div className="field-checkbox">
                <Checkbox
                  inputId="accept"
                  name="accept"
                  checked={null}
                  onChange={() => {}}
                />
                <label htmlFor="accept">Monitor Min Temperature</label>
              </div>
            </div>
            <div className="flex-column">
              <div className="field">
                <span className="p-float-label">
                  <InputText id="maxTemp" name="maxTemp" />
                  <label htmlFor="maxTemp">Max Temp. Threshold</label>
                </span>
              </div>
              <div className="field-checkbox">
                <Checkbox
                  inputId="accept"
                  name="accept"
                  checked={null}
                  onChange={() => {}}
                />
                <label htmlFor="accept">Monitor Max Temperature</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            label={formMode === `edit` ? `Update Sensor` : `Add Sensor`}
            className="mr-5"
            disabled={!formIsValid}
          />
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SensorForm;
