import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useConnect } from "@utils/redux-like";
import { getSettings } from "@stores/settings/settingsAction";
import {
  Items,
  initState as settingsState,
} from "@stores/settings/settingsReducer";
import { initState as userState, State } from "@stores/user/userReducer";

import { setSettings } from "@stores/user/userAction";
import {
  Input,
  Select,
  Button,
  Form,
  ErrorsInterface,
  LoaderRing,
  ContentLoader,
  Alert,
} from "@design";
import StyledSettings from "./StyledSettings";

interface Errors extends ErrorsInterface {
  common?: string;
  [key: string]: string;
}

const Settings: React.FC = () => {
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true);
  const history = useHistory();
  const [state, dispatch] = useConnect();

  useEffect(() => {
    if (dispatch) {
      setIsContentLoading(true);
      dispatch(getSettings()).then(() => setIsContentLoading(false));
    }
  }, [dispatch]);

  const errors: Errors = state?.user?.errors || {};
  const inProgress = state?.user?.fetching || false;
  const items = (state?.settings?.items as Items) || settingsState.items;
  const userSettings =
    (state?.user?.settings as State["settings"]) || userState.settings;

  const genderRef = useRef<HTMLSelectElement>();
  const ageRef = useRef<HTMLInputElement>();
  const heightRef = useRef<HTMLInputElement>();
  const weightRef = useRef<HTMLInputElement>();
  const activityRef = useRef<HTMLSelectElement>();
  const goalRef = useRef<HTMLSelectElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      gender: Number(genderRef.current.value),
      age: Number(ageRef.current.value),
      height: Number(heightRef.current.value),
      weight: Number(weightRef.current.value),
      activity: Number(activityRef.current.value),
      goal: Number(goalRef.current.value),
    };

    dispatch(setSettings(data)).then((result: boolean) => {
      if (result) history.push("/");
    });
  };
  return (
    <StyledSettings>
      <h1>Settings</h1>
      <ContentLoader className="loader" loading={isContentLoading}>
        <div className="form-container">
          {errors.common && <Alert message={errors.common} />}
          <div>
            <Form onFinish={handleSubmit} errors={errors}>
              <Select
                ref={genderRef}
                name="gender"
                items={items?.gender?.map((val) => ({
                  name: val.name,
                  value: val.ratio,
                }))}
                value={userSettings.gender || ""}
                placeholder="What gender you are"
                required={true}
              />
              <Input
                ref={ageRef}
                type="number"
                name="age"
                value={userSettings.age || ""}
                placeholder="How are you old"
                required={true}
              />
              <Input
                ref={heightRef}
                type="number"
                name="height"
                value={userSettings.height || ""}
                placeholder="Height"
                required={true}
              />
              <Input
                ref={weightRef}
                type="number"
                name="weight"
                value={userSettings.weight || ""}
                placeholder="Weight"
                required={true}
              />
              <Select
                ref={activityRef}
                name="activity"
                items={items?.activity?.map((val) => ({
                  name: val.name,
                  value: val.ratio,
                }))}
                value={userSettings.activity || ""}
                placeholder="Your activity"
                required={true}
              />
              <Select
                ref={goalRef}
                name="goal"
                items={items?.goal?.map((val) => ({
                  name: val.name,
                  value: val.ratio,
                }))}
                value={userSettings.goal || ""}
                placeholder="Your goal"
                required={true}
              />
              <Button
                name="submit"
                className="settings-button"
                disabled={inProgress}
              >
                {inProgress && <LoaderRing className="mr4" />}
                Save settings
              </Button>
            </Form>
          </div>
        </div>
      </ContentLoader>
      {/* <h2>Gender</h2>
      <div className="gender">
        <div className="item">
          <input
            hidden
            type="radio"
            id="man"
            name="gender"
            value="man"
            checked
          />
          <label htmlFor="man">
            <i className="man" />
            <span>Man</span>
          </label>
        </div>
        <div className="item">
          <input hidden type="radio" id="woman" name="gender" value="woman" />
          <label htmlFor="woman">
            <i className="woman" />
            <span>Woman</span>
          </label>
        </div>
      </div>
      <h2>
        How old are you <span>30</span>
      </h2> */}
    </StyledSettings>
  );
};

export default Settings;
