import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";

import { IRootState, IAlertProps } from "../types/interfaces";
import { clearErrors } from "../flux/actions/errorActions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.snackbar,
    position: "absolute",
    top: "72px",
    right: 0,

    width: "300px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBar: React.FC<IAlertProps> = ({ error, clearErrors }) => {
  const classes = useStyles();

  return (
    <>
      {error?.status && (
        <div className={classes.root}>
          {error?.status && +error.status > 400 ? (
            <Alert onClose={clearErrors} severity="error">
              {error.msg?.msg || error.msg}
            </Alert>
          ) : (
            <Alert onClose={clearErrors} severity="success">
              {error.msg?.msg || error.msg}
            </Alert>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  error: state.error,
});

export default connect(mapStateToProps, { clearErrors })(AlertBar);
