import { mount } from "enzyme";
import Button from "../primitives/Button"

const mountWithHelpers = (element) => {
  let component = mount(element)

  component.clickButton = function(buttonText) {
    this
      .find(Button)
      .filterWhere(n => n.text().trim() === buttonText.trim())
      .simulate("click")
  }.bind(component)

  component.fillFirstTextArea = function(inputText) {
    this
      .find("textarea")
      .first()
      .simulate("change", { target: { value: inputText } })
  }.bind(component)

  component.fillLastTextArea = function(inputText) {
    this
      .find("textarea")
      .last()
      .simulate("change", { target: { value: inputText } })
  }.bind(component)

  return component;
}

export default mountWithHelpers
