import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../Basics/UseStores'
import { observer } from 'mobx-react'
import InputBase from '@material-ui/core/InputBase'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import Colors from '../Basics/Colors'
import Photo from '@material-ui/icons/PhotoLibrary';
import Clear from '@material-ui/icons/Clear'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        height: "100%",
        borderTop: "1px solid lightgray"
    },
    base: {
        display: "flex",
        width: "100%",
        minHeight: "62px",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "center",
        "& > *::-webkit-scrollbar": {
            display: "none"
        },
        "& > input": {
            display: "none"
        }

    },

    input: {
        flex: 1,
        overflow: "scroll",
        marginRight: "auto"
    },
    send: {
        marginRight: "1em",
        color: Colors.lightBlue,
        backgroundColor: Colors.lightgray
    },
    imagePreview: {
        display: "flex",
        width: "100%",
        "& > img": {
            width: "50px",
            height: "50px"
        },
        "& > button": {
            marginLeft: "auto"
        }

    },
    imageText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: "1em",
        "& > p": {
            fontSize: ".75em",
            color: Colors.textGray,
            margin: 0,
            padding: 0
        }
    },
    viewLarger: {
        color: Colors.buttonBlue,
        justifyContent: "flex-start",
        textAlign: "left",
        fontSize: ".75em"

    }
})

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const MessageInput = observer((props) => {

   
    const { t, i18n } = useTranslation('translation');

    const [preview, setPreview] = useState(false);

    const classes = useStyles();
    const handleChange = (event) => {
        props.setValue(event.target.value)
    }
    const { messagingStore } = useStores();

    const handleFileInput = (event) => {

        if (event.target.files.length > 0) {
            const fileType = event.target.files[0].name.slice((Math.max(0, event.target.files[0].name.lastIndexOf(".")) || Infinity) + 1);
            messagingStore.setFileType(fileType)
            messagingStore.rawFile = event.target.files[0]
            messagingStore.setFile(URL.createObjectURL(event.target.files[0]))
        }
    }

    return (
        <>
        { !(messagingStore.fileUploading || messagingStore.newMessageLoading) ?
        <>
            {preview && <ImagePreview close={() => { setPreview(true) }} />}
            <div className={classes.container}>
                {messagingStore.file &&
                    <div className={classes.imagePreview}><img src={messagingStore.file} ></img>
                        <div className={classes.imageText}>
                            <p>Image will be sent with message</p>
                            <ButtonBase onClick={messagingStore.toggleImagePreview} className={classes.viewLarger}>View Larger</ButtonBase>
                        </div>
                        <IconButton onClick={messagingStore.clearFile}>
                            <Clear />
                        </IconButton>
                    </div>}
                <div className={classes.base}>
                    <input accept="image/*" className={classes.input} onChange={handleFileInput} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton onClick={messagingStore.getUploadUrl} color="primary" aria-label="upload picture" component="span">
                            <Photo />
                        </IconButton>
                    </label>
                    <InputBase
                        value={props.value}
                        className={classes.input}
                        placeholder={t('messaging.typeHere')}
                        inputProps={{ 'aria-label': 'message input' }}
                        multiline
                        onChange={handleChange}
                    />
                    <IconButton disabled={props.disableSend} onClick={props.handleSend} className={classes.send}><SendIcon /></IconButton>
                </div>
            </div>
        </> : <div>
            <span>Sending...</span>
            <CircularProgress color="secondary" />
            </div>}
        </>
    )

})

export default MessageInput;
