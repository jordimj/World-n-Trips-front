import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ConditionalWrapper from '../../../../template/components/ConditionalWrapper/ConditionalWrapper';
import useHover from '../../hooks/useHover';

interface Props {
  value: string;
  validationErrors: any;
  onEdit: (value: string) => void;
}

export default function DataTableEditableCell(props: Props) {
  const { value, validationErrors, onEdit } = props;

  const [editedValue, setEditedValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const { ref, isHovering } = useHover();

  const toggleEditing = () => {
    if (isEditing) onEdit(editedValue);
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <TableCell align="center" ref={ref}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {isEditing ? (
            <TextField
              variant="outlined"
              defaultValue={value}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              sx={{ '.MuiOutlinedInput-input': { padding: '5px' } }}
            />
          ) : (
            <ConditionalWrapper
              condition={validationErrors}
              wrapper={(children) => (
                <Tooltip title={validationErrors[0].message}>{children}</Tooltip>
              )}
            >
              <Typography {...(validationErrors && { backgroundColor: '#FF8A8A' })}>
                {value}
              </Typography>
            </ConditionalWrapper>
          )}
          <IconButton
            aria-label="data-edit-button"
            size="small"
            onClick={toggleEditing}
            sx={{
              position: 'absolute',
              right: 0,
              opacity: isHovering || isEditing ? 1 : 0,
            }}
          >
            {isEditing ? <DoneIcon fontSize="small" /> : <EditIcon fontSize="small" />}
          </IconButton>
        </Stack>
      </TableCell>
    </ClickAwayListener>
  );
}
