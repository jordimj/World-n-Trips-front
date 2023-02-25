import React from 'react';
import TableCell from '@mui/material/TableCell';
import { MenuItem, Select, Tooltip } from '@mui/material';
import useHover from '../../hooks/useHover';
import ConditionalWrapper from '../../../../template/components/ConditionalWrapper/ConditionalWrapper';

interface Props {
  value: string;
  validationErrors: any;
  selectOptions?: Array<string>;
  onEdit: (value: string) => void;
}

export default function DataTableSelectableCell(props: Props) {
  const { value, validationErrors, selectOptions, onEdit } = props;
  const { ref, isHovering } = useHover();

  if (!selectOptions) return null;

  return (
    <ConditionalWrapper
      condition={validationErrors}
      wrapper={(children) => (
        <Tooltip title={`${validationErrors[0].message}: ${value}`}>{children}</Tooltip>
      )}
    >
      <TableCell align="center" ref={ref}>
        <Select
          labelId="data-table-select-label"
          id="data-table-select"
          value={value}
          onChange={(e) => onEdit(e.target.value)}
          variant="standard"
          autoWidth
          disableUnderline
          sx={{
            backgroundColor: validationErrors ? '#FF8A8A' : 'transparent',
            position: 'relative',
            width: '100%',
            '& > svg': {
              display: isHovering ? 'block' : 'none',
              position: 'absolute',
              right: 0,
            },
          }}
        >
          {selectOptions.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    </ConditionalWrapper>
  );
}
