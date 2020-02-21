# @code/react-modal

> This library will hold the code for modal and it&#x27;s examples 

[![NPM](https://img.shields.io/npm/v/@code/react-modal.svg)](https://www.npmjs.com/package/@code/react-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save git+https://github.com/Code-Crash/react-modal.git
```

## Usage

### Full Example

```jsx

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
   * @description This function will handle the continue button or save button
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
         Your Component is Here!!
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
```

### Input Properties along with Functions

```tsx

export type Props = {
  hTitle?: string, // 'Header Title',
  fTitle?: string, //'Footer Title',
  content?: JSX.Element, // <div>This is your Component</div >,
  toggle?: Function, //'Your function which will manage the open|close the modal',
  cancel?: Function, //'Your function which will manage the cancel the modal',
  continue?: Function, //'Your function which will manage the continue the modal',
  action?: {
    cancel?: {
      hide?: boolean, //false,
      label?: string, //'Cancel'
    },
    continue?: {
      hide?: boolean, //false,
      label?: string, //'Continue'
    },
  },
  styles?: {
    area?: object, // { width: '100%', background: 'red', },
    cancel?: object,
    continue?: object,
  },
};

```

## To Do

* Add more styles support for each section of modal
* Add examples with different modals
* Update ```README.md``` with proper explanation
* Add support for fade-in and fade-out
* 


## License

MIT © [Code-Crash](https://github.com/Code-Crash)
