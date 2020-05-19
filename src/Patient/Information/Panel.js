import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles({
    test:{
        border: 'solid 1px blue',
        height: "100px",
        overflow: 'scroll'
    }
})

export default function Test(props){

    const classes = useStyles();
    
    const title = props.children.find( each => {
        return each.type === "h1"
    })

    console.log(title)

    return(
        <strong>
           {title.props.children[0]}
           <div className={classes.test}>
            {props.children}
           </div>
        </strong>
    )
}