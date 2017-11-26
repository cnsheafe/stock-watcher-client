import * as React from "react";
import ModalAction from "../actions/ModalAction";
// import { toggleModalDisplay, addWatchAsync } from "../store/actions";
import { Company } from "../store/schema";
import store, { IState } from "../store/store";
import { connect } from "react-redux";
import "../styles/modal.scss";
import { MouseEvent } from "react";
export interface ModalProps {
  showModal: boolean;
  modalSymbol: string;
}

// Container Component for setting up an SMS Alert
export class Modal extends React.Component<ModalProps, {}> {
  private bodyElement: HTMLElement;
  private keyCallback: (event: KeyboardEvent) => void;
  private mouseCallback: (event) => void;
  private dimCSS: string = "dim-background";
  modalAction: ModalAction;

  constructor(props) {
    super(props);
    this.modalAction = new ModalAction();
  }

  render() {
    return (
      <div id="modal" className={this.props.showModal ? "modal" : "hide"}>
        <h3 className="modal-header">SMS Alert for Stock Price</h3>
        <p className="modal-explanation">
          Set up a text message alert for when a stock price exceeds a specified
          price. Note: phone numbers are NOT stored. Rates for your
          data-provider do apply. Messaging is only supported for USA numbers.
        </p>
        <form className="modal-form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="modal-price">Price(USD)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="2000"
            className="modal-price"
            id="modal-price"
            placeholder="10.00"
            required
          />
          <label htmlFor="modal-phone">Phone Number</label>
          <div id="modal-phone" className="modal-phone">
            <input
              id="phone-area-code"
              type="tel"
              pattern="([0-9]){3}"
              maxLength={3}
              placeholder="555"
              required
            />
            <input
              id="phone-field-1"
              type="tel"
              pattern="([0-9]){3}"
              maxLength={3}
              placeholder="123"
              required
            />
            <input
              id="phone-field-2"
              type="tel"
              pattern="([0-9]){4}"
              maxLength={4}
              placeholder="4567"
              required
            />
          </div>
          <div className="error hide">
            <p>One or more fields are invalid! Correct and please try again!</p>
          </div>
          <button type="submit" className="modal-button">
            Submit
          </button>
        </form>
      </div>
    );
  }

  // Attach eventlisteners to determine when to hide modal
  componentDidMount() {
    this.bodyElement = document.getElementsByTagName("body")[0] as HTMLElement;
    const areaCodeInput = document.getElementById(
      "phone-area-code"
    ) as HTMLInputElement;
    const fieldOneInput = document.getElementById(
      "phone-field-1"
    ) as HTMLInputElement;
    const fieldTwoInput = document.getElementById(
      "phone-field-2"
    ) as HTMLInputElement;

    this.handleMoveBlinker(areaCodeInput, fieldOneInput, fieldTwoInput);

    this.keyCallback = (event: KeyboardEvent) => {
      // Look for ESC Key
      if (event.which === 27 && this.props.showModal) {
        store.dispatch(this.modalAction.toggleDisplay());

        this.bodyElement.removeEventListener("keyup", this.keyCallback);
        this.bodyElement.removeEventListener("click", this.mouseCallback);
      }
    };

    /*
      Creates a blacklist of targets
      to prevent modal from hiding
    */
    this.mouseCallback = event => {
      const target = event.target as HTMLElement;

      if (
        !(
          target.className === "modal" ||
          target.className === "modal-price" ||
          target.className === "modal-phone" ||
          target.className === "modal-form" ||
          target.className === "modal-button" ||
          target.tagName === "LABEL" ||
          target.tagName === "P" ||
          target.className === "modal-header" ||
          (target.tagName === "INPUT" && this.props.showModal)
        )
      ) {
        store.dispatch(this.modalAction.toggleDisplay());

        this.bodyElement.removeEventListener("keyup", this.keyCallback);
        this.bodyElement.removeEventListener("click", this.mouseCallback);
      }
    };
  }

  componentDidUpdate() {
    this.bodyElement.classList.toggle(this.dimCSS);
    if (this.props.showModal) {
      this.bodyElement.addEventListener("keyup", this.keyCallback);
      this.bodyElement.addEventListener("click", this.mouseCallback);
    }
  }

  protected handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const symbol = this.props.modalSymbol;
    const price = +(document.getElementById("modal-price") as HTMLInputElement)
      .value;
    const areaCode = (document.getElementById(
      "phone-area-code"
    ) as HTMLInputElement).value;
    const field1 = (document.getElementById(
      "phone-field-1"
    ) as HTMLInputElement).value;
    const field2 = (document.getElementById(
      "phone-field-2"
    ) as HTMLInputElement).value;
    const phone = `+1${areaCode}${field1}${field2}`;

    store
      .dispatch(this.modalAction.addWatch(symbol, price, phone))
      .then(action => {
        if (action) {
          this.bodyElement.removeEventListener("keyup", this.keyCallback);
          this.bodyElement.removeEventListener("click", this.mouseCallback);

          document.getElementsByClassName("error")[0].classList.add("hide");
        } else {
          document.getElementsByClassName("error")[0].classList.remove("hide");
        }
      });
  }

  protected handleMoveBlinker(areaCodeInput, fieldOneInput, fieldTwoInput) {
    areaCodeInput.addEventListener("keyup", () => {
      if (areaCodeInput.value.length === areaCodeInput.maxLength) {
        fieldOneInput.focus();
      }
    });

    fieldOneInput.addEventListener("keyup", () => {
      if (fieldOneInput.value.length === fieldOneInput.maxLength) {
        fieldTwoInput.focus();
      }
    });
  }
}

function mapStateToProps(state: IState) {
  return {
    showModal: state.showModal,
    modalSymbol: state.modalSymbol
  };
}

export default connect(mapStateToProps)(Modal);
