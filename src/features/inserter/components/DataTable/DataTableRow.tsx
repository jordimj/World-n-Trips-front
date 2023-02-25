import React, { Fragment } from 'react';
import TableRow from '@mui/material/TableRow';
import DataTableCell from './DataTableCell';
import { Day, Expense, ImportData, Night, Spot, TableKind } from '../../types';
import useDataValidation from '../../hooks/useDataValidation';
import useCategories from '../../hooks/useCategories';

// interface DayRow {
//   dataKind: 'day';
//   row: Day;
// }

// interface NightRow {
//   dataKind: 'night';
//   row: Night;
// }

// interface SpotRow {
//   dataKind: 'spot';
//   row: Spot;
// }

// interface ExpenseRow {
//   dataKind: 'expense';
//   row: Expense;
// }

// type DataTableRowProps = (DayRow | NightRow | SpotRow | ExpenseRow) & {
//   updateParsedData: (
//     id: number,
//     key: 'category' | 'subcategory' | 'extraInfo',
//     value: any
//   ) => void;
// };

type DataTableRowProps = {
  dataKind: TableKind;
  row: Day | Night | Spot | Expense;
  updateParsedData: (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: any
  ) => void;
};

const EDITABLE_CELL_KEYS = {
  expense: ['category', 'subcategory', 'extraInfo'],
};

export default function DataTableRow(props: DataTableRowProps) {
  const { dataKind, row, updateParsedData } = props;

  const { data: categories, error } = useCategories();

  const { validationErrors } = useDataValidation({ dataKind, row });

  return (
    <TableRow key={row.id}>
      {dataKind === 'day' && (
        <Fragment>
          <DataTableCell
            value={(row as Day).date}
            validationErrors={validationErrors['date']}
          />
          <DataTableCell
            value={(row as Day).kilometers}
            validationErrors={validationErrors['kilometers']}
          />
        </Fragment>
      )}
      {dataKind === 'night' && (
        <Fragment>
          <DataTableCell
            value={(row as Night).date}
            validationErrors={validationErrors['date']}
          />
          <DataTableCell
            value={(row as Night).city}
            validationErrors={validationErrors['city']}
          />
          <DataTableCell
            value={(row as Night).sleptAt}
            validationErrors={validationErrors['sleptAt']}
          />
          <DataTableCell
            value={(row as Night).extraInfo}
            validationErrors={validationErrors['extraInfo']}
          />
          <DataTableCell
            value={!!Number((row as Night).free) ? 'Yes' : 'No'}
            validationErrors={validationErrors['free']}
          />
        </Fragment>
      )}
      {dataKind === 'spot' && (
        <Fragment>
          <DataTableCell
            value={(row as Spot).name}
            validationErrors={validationErrors['name']}
          />
          <DataTableCell
            value={(row as Spot).spotKind}
            validationErrors={validationErrors['spotKind']}
          />
          <DataTableCell
            value={(row as Spot).state}
            validationErrors={validationErrors['state']}
          />
          <DataTableCell
            value={(row as Spot).shire}
            validationErrors={validationErrors['shire']}
          />
        </Fragment>
      )}
      {dataKind === 'expense' && (
        <Fragment>
          <DataTableCell
            value={(row as Expense).date}
            validationErrors={validationErrors['date']}
          />
          <DataTableCell.Selectable
            value={(row as Expense).category}
            validationErrors={validationErrors['category']}
            onEdit={(value: string) => updateParsedData(row.id!, 'category', value)}
            selectOptions={Object.keys(categories ?? {})}
          />
          <DataTableCell.Selectable
            value={(row as Expense).subcategory}
            validationErrors={validationErrors['subcategory']}
            onEdit={(value: string) => updateParsedData(row.id!, 'subcategory', value)}
            selectOptions={categories?.[(row as Expense).category] ?? []}
          />
          <DataTableCell.Editable
            value={(row as Expense).extraInfo}
            validationErrors={validationErrors['extraInfo']}
            onEdit={(value: string) => updateParsedData(row.id!, 'extraInfo', value)}
          />
          <DataTableCell
            value={(row as Expense)?.value ?? ''}
            validationErrors={validationErrors['value']}
          />
          <DataTableCell
            value={(row as Expense).currency ?? ''}
            validationErrors={validationErrors['currency']}
          />
          <DataTableCell
            value={(row as Expense)?.valueEur ?? ''}
            validationErrors={validationErrors['valueEur']}
          />
        </Fragment>
      )}
    </TableRow>
  );
}
