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

  // const { validationErrors } = useDataValidation({ dataKind, row });

  return (
    <Fragment />
    // <TableRow key={row.id}>
    //   {dataKind === 'day' && (
    //     <Fragment>
    //       <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
    //       <DataTableCell
    //         value={row.kilometers}
    //         validationErrors={validationErrors['kilometers']}
    //       />
    //     </Fragment>
    //   )}
    //   {dataKind === 'night' && (
    //     <Fragment>
    //       <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
    //       <DataTableCell value={row.city} validationErrors={validationErrors['city']} />
    //       <DataTableCell
    //         value={row.sleptAt}
    //         validationErrors={validationErrors['sleptAt']}
    //       />
    //       <DataTableCell
    //         value={row.extraInfo}
    //         validationErrors={validationErrors['extraInfo']}
    //       />
    //       <DataTableCell
    //         value={!!Number(row.free) ? 'Yes' : 'No'}
    //         validationErrors={validationErrors['free']}
    //       />
    //     </Fragment>
    //   )}
    //   {dataKind === 'spot' && (
    //     <Fragment>
    //       <DataTableCell value={row.name} validationErrors={validationErrors['name']} />
    //       <DataTableCell
    //         value={row.spotKind}
    //         validationErrors={validationErrors['spotKind']}
    //       />
    //       <DataTableCell value={row.state} validationErrors={validationErrors['state']} />
    //       <DataTableCell value={row.shire} validationErrors={validationErrors['shire']} />
    //     </Fragment>
    //   )}
    //   {dataKind === 'expense' && (
    //     <Fragment>
    //       <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
    //       <DataTableCell.Selectable
    //         value={row.category}
    //         validationErrors={validationErrors['category']}
    //         onEdit={(value: string) => updateParsedData(row.id!, 'category', value)}
    //         selectOptions={Object.keys(categories ?? {})}
    //       />
    //       <DataTableCell.Selectable
    //         value={row.subcategory}
    //         validationErrors={validationErrors['subcategory']}
    //         onEdit={(value: string) => updateParsedData(row.id!, 'subcategory', value)}
    //         selectOptions={categories?.[row.category] ?? []}
    //       />
    //       <DataTableCell.Editable
    //         value={row.extraInfo}
    //         validationErrors={validationErrors['extraInfo']}
    //         onEdit={(value: string) => updateParsedData(row.id!, 'extraInfo', value)}
    //       />
    //       <DataTableCell
    //         value={row?.value ?? ''}
    //         validationErrors={validationErrors['value']}
    //       />
    //       <DataTableCell
    //         value={row.currency ?? ''}
    //         validationErrors={validationErrors['currency']}
    //       />
    //       <DataTableCell
    //         value={row?.valueEur ?? ''}
    //         validationErrors={validationErrors['valueEur']}
    //       />
    //     </Fragment>
    //   )}
    // </TableRow>
  );
}
