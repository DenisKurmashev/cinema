import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; 

import Header from "../../components/Header/Header";

describe("HEADER COMPONENT", () => {

    test("Render without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper);
    }); 

});