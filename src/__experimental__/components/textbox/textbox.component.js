import React from 'react';
import { Input, InputPresentation } from '../input';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.
// const Textbox = ({ children, ...props }) => (
//   <InputPresentation>
//     <Input { ...props } />
//     { children }
//   </InputPresentation>
// );

class Textbox extends React.Component {
  input = React.createRef()

  focusOnInput = () => {
    const { input } = this.input.current;
    input.current.focus();
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <InputPresentation onClick={ this.focusOnInput }>
        <Input ref={ this.input } { ...props } />
        { children }
      </InputPresentation>
    );
  }
}

export default Textbox;
