import React from "react";
import Main from "./Main";

import { render, screen, stores } from "./Utility/test-utils";

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing

it("renders using render function without errror", () => {
  render(<Main />);
});
