import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ImmutableHelper from './../../utils/helpers/immutable';
import Grid from './grid';
import GridRow from './grid_row';

describe('Grid', () => {
  let instance;

  beforeEach(() => {
    let fields = ['foo', 'bar', 'baz'] 
    instance = TestUtils.renderIntoDocument(
    <Grid
      fields={ fields }
      data={ ImmutableHelper.parseJSON( [
                { foo: '1', bar: '2', baz: '3' },
                { foo: '4', bar: '5', baz: '6' } 
            ]) } />
    );
  });

  describe('Columns', () => {
    it('builds a column for each field', () => {
      let headings = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'th');
      expect(headings.length).toEqual(3);
      expect(headings[0].textContent).toEqual('foo');
      expect(headings[1].textContent).toEqual('bar');
      expect(headings[2].textContent).toEqual('baz');
    });
  });

  describe('Rows', () => {
    it('builds a grid row for each data element', () => {
      let rows = TestUtils.scryRenderedComponentsWithType(instance, GridRow); 
      expect(rows.length).toEqual(2);
    });
  });

  describe('Render', () => {
    it('renders a full table', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag).toBeTruthy();
    });

    it('renders a table row for the header and for each data element', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'tr').length).toEqual(3);
    });
  });
});
