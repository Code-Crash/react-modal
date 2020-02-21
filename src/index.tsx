/**
 * @class ExampleComponent
 */

import * as React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import styles from './styles.css'

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

export type State = {
  open: boolean,
};


/**
 * @description This function will make the string first letter to capital
 */
const capitalize = function (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export default class ModalComponent extends React.Component<Props, State> {

  public readonly state: State = {
    open: false
  }

  constructor(props: any) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getStylesFromProps = this.getStylesFromProps.bind(this);
    this.cancel = this.cancel.bind(this);
    this.continue = this.continue.bind(this);
    this.continue = this.continue.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getActionButton = this.getActionButton.bind(this);
    this.showActionButton = this.showActionButton.bind(this);
  }

  /**
   * @description This function will close the modal and return the promise.
   */
  close() {
    return new Promise((resolve) => {
      this.setState({
        open: false
      }, () => {
        return resolve(true);
      });
    });
  }

  /**
   * @description This function will open the modal and return the promise.
   */
  open() {
    return new Promise((resolve) => {
      this.setState({
        open: true
      }, () => {
        return resolve(true);
      });
    });
  }

  /**
   * @description This function will help to execute the cancel action
   */
  cancel() {
    if (this.props &&
      this.props.cancel &&
      this.props.cancel.constructor === Function) {
      return this.props.cancel();
    } else {
      return null;
    }
  }

  /**
   * @description This function will help to execute the continue action
   */
  continue() {
    if (this.props &&
      this.props.continue &&
      this.props.continue.constructor === Function) {
      return this.props.continue();
    } else {
      return null;
    }
  }

  /**
   * @description This function will help to toggle the modal (hide/show).
   */
  toggle() {
    if (this.props &&
      this.props.toggle &&
      this.props.toggle.constructor === Function) {
      return this.props.toggle();
    } else {
      if (this.state && this.state.open) {
        this.close();
      } else {
        this.open();
      }
    }
  }

  /**
   * @description This function will get the style property from props
   * @param type - Type is for UI element to override the style which is string
   */
  getStylesFromProps(type: string) {
    const styles = this.props && this.props.styles ? this.props.styles : {};
    let style = {};
    switch (type) {
      case 'area':
        style = styles && styles.area ? styles.area : {};
        break;
      case 'cancel':
        style = styles && styles.cancel ? styles.cancel : {};
        break;
      case 'continue':
        style = styles && styles.continue ? styles.continue : {};
        break;
      default:
        return {};
    }
    return style;
  }

  /**
   * @description This function will return the label to show in action button
   * @param type - Type is for Action button to show the label
   */
  getActionButton(type: string) {
    if (this.props.action &&
      this.props.action[type] &&
      this.props.action[type].label) {
      return this.props.action[type].label;
    } else {
      return capitalize(type);
    }
  }

  /**
   * @description This function will check if button shown is allowed or not.
   * @param type - Type is for Action button to show or hide
   */
  showActionButton(type: string) {
    if (this.props.action &&
      this.props.action[type] &&
      this.props.action[type].hide) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @description This is a render function, which render the modal component
   */
  render() {
    return (
      <div className={styles['cc-modal-container'] + ' ' + (this.state.open ? styles['cc-modal-show'] : styles['cc-modal-hide'])} >
        <div className={styles['cc-modal-area']} style={this.getStylesFromProps('area')}>
          <div className={styles['cc-modal-inner-area']} >
            <div className={styles['cc-modal-header']} >
              <div className={styles['cc-modal-title']}>
                {this.props.hTitle || 'Header Title'}
              </div>
              <i className={'fa fa-close ' + styles['cc-close-icon']} onClick={this.toggle} />
            </div>
            <div className={styles['cc-modal-content']}>
              {this.props.content || 'No Content in Modal'}
            </div>
            <div className={styles['cc-modal-footer']}>
              <div className={styles['cc-modal-title']}>
                {this.props.fTitle || 'Footer Title'}
              </div>
              <div className={styles['cc-action-container']}>
                {/* Cancel Button Handler */}
                {
                  this.showActionButton('cancel') ?
                    <button onClick={this.cancel} className={styles['cc-btn'] + ' ' + styles['cc-btn-cancel']} style={this.getStylesFromProps('cancel')}>
                      {
                        this.getActionButton('cancel')
                      }
                    </button> : null
                }
                {/* Continue Button Handler */}
                {
                  this.showActionButton('continue') ?
                    <button onClick={this.continue} className={styles['cc-btn'] + ' ' + styles['cc-btn-continue']} style={this.getStylesFromProps('continue')}>
                      {
                        this.getActionButton('continue')
                      }
                    </button> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
