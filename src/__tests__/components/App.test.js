import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Header from "../../components/Header/Header";

describe("Header component", () => {

    test("Render without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper);
    }); 

});