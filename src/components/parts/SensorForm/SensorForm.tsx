import { FormEvent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import { useParams } from "react-router-dom";

const SensorForm = (props: any) => {
  const navigate = useNavigate();
  const param = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enteredSensorIdError, setEnteredNameError] = useState(false);
  const [enteredLocationError, setEnteredLocationError] = useState(false);
  const [enteredCustomerError, setEnteredCustomerError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(
    !enteredCustomerError && !enteredSensorIdError && !enteredLocationError
  );
  const [formMode, setFormMode] = useState<string>("add");

  const [userInput, setUserInput] = useState<{
    enteredSensorId: string;
    enteredLocation: string;
    enteredCustomer: string;
  }>({
    enteredSensorId: "",
    enteredLocation: "",
    enteredCustomer: "",
  });

  const sensorIdChangeHandler = (event: any) => {
    //pass in a function to setState
    //it will receives snapshot of the previous state, safer way to get latest state
    if (event.target.value.trim().length === 0) {
      setEnteredNameError(true);
    } else setEnteredNameError(false);

    setIsFormValid(
      event.target.value.trim().length > 0 &&
        !enteredCustomerError &&
        !enteredSensorIdError &&
        !enteredLocationError
    );

    setUserInput((prevState) => {
      return { ...prevState, enteredSensorId: event.target.value };
    });
  };

  const locationChangeHandler = (event: any) => {
    setEnteredLocationError(false);
    setUserInput({ ...userInput, enteredLocation: event.target.value });
  };

  const customerChangeHandler = (event: any) => {
    setEnteredCustomerError(false);
    setUserInput({ ...userInput, enteredCustomer: event.target.value });
  };

  const errorHandler = () => {
    if (
      userInput.enteredSensorId === "" ||
      userInput.enteredSensorId.trim().length === 0
    ) {
      setEnteredNameError(true);
      setIsFormValid(false);
    }
    if (userInput.enteredLocation === "") {
      setEnteredLocationError(true);
      setIsFormValid(false);
    }
    if (userInput.enteredCustomer === "") {
      setEnteredCustomerError(true);
      setIsFormValid(false);
    }
    setIsFormValid(
      !enteredCustomerError && !enteredSensorIdError && !enteredLocationError
    );
  };
  const onSaveSensorData = async (sensorText: any) => {
    setIsLoading(true);
    setError(null);

    try {
      let fetchUrl: RequestInfo = "";
      if (formMode === "edit")
        fetchUrl = `http://localhost:3009/sensor/${userInput.enteredSensorId}`;
      if (formMode === "add") fetchUrl = `http://localhost:3009/sensor`;
      const response = await fetch(fetchUrl, {
        method: formMode === "edit" ? "PUT" : "POST",
        body: JSON.stringify({ text: sensorText }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    errorHandler();

    if (!isFormValid) return;

    const SensorData = {
      customer: userInput.enteredCustomer,
      sensorId: userInput.enteredSensorId,
      location: userInput.enteredLocation,
    };

    onSaveSensorData(SensorData);
    setUserInput({
      enteredSensorId: "",
      enteredLocation: "",
      enteredCustomer: "",
    });
    setIsFormValid(false);
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
  return (
    <>
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
            ? `Edit Sensor  (  ` + userInput.enteredSensorId + ` )`
            : `Add Sensor`}
        </h3>
        <form onSubmit={submitHandler} className="text-center">
          <div className="flex flex-wrap card-container p-fluid">
            <div className="flex-1 text-center p-4 border-round mx-4">
              <div className="field mb-5">
                <span className="p-float-label">
                  <InputText
                    id="sensorId"
                    value={userInput.enteredSensorId}
                    onChange={sensorIdChangeHandler}
                    autoFocus
                    className={classNames({
                      "p-invalid": enteredSensorIdError,
                    })}
                  />
                  <label
                    htmlFor="sensorId"
                    className={classNames({ "p-error": enteredSensorIdError })}
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
                    value={userInput.enteredLocation}
                    onChange={locationChangeHandler}
                    autoFocus
                    className={classNames({
                      "p-invalid": enteredLocationError,
                    })}
                  />
                  <label
                    htmlFor="location"
                    className={classNames({ "p-error": enteredLocationError })}
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
                    value={userInput.enteredCustomer}
                    onChange={customerChangeHandler}
                    autoFocus
                    className={classNames({
                      "p-invalid": enteredCustomerError,
                    })}
                  />
                  <label
                    htmlFor="customer"
                    className={classNames({ "p-error": enteredCustomerError })}
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
                    <InputText
                      id="minTemp"
                      name="minTemp"
                      value={userInput.enteredLocation}
                      onChange={locationChangeHandler}
                      autoFocus
                    />
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
                    <InputText
                      id="maxTemp"
                      name="maxTemp"
                      value={userInput.enteredLocation}
                      onChange={locationChangeHandler}
                      autoFocus
                    />
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
          <div className="new-book__actions">
            <Button
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
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SensorForm;
