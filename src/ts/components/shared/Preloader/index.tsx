// libraries
import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// types
import { IProps } from 'components/shared/Preloader/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing(2),
  },
}));

const Preloader = ({ isLoading }: IProps) => {
  if (!isLoading) {
    return null;
  }

  const classes = useStyles();

  return (
    <div className="overlay">
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
};

export default Preloader;
