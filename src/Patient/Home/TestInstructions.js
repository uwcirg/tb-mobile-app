import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InteractionCard from '../../Basics/HomePageSection';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import NewButton from '../../Basics/NewButton';

const useStyles = makeStyles({
  red: {
    color: 'green',
  },
});

const TestInstructions = observer(() => {
  const { patientStore, patientUIStore, UIStore } = useStores();

  let handleTestInstructions = async () => {
    patientUIStore.goToTestInstructions();
  };

  const classes = useStyles();

  return (
    <div>
      <InteractionCard upperText="Walkthrough" id="test-instructions">
        <p>
          Now we can have something inside of here that looks a little prettier.
          And it also routes us
        </p>
        <NewButton
          onClick={handleTestInstructions}
          text="*translate*Click here"
        />
      </InteractionCard>
    </div>
  );
});

export default TestInstructions;
