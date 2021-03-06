import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Pill from './pill';
import { exists } from 'fs';

describe('Pill', () => {
  let instance;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('click');

    instance = TestUtils.renderIntoDocument(
      <Pill
        children='My Text'
        className='customClass'
        onClick={ spy }
      />
    );
  });

  describe('render', () => {
    it('renders a span tag with the given children', () => {
      let pill = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill');

      expect(pill.length).toEqual(1);
      expect(pill[0].textContent).toEqual('My Text');
    });
  });

  describe('passing additional props', () => {
    it('adds props to the component', () => {
      let pill = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pill');

      TestUtils.Simulate.click(pill);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('classNames', () => {
    describe('as', () => {
      describe('when using the default', () => {
        it('adds a class of carbon-pill--default', () => {
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--default--empty').length).toEqual(1);
        });
      });

      describe('when not using the default', () => {
        it('uses the passed as', () => {
          instance = TestUtils.renderIntoDocument(
            <Pill
              as='warning'
              children='My Text'
            />
          );
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--warning--empty').length).toEqual(1);
        });

        it('uses the passed fill', () => {
          instance = TestUtils.renderIntoDocument(
            <Pill
              fill={ true }
              children='My Text'
            />
          );
          expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-pill--default--fill').length).toEqual(1);
        });
      });
    });

    describe('when passing a custom class', () => {
      it('adds the class to the component', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'customClass').length).toEqual(1);
      });
    });
  });

  describe('tags on component', () => {
    let wrapper = shallow(
      <Pill
        children='My Text'
        data-element='bar'
        data-role='baz'
      />
    );

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'pill', 'bar', 'baz');
    });
  });

  describe('onDelete adds "close" icon to component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Pill
          children='My Text'
          onDelete={ spy }
        />
      );
    });

    it('includes "close" icon when onDelete prop passed', () => {
      let icon = wrapper.find('[data-element="close"]');
      expect(icon.exists()).toBeTruthy();
      expect(icon.length).toEqual(1);
    });

    it('triggers the click when the icon is clicked', () => {
      wrapper.find('[data-element="close"]').simulate('click');
      expect(spy).toHaveBeenCalled(); 
    });

    it('does not include "close" icon when onDelete prop not passed', () => {
      wrapper = shallow(
        <Pill
          children='My Text'
        />
      );
      let icon = wrapper.find('[data-element="close"]');
      expect(icon.exists()).toBeFalsy();
      expect(icon.length).toEqual(0);
    });
  });
});
