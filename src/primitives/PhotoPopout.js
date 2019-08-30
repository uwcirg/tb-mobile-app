import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Image, Popover } from "reakit";
import { white, darkgrey } from "../colors"


const PhotoPopout = observer(({ children, src }) => (

  <Popover.Container>
    {state => (

      <HelpToggle>
        <Preview
          as={Image}
          {...state}
          src={src}
          onClick={e => { e.stopPropagation() }}

        />

        <Callout {...state} onClick={e => e.stopPropagation()}>
          <Image
            src={src}
            alt={"Strip report"}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          />

          {children}
        </Callout>
      </HelpToggle>
    )}
  </Popover.Container>
))



class NewPhotoPopout extends React.Component {

  constructor(props) {
    super(props);
    this.state = { source: {}}
  }

  getImage = (url) => {

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.getItem("user.token")
      },
    }).then(resolve => resolve.blob())
    .then((result) => {
      let image = URL.createObjectURL(result);
      this.setState({source: image})
  })
    
  }

componentDidMount(){
  this.getImage(this.props.src);
}

render = () => {
  return (
    <Popover.Container>
      {state => (

        <HelpToggle>
          <Preview
            as={Image}
            {...state}
            src={this.state.source}
            onClick={e => { e.stopPropagation() }}
          />
          <Callout {...state} onClick={e => e.stopPropagation()}>
            <Image
              src={this.state.source}
              alt={"Strip report"}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />

            {this.props.children}
          </Callout>
        </HelpToggle>
      )}
    </Popover.Container>)
}
}

const HelpToggle = styled.div`
  width: 2rem;
  flex-basis: 2rem;
  color:blue;
  text-decoration:underline;
`

const Preview = styled(Popover.Toggle).attrs({
  alt: "Strip report",
})`
  max-height: 4rem;
`

const Callout = observer(({ children, ...props }) => (
  <CalloutLayout
    fade
    placement="bottom"
    hideOnClickOutside
    {...props}
  >
    {children}
  </CalloutLayout>
))

const CalloutLayout = styled(Popover)`
  background-color: ${white};
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`

export default NewPhotoPopout
