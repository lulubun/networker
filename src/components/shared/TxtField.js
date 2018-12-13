import TextField from 'material-ui/TextField';

export const TxtField = (clsName, hint, changeFun) => (
  <TextField
    className={clsName}
    hintText={hint}
    fullWidth
    onChange={(event, newValue) => {
      console.log(newValue)
      changeFun(newValue);
  }}/>
)