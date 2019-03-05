import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './burgerbuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () =>{
    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={() =>{}}/>)
    });
    it('should render <BuildControls/> when ingredients set', () =>{
        wrapper.setProps({ings:{salad:1, bacon:1, cheese:1, meat:2}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })

})
