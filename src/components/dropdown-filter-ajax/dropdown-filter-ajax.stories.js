import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import ImmutableHelper from '../../utils/helpers/immutable';
import OptionsHelper from '../../utils/helpers/options-helper';
import notes from './notes.md';
import DropdownFilterAjax from './dropdown-filter-ajax';
import { enableMock } from '../../../demo/xhr-mock';

const store = new Store({
  value: '',
  visibleValue: ''
});

enableMock();
const create = (evt, component) => component.state.filter;

// Shared Props
const onChange = (evt) => {
  store.set({
    visibleValue: evt.target.visibleValue,
    value: evt.target.visibleValue
  });
  action('change')(evt);
};
const autoFocus = boolean('autoFocus', false);
const cacheVisibleValue = boolean('cacheVisibleValue', false);
const disabled = boolean('disabled', false);
const name = text('name', 'Name');
const readOnly = boolean('readOnly', false);
const timeToDisappear = number('timeToDisappear', 0);
const label = text('label', 'Dropdown Label');
const labelInline = boolean('labelInline', true);
const labelWidth = labelInline ? text('labelWidth', '') : null;
const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary) : null;
const labelHelp = text('labelHelp', 'This is help text');
const inputWidth = text('inputWidth', '');
const fieldHelp = text('fieldHelp', 'This is field help text');
const fieldHelpInline = boolean('fieldHelpInline', false);
const createText = text('createText', '');
const createIconType = text('createIconType', '');
const suggest = boolean('suggest', false);
const freetext = boolean('freetext', false);
const path = text('path', '/countries');
const acceptHeader = text('acceptHeader', DropdownFilterAjax.defaultProps.acceptHeader);
const rowsPerRequest = number('rowsPerRequest', DropdownFilterAjax.defaultProps.rowsPerRequest);
const dataRequestTimeout = number(
  'dataRequestTimeout',
  DropdownFilterAjax.defaultProps.dataRequestTimeout
);
const withCredentials = boolean('withCredentials', false);
const options = ImmutableHelper.parseJSON([
  {
    id: 1, name: 'Orange'
  }, {
    id: 2, name: 'Blue'
  }
]);

storiesOf('DropdownFilterAjax', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('default', () => {
    return (
      <State store={ store }>
        <DropdownFilterAjax
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          createText={ createText }
          createIconType={ createIconType }
          suggest={ suggest }
          freetext={ freetext }
          path={ path }
          acceptHeader={ acceptHeader }
          rowsPerRequest={ rowsPerRequest }
          getCustomHeaders={ () => ({}) }
          dataRequestTimeout={ dataRequestTimeout }
          withCredentials={ withCredentials }
          options={ options }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    notes: { markdown: notes }
  })
  .add('withCreate', () => {
    return (
      <State store={ store }>
        <DropdownFilterAjax
          autoFocus={ autoFocus }
          cacheVisibleValue={ cacheVisibleValue }
          disabled={ disabled }
          name={ name }
          readOnly={ readOnly }
          timeToDisappear={ timeToDisappear }
          label={ label }
          labelInline={ labelInline }
          labelWidth={ labelWidth }
          labelAlign={ labelAlign }
          labelHelp={ labelHelp }
          inputWidth={ inputWidth }
          fieldHelp={ fieldHelp }
          fieldHelpInline={ fieldHelpInline }
          createText={ createText }
          createIconType={ createIconType }
          suggest={ suggest }
          freetext={ freetext }
          create={ create }
          path={ path }
          acceptHeader={ acceptHeader }
          rowsPerRequest={ rowsPerRequest }
          getCustomHeaders={ () => ({}) }
          dataRequestTimeout={ dataRequestTimeout }
          withCredentials={ withCredentials }
          options={ options }
          onChange={ onChange }
        />
      </State>
    );
  }, {
    info: {
      text: (
        <div>
          <p>A dropdown filter widget using ajax.</p>

          <h2>How to use a dropdown in a component:</h2>

          <p>In your file</p>

          <code>{'import DropdownFilterAjax from "carbon-react/lib/components/dropdown-filter-ajax";'}</code>

          <p>To render a DropdownFilterAjax:</p>

          <code>{'<DropdownFilter name="foo" path="/foo" onChange={ myChangeHandler } />'}</code>

          <p>You can also use the component in 'suggest' mode, which only shows the dropdown once a filter term has been entered.</p>

          <p>You can also define a function using the 'create' prop, this will allow you to trigger events to create new items.</p>

          <p>You can also define the number of rows returned by the ajax request using the property rowsPerRequest.</p>
        </div>
      )
    },
    notes: { markdown: notes }
  });