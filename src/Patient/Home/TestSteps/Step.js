import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const instructions = [
  {
    index: 1,
    img: '/img/test-instructions/1.png',
    description:
      'Recoja una pequeña cantidad de orina en un recipiente (aproximadamente 2.5 cm).',
  },
  {
    index: 2,
    img: '/img/test-instructions/2.png',
    description: 'Saque una tira reactiva y vuelva a sellar la bolsa.',
  },
  {
    index: 3,
    img: '/img/test-instructions/3.png',
    description: 'Sumerja en la orina solo 1-2 segundos.',
  },
  {
    index: 4,
    img: '/img/test-instructions/4.png',
    description:
      'Coloque la prueba horizontalmente de plana y Espere 15-20 minutos.',
  },
  {
    index: 5,
    img: '/img/test-instructions/5.png',
    description:
      'Abra la aplicación y seleccione “subir foto” y tome la foto de la tira. Asegúrese de que la imagen tenga toda la longitud de la tira reactiva.',
  },
  {
    index: 6,
    img: '/img/test-instructions/6.png',
    description:
      'Coloque inmediatamente la tira reactiva usada en la bolsa de la que la sacó y descartela en el contenedor de residuos.',
  },
];

// Make an object inside description that takes the selected language?

const useStyles = makeStyles({
  space: {
    boxSizing: 'border-box',
    padding: '20px',
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexGrow: '1',
  },
});

const Step = observer(({ currentStep }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <img
        src={instructions[currentStep].img}
        alt={`step # ${currentStep}`}
        className={classes.space}
      />
      <p style={{ padding: '0 20px' }}>
        {instructions[currentStep].description}
      </p>
    </div>
  );
});

export default Step;
