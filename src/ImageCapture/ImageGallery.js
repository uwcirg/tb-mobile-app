import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { ThemeProvider, styled } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { DateTime } from "luxon";

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#6ec082"
      }
    },
    typography:{
        button:{
            textTransform: "none"
        }
    }
}); 

const CapButton = styled(Button)({
    marginBottom: "2em"

})

const Subtitle = styled(Typography)({
    color: "gray"
})


class SingleImage extends Component {

    onClick = () => {
        this.props.setCurrentImage(this.props.imgData);
    }

    render() {

        return (

            <div className="image-gallery-container" onClick={this.onClick}>
                <img src={this.props.imgData} alt="captured" />
                <div className="saved-image-text">
                    <p>
                        {this.props.title}
                    </p>
                    <Subtitle>
                        {this.props.subtitle}
                    </Subtitle>
                </div>
            </div>
        )
    }
}

export default class ImageGallery extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentImage: ""
        }
    }

    onBack = () => {
        this.setState({
            currentImage: ""
        })
    }

    setCurrentImage = (image) => {
        this.setState({
            currentImage: image
        })
    }

    findLocalItems = (query) => {
        let i;
        let results = [];
        for (i in localStorage) {
            if (localStorage.hasOwnProperty(i)) {
                if (i.match(query) || (!query && typeof i === 'string')) {
                    const value = localStorage.getItem(i);
                    results.push({ key: i, val: value });
                }
            }
        }
        return results;
    }

    render(){



    const singleImageDisplay = (imgSrc) => { return(
        <div className="single-strip-view">
            <ThemeProvider theme={theme}>
            <CapButton variant="contained"  onClick={this.onBack}> Back </CapButton>
            <img src={imgSrc}></img>
            <Button variant="contained" color="primary"> Upload</Button>
            </ThemeProvider>
        </div>
    )}

    let images = this.findLocalItems(/^strip_report/).map( result => {
            let  data = {}
            try{
                 data = JSON.parse(result.val)}
            catch(err){
                console.log("Caught old format error")
                localStorage.removeItem(result.key)
                return ""
            }
            const date = DateTime.fromISO(data.dateTime);
            const dateString = date.toLocaleString();
            const timeString = date.toLocaleString(DateTime.TIME_SIMPLE);
            return <SingleImage setCurrentImage={this.setCurrentImage} imgData={data.image} title={dateString} subtitle={timeString}> </SingleImage>

        })

    return ( 
        <div className="image-gallery">
        <h2> Images Awaiting Upload</h2>
        <p>These will upload when you go back online</p>
     {!this.state.currentImage ? images : singleImageDisplay(this.state.currentImage) }
     </div>
    )
    }
}


