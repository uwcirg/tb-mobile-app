import React from "react"
import styled from "styled-components"
import moment from "moment"
import { observer } from "mobx-react"
import { action, observable, computed } from "mobx"
import { darkgrey, black, blue, white } from "../colors"

@observer
class Time extends React.Component {
  @observable open = false

  @computed get enteredText() {
    return this.props.store[this.props.path].format("HH:mm")
  }

  hourOptions() {
    return this.props.hourOptions ||
      Array.apply(null, {length: 24}).map(Number.call, Number)
  }

  minuteOptions() {
    return this.props.minuteOptions ||
      Array.apply(null, {length: 60}).map(Number.call, Number)
  }

  render() {
    let selectedHour = this.props.store[this.props.path].hour()
    let selectedMinute = this.props.store[this.props.path].minute()

    return (
      <Wrapper>
        <TimeInput
          onChange={(e) => console.log(`Manually changed time: ${e.target.value} (not recorded)`) }
          onFocus={(e) => this.focused(e)}
          onKeyPress={(e) => e.key === "Enter" && this.enter(e)}
          placeholder="--:--"
          value={this.enteredText}
        />

        { this.open &&
          <TouchInput>
            <Scroll>
              {this.hourOptions().map((hour) => (
                <TimeOption
                  innerRef={(node) => node && (hour === selectedHour) && node.scrollIntoView()}
                  key={hour}
                  onClick={() => this.hourSelected(hour)}
                  selected={hour === selectedHour}
                >{pad(hour, 2)}</TimeOption>
              ))}
            </Scroll>

            <Scroll>
              {this.minuteOptions().map((minute) => (
                <TimeOption
                  innerRef={(node) => node && (minute === selectedMinute) && node.scrollIntoView()}
                  key={minute}
                  onClick={() => this.minuteSelected(minute)}
                  selected={minute === selectedMinute}
                >{pad(minute, 2)}</TimeOption>
              ))}
            </Scroll>
          </TouchInput>
        }
      </Wrapper>
    )
  }

  @action
  focused(event) {
    event.target.select()

    this.open = true
  }

  enter(event) {
    event.target.blur()
    this.timeChanged(moment(event.target.value, "HH:mm"))
  }

  @action
  hourSelected(hour) {
    let minute = this.props.store[this.props.path].minute()
    let newTime = moment(`${hour}:${minute}`, "HH:mm")

    this.props.store[this.props.path] = newTime
  }

  minuteSelected(minute) {
    let hour = this.props.store[this.props.path].hour()
    let newTime = moment(`${hour}:${minute}`, "HH:mm")
    this.timeChanged(newTime)
  }

  @action
  timeChanged(newTime) {
    this.props.store[this.props.path] = newTime

    this.open = false
    this.props.store[this.props.path] = newTime
  }
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

const TimeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${darkgrey};
`

const Wrapper = styled.div`
  display: inline-block;
`

const TouchInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 15rem;
  position: fixed;
  width: 10rem;
  z-index: 1;
  border: 1px solid ${darkgrey};
`

const Scroll = styled.div`
  overflow-y: scroll;
`

const TimeOption = styled.div`
  background-color: ${(p) => p.selected ? blue : white};
  color:            ${(p) => p.selected ? white : black};
  padding: 0.5rem;
`

export default Time
