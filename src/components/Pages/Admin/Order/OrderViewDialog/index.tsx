import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { WithStyles } from 'decorators/withStyles';
import IOrder from 'interfaces/models/order';
import React, { Fragment } from 'react';

interface IState extends IStateForm<IOrder> {
  loading: boolean;
  error?: null;
}

interface IProps {
  opened: boolean;
  order?: IOrder;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 400,
    maxWidth: 'calc(95vw - 50px)'
  },
  heading: {
    marginTop: 20,
    marginBottom: 10
  }
})
export default class OrderViewDialog extends FormComponent<IProps, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ...this.state,
      loading: true
    };
  }

  handleEnter = () => {
    const { order } = this.props;

    this.setState({ model: order || {}, loading: false });
  };

  render() {
    const { model, loading } = this.state;
    const { opened, classes, onCancel } = this.props;

    return (
      <Dialog open={opened} onEnter={this.handleEnter} onBackdropClick={onCancel} TransitionComponent={Transition}>
        {loading && <LinearProgress color='secondary' />}

        <DialogTitle>Detalhe Pedido</DialogTitle>
        <DialogContent className={classes.content}>
          <Fragment>
            <Typography variant='subtitle1' className={classes.heading}>
              ID: <strong>{model.id}</strong>
            </Typography>
            <Typography variant='subtitle1' className={classes.heading}>
              Descrição: <strong>{model.description}</strong>
            </Typography>
            <Typography variant='subtitle1' className={classes.heading}>
              Quantidade: <strong>{model.amount}</strong>
            </Typography>
            <Typography variant='subtitle1' className={classes.heading}>
              Valor: <strong>{model.price}</strong>
            </Typography>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
