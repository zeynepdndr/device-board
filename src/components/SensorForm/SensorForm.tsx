import { FormEvent, useState } from "react";

const SensorForm = (props: any) => {
  const [enteredSensorIdError, setEnteredNameError] = useState(false);
  const [enteredLocationError, setEnteredLocationError] = useState(false);
  const [enteredCustomerError, setEnteredCustomerError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(
    !enteredCustomerError && !enteredSensorIdError && !enteredLocationError
  );

  const [userInput, setUserInput] = useState({
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

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    errorHandler();

    if (!isFormValid) return;

    const SensorData = {
      customer: userInput.enteredCustomer,
      sensorId: userInput.enteredSensorId,
      location: userInput.enteredLocation,
    };

    props.onSaveSensorData(SensorData);
    setUserInput({
      enteredSensorId: "",
      enteredLocation: "",
      enteredCustomer: "",
    });
    setIsFormValid(false);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="new-book__controls">
          <div
            className={`new-book__control ${
              enteredSensorIdError ? "invalid" : ""
            }`}
          >
            <label htmlFor="bookName">Sensor Id</label>
            <input
              type="text"
              value={userInput.enteredSensorId}
              onChange={sensorIdChangeHandler}
            />
          </div>
          <div
            className={`new-book__control ${
              enteredLocationError ? "invalid" : ""
            }`}
          >
            <label htmlFor="pageNumber">Location</label>
            <input
              type="number"
              min="0"
              step="1"
              value={userInput.enteredLocation}
              onChange={locationChangeHandler}
            />
          </div>
          <div className="new-book__actions">
            <button type="submit">Add Sensor</button>
            <button onClick={props.onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SensorForm;
