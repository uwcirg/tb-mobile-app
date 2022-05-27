import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import testStripInstructions from '../../Content/test-strip-instructions';

// max width images -->

// This wasnt the stepper test instruction!! I think this is a component
// that I made for the settings / info page - jp

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
    width: '400px',
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

const InstructionsStepper = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('translation');

  // return (
  //   <div className={`${classes.container} ${props.className}`}>
  //     <div className={classes.switcher}>
  //       {testStripInstructions.map((item, index) => {
  //         return (
  //           <div key={index} className={classes.card}>
  //             <img
  //               className={`${t(
  //                 'testStripInstructions.imgFolder'
  //               )}/${index}.png`}
  //               src={`${t('testStripInstructions.imgFolder')}/${index}.png`}
  //               alt={item}
  //             />
  //             <p>{t(item)}</p>
  //           </div>
  //         );
  //       })}
  //       {/* <img className={classes.image} src="/img/new_strip_instructions.png" />
  //           <ol className={classes.list}>
  //               <li>Recoja una pequeña cantidad de orina en un recipiente (aproximadamente 2.5 cm).</li>
  //               <li>Saque una tira reactiva y vuelva a sellar la bolsa.</li>
  //               <li>Sumerja en la orina solo 1-2 segundos.</li>
  //               <li>Coloque la prueba horizontalmente de plana y Espere 15-20 minutos.</li>
  //               <li>Abra la aplicación y seleccione “subir foto” y tome la foto de la tira. Asegúrese de que la imagen tenga toda la longitud de la tira reactiva.</li>
  //               <li>Coloque inmediatamente la tira reactiva usada en la bolsa de la que la sacó y descartela en el contenedor de residuos.</li>
  //           </ol> */}

  //       {/* Kyle's */}
  //       {/* <div className={classes.body}>
  //           <img className={classes.image} src={t('testStripInstructions.imgSrc')} />
  //           <ol className={classes.list}>
  //               <li>{t('testStripInstructions.one')}</li>
  //               <li>{t('testStripInstructions.two')}</li>
  //               <li>{t('testStripInstructions.three')}</li>
  //               <li>{t('testStripInstructions.four')}</li>
  //               <li>
  //                   {t('testStripInstructions.five.main')}
  //                   <ul className={classes.sublist}>
  //                       <li>{t('testStripInstructions.five.a')}</li>
  //                       <li> {t('testStripInstructions.five.b')}</li>
  //                   </ul>
  //               </li>
  //               <li>{t('testStripInstructions.six')}</li>
  //           </ol>
  //       </div> */}
  //     </div>
  //   </div>
  // );
};

export default InstructionsStepper;
