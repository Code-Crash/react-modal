import React, { Component } from 'react'
import ModalComponent from '@code/react-modal'

const styles = {
  area: {
    width: '100%',
  },
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.ccModalContent = this.ccModalContent.bind(this);
    this.ccModalCancel = this.ccModalCancel.bind(this);
    this.ccModalContinue = this.ccModalContinue.bind(this);
  }

  /**
   * @description This function will toggle your modal.
   */
  toggle() {
    if (this.modal && this.modal.state && this.modal.state.open) {
      this.modal.close();
    } else {
      this.modal.open();
    }
  }

  /**
   * @description This function will handle the cancel button
   */
  ccModalCancel() {
    console.log('modal action Cancel and Close Modal!');
    this.toggle();
  }

  /**
   * @description This function will handle the continue button
   */
  ccModalContinue() {
    console.log('modal action Continue!');
  }

  /**
   * @description This function will return the content which you
   *              need to put into the modal as content
   */
  ccModalContent() {
    return (
      <div>
        <div className="group">
          <label className="group-label">
            <span>First Name</span>
            <input name="first-name" className="group-field" placeholder="" />
          </label>
          <label className="group-label">
            <span>Last Name</span>
            <input name="last-name" className="group-field" placeholder="" />
          </label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.toggle}>Basic Modal</button>
          <div>
            <ModalComponent ref={(component) => { this.modal = component; }}
              content={this.ccModalContent()}
              toggle={this.toggle}
              styles={styles}
              cancel={this.ccModalCancel}
              continue={this.ccModalContinue}
              action={{ cancel: { label: 'Close', hide: false } }}
            />
          </div>
        </div>

      </div >
    )
  }
}
