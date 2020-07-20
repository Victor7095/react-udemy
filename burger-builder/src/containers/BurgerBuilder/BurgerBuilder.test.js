import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => ({ ingredients: ["salad"] }),
}));

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
