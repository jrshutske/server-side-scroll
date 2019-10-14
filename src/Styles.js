import { makeStyles } from '@material-ui/core/styles';

export const useTextFieldStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

export const useProgressBarStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));