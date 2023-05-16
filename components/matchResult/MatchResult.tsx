import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface MatchResultProps {
  handleClose: () => void;
}

const MatchResult = (props: MatchResultProps) => {
  return (
    <>
      <DialogTitle>{'Match Result'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hey there! You are here a bit earlier than expected. This feature will
          come soon 💪
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="success" onClick={props.handleClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default MatchResult;
