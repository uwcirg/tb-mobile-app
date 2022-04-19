import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  list: {
    listStyle: 'none',
    counterReset: 'instructions',
    '& > li': {
      counterIncrement: 'instructions',
      margin: '1em 0',
    },
    '& > li:before': {
      content: 'counter(instructions) "."',
      marginRight: '5px',
      fontWeight: 'bold',
    },
    paddingLeft: '0',
    textAlign: 'left',
    fontSize: '1em',
  },
  body: {},
  image: {
    width: '100%',
  },
  switcher: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  card: {
    flexGrow: '1',
    flexBasis: '25rem',
    '& > p': {
      fontSize: '3vmax',
    },
    width: '100%',
  },
  sublist: {
    paddingLeft: '20px',
    '& > li': {
      marginTop: '.5em',
    },
  },
});

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

const Instructions = (props) => {
  const classes = useStyles();
  const { t } = useTranslation('translation');

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.switcher}>
        {instructions.map((item, index) => {
          return (
            <div key={item.index} className={classes.card}>
              <img
                className={classes.image}
                src={item.img}
                alt={item.description}
              />
              <p>{item.description}</p>
            </div>
          );
        })}
        {/* <img className={classes.image} src="/img/new_strip_instructions.png" />
            <ol className={classes.list}>
                <li>Recoja una pequeña cantidad de orina en un recipiente (aproximadamente 2.5 cm).</li>
                <li>Saque una tira reactiva y vuelva a sellar la bolsa.</li>
                <li>Sumerja en la orina solo 1-2 segundos.</li>
                <li>Coloque la prueba horizontalmente de plana y Espere 15-20 minutos.</li>
                <li>Abra la aplicación y seleccione “subir foto” y tome la foto de la tira. Asegúrese de que la imagen tenga toda la longitud de la tira reactiva.</li>
                <li>Coloque inmediatamente la tira reactiva usada en la bolsa de la que la sacó y descartela en el contenedor de residuos.</li>
            </ol> */}

        {/* Kyle's */}
        {/* <div className={classes.body}>
            <img className={classes.image} src={t('testStripInstructions.imgSrc')} />
            <ol className={classes.list}>
                <li>{t('testStripInstructions.one')}</li>
                <li>{t('testStripInstructions.two')}</li>
                <li>{t('testStripInstructions.three')}</li>
                <li>{t('testStripInstructions.four')}</li>
                <li>
                    {t('testStripInstructions.five.main')}
                    <ul className={classes.sublist}>
                        <li>{t('testStripInstructions.five.a')}</li>
                        <li> {t('testStripInstructions.five.b')}</li>
                    </ul>
                </li>
                <li>{t('testStripInstructions.six')}</li>
            </ol>
        </div> */}
      </div>
    </div>
  );
};

export default Instructions;
