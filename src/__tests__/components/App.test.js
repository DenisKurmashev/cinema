import React from 'react';
import { shallow } from 'enzyme';
// Note: remove dead code
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; 

import Header from "../../components/Header/Header";

describe("HEADER COMPONENT", () => {
    // Note: this is just a snapshot of component, which in this case should be like this:
    // expect(wrapper).toMatchSnapshot();, try to do more advanced stuff, to test props, simulating events, finds DOM/components nodes
    // https://alligator.io/react/testing-react-components/
    // https://blog.halolabs.io/testing-react-components-with-jest-enzyme-5d1dd4ddccc4
    test("Render without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper);
    }); 

});