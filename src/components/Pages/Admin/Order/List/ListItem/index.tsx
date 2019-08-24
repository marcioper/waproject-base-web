import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ListItemComponent, { IStateListItem } from 'components/Abstract/ListItem';
import IOrder from 'interfaces/models/order';
import IconButton from '@material-ui/core/IconButton';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import * as React from 'react';
interface IState extends IStateListItem {
  deleted?: boolean;
}

interface IProps {
  order: IOrder;
  onView: (order: IOrder) => void;
}

export default class ListItem extends ListItemComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handleView = () => {
    const { order, onView } = this.props;
    onView(order);
  };

  render(): JSX.Element {
    const { order } = this.props;

    return (
      <TableRow>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.description}</TableCell>
        <TableCell>{order.amount}</TableCell>
        <TableCell>{order.price}</TableCell>
        <TableCell>
          <IconButton onClick={this.handleView}>
            <MagnifyIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}
