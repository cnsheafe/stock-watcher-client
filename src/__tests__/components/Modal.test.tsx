import * as React from "react";
import { ModalProps, Modal } from "../../components/Modal";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";

(Enzyme as any).configure({ adapter: new Adapter() });

class MockModal extends Modal {
  componentDidMount() {
    //Do Nothing!
  }
  componentDidUpdate() {
    //Do Nothing!
  }
}

describe("Modal", function() {
  test("should render with a div containing a h3, p, and form", function() {
    const wrapper = Enzyme.shallow(
      <MockModal showModal={true} modalSymbol={"msft"} />
    );
    expect(
      wrapper
        .find("div")
        .first()
        .hasClass("modal")
    );
    expect(
      wrapper
        .find("h3")
        .first()
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find("p")
        .first()
        .hasClass("modal-explanation")
    ).toBe(true);
    expect(
      wrapper
        .find("form")
        .first()
        .exists()
    ).toBe(true);
  });

  test("should render a form with two labels, four inputs, and a button", function() {
    const wrapper = Enzyme.shallow(
      <MockModal showModal={true} modalSymbol={"msft"} />
    );
    const form = wrapper.find("form").first();
    expect(form.exists()).toBe(true);
    expect(form.find("label")).toHaveLength(2);
    expect(form.find("input")).toHaveLength(4);
    expect(form.find("button")).toHaveLength(1);
  });
});
