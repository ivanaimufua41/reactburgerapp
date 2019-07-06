import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.show !== this.props.show;
  }

  showModalBackdrop = (props) => {
    return props.show ? { translate: 'translateY(0)', opacity: '1'} : { translate: 'translateY(-100)', opacity: '0'};
  }

  render() {
    const { show, modalClosed, children } = this.props;
    <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div className={classes.Modal} style={this.showModalBackdrop(this.props)}>{children}</div>
    </React.Fragment>
  }
}

export default Modal;
