import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IStateList, ListComponent, TableCellSortable } from 'components/Abstract/List';
import Toolbar from 'components/Layout/Toolbar';
import TableWrapper from 'components/Shared/TableWrapper';
import IOrder from 'interfaces/models/order';
import { IPaginationParams } from 'interfaces/pagination';
import RefreshIcon from 'mdi-react/RefreshIcon';
import React, { Fragment } from 'react';
import * as RxOp from 'rxjs-operators';
import orderService from 'services/order';

import OrderViewDialog from '../OrderViewDialog';
import ListItem from './ListItem';

interface IState extends IStateList<IOrder> {
  current?: IOrder;
  formOpened?: boolean;
}

export default class OrderListPage extends ListComponent<{}, IState> {
  constructor(props: {}) {
    super(props, 'id');
  }

  componentDidMount() {
    this.loadData();
  }

  handleView = (current: IOrder) => {
    this.setState({ formOpened: true, current });
  };

  loadData = (params: Partial<IPaginationParams> = {}) => {
    this.setState({ loading: true, error: null });

    orderService
      .list(this.mergeParams(params))
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(items => this.setPaginatedData(items), error => this.setError(error));
  };

  formCancel = () => {
    this.setState({ formOpened: false });
  };

  handleRefresh = () => this.loadData();

  render() {
    const { items, formOpened, loading, current } = this.state;

    return (
      <Fragment>
        <Toolbar title='Pedidos' />

        <Card>
          <OrderViewDialog opened={formOpened || false} order={current} onCancel={this.formCancel} />

          {this.renderLoader()}

          <TableWrapper minWidth={500}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellSortable {...this.sortableProps} column='id'>
                    ID
                  </TableCellSortable>
                  <TableCellSortable {...this.sortableProps} column='description'>
                    Descrição
                  </TableCellSortable>
                  <TableCellSortable {...this.sortableProps} column='amount'>
                    Quantidade
                  </TableCellSortable>
                  <TableCellSortable {...this.sortableProps} column='price'>
                    Valor
                  </TableCellSortable>
                  <TableCell>
                    <IconButton disabled={loading} onClick={this.handleRefresh}>
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.renderEmptyAndErrorMessages(3)}
                {items.map(order => (
                  <ListItem key={order.id} order={order} onView={this.handleView} />
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
          {this.renderTablePagination()}
        </Card>
      </Fragment>
    );
  }
}
