import React from 'react';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ConditionalWrapper from '../ConditionalWrapper';
import DataTableEditableCell from './DataTableEditableCell';
import DataTableSelectableCell from './DataTableSelectableCell';

interface Props {
  value: string | number;
  validationErrors: any;
}

export default function DataTableCell(props: Props) {
  const { value, validationErrors } = props;

  return (
    <ConditionalWrapper
      condition={validationErrors}
      wrapper={(children) => (
        <Tooltip title={validationErrors[0].message}>{children}</Tooltip>
      )}
    >
      <TableCell align="center">
        <Typography {...(validationErrors && { backgroundColor: '#FF8A8A' })}>
          {value}
        </Typography>
      </TableCell>
    </ConditionalWrapper>
  );
}

DataTableCell.Editable = DataTableEditableCell;
DataTableCell.Selectable = DataTableSelectableCell;
