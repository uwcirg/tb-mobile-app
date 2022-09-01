import React from 'react';

const CantTakePhoto = () => {
  return <div>Can't take photo</div>;
};

// const CantTakePhoto = observer(() => {
//   const { patientStore } = useStores();
//   const classes = useStyles();
//   const { t } = useTranslation('translation');

//   return (
//     <div className={classes.cantSubmit}>
//       <TextField
//         rows={3}
//         label={t('patient.report.photo.whyUnable')}
//         multiline
//         value={patientStore.report.whyPhotoWasSkipped}
//         onChange={(e) => {
//           patientStore.report.whyPhotoWasSkipped = e.target.value;
//         }}
//         className={classes.textArea}
//         variant="outlined"
//       />
//       <ClickableText
//         icon={<KeyboardArrowLeft />}
//         onClick={() => {
//           patientStore.report.photoWasSkipped = false;
//         }}
//         text={t('patient.report.photo.back')}
//       />
//     </div>
//   );
// });

export default CantTakePhoto;
