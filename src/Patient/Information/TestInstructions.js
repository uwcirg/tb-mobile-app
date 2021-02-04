import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'

const useStyles = makeStyles({
    container:{
        width: "100%",
    },
    list:{
        padding: "20px",
        textAlign: "left",
        fontSize: "1em",
        "& > li":{
            marginBottom: ".5em"
        }
    },
    body:{

    },
    image:{
        width: "100%"
    }

})

const Instructions = (props) => {

    const classes = useStyles();

    return (<div className={`${classes.container} ${props.className}`}>
        <div className={classes.body}>
        <img className={classes.image} src="/img/strip_instructions.png" />
        <ol className={classes.list}>
            <li>Recoja una pequeña cantidad de orina en una taza (aproximadamente 2.5 cm).</li>
            <li>Saque una tira reactiva y vuelva a sellar la bolsa.</li>
            <li>Retire la tapa y sumerja el extremo con agujeros en la orina durante unos dos segundos. Asegúrese de sumergir completamente la punta, pero no deje la tira reactiva en la orina por más de unos segundos.</li>
            <li>Recoloque la tapa</li>
            <li>Coloque la tira reactiva en el soporte (vea la imagen de arriba)</li>
            <li>Ponga el temporizador en 20 minutos</li>
            <li>Una vez que suene la alarma, abra la aplicación del Asistente en el celular y seleccione "subir foto". Abra la cámara del celular y tome la foto de la tira</li>
            <li>Asegúrese de que la imagen tenga toda la longitud de la tira reactiva, incluidas las marcas en el soporte.</li>
            <li>Coloque inmediatamente la tira reactiva usada en la bolsa de la que la sacó y descartela en el contenedor de residuos.</li>
        </ol>
        </div>

    </div>)

}

export default Instructions;