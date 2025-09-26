import { Fragment } from 'react';
import TableRow from '@mui/material/TableRow';
import useCategories from '../../hooks/useCategories';
import useDataValidation from '../../hooks/useDataValidation';
import useInserterContext from '../../hooks/useInserterContext';
import { Day, Expense, Night, Spot, TableKind } from '../../types';
import DataTableCell from './DataTableCell';

function isDayRow(row: unknown, dataKind: string): row is Day {
  return dataKind === 'day';
}

function isNightRow(row: unknown, dataKind: string): row is Night {
  return dataKind === 'night';
}

function isExpenseRow(row: unknown, dataKind: string): row is Expense {
  return dataKind === 'expense';
}

function isSpotRow(row: unknown, dataKind: string): row is Spot {
  return dataKind === 'spot';
}

interface Props {
  dataKind: TableKind;
  row: Day | Night | Expense | Spot;
}

export default function DataTableRow(props: Props) {
  const { dataKind, row } = props;

  const {
    state: { parsedData },
    actions: { setParsedData },
  } = useInserterContext();

  const { data: categories } = useCategories(dataKind === 'expense');
  const { validationErrors } = useDataValidation({ dataKind, row });

  const updateParsedData = (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: string
  ) => {
    if (!Array.isArray(parsedData)) return;

    const newParsedData = (parsedData as Expense[])?.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          [key]: value,
        } as Expense;
      }

      return data as Expense;
    }) as Expense[];

    setParsedData(newParsedData);
  };

  return (
    <TableRow key={row.id}>
      {isDayRow(row, dataKind) && (
        <Fragment>
          <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
          <DataTableCell value={row.kilometers} validationErrors={validationErrors['kilometers']} />
        </Fragment>
      )}
      {isNightRow(row, dataKind) && (
        <Fragment>
          <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
          <DataTableCell value={row.city} validationErrors={validationErrors['city']} />
          <DataTableCell value={row.sleptAt} validationErrors={validationErrors['sleptAt']} />
          <DataTableCell value={row.extraInfo} validationErrors={validationErrors['extraInfo']} />
          <DataTableCell
            value={!!Number(row.free) ? 'Yes' : 'No'}
            validationErrors={validationErrors['free']}
          />
        </Fragment>
      )}
      {isSpotRow(row, dataKind) && (
        <Fragment>
          <DataTableCell value={row.name} validationErrors={validationErrors['name']} />
          <DataTableCell value={row.spotKind} validationErrors={validationErrors['spotKind']} />
          <DataTableCell value={row.state} validationErrors={validationErrors['state']} />
          <DataTableCell value={row.shire} validationErrors={validationErrors['shire']} />
        </Fragment>
      )}
      {isExpenseRow(row, dataKind) && (
        <Fragment>
          <DataTableCell value={row.date} validationErrors={validationErrors['date']} />
          <DataTableCell.Selectable
            value={row.category}
            validationErrors={validationErrors['category']}
            onEdit={(value: string) => updateParsedData(row.id!, 'category', value)}
            selectOptions={Object.keys(categories ?? {})}
          />
          <DataTableCell.Selectable
            value={row.subcategory}
            validationErrors={validationErrors['subcategory']}
            onEdit={(value: string) => updateParsedData(row.id!, 'subcategory', value)}
            selectOptions={categories?.[row.category] ?? []}
          />
          <DataTableCell.Editable
            value={row.extraInfo}
            validationErrors={validationErrors['extraInfo']}
            onEdit={(value: string) => updateParsedData(row.id!, 'extraInfo', value)}
          />
          <DataTableCell value={row?.value ?? ''} validationErrors={validationErrors['value']} />
          <DataTableCell
            value={row.currency ?? ''}
            validationErrors={validationErrors['currency']}
          />
          <DataTableCell
            value={row?.valueEur ?? ''}
            validationErrors={validationErrors['valueEur']}
          />
        </Fragment>
      )}
    </TableRow>
  );
}
