import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import EXPENSE_CATEGORY_EMOJIS from '@/constants/expenseCategoryEmojis';
import { euroFormatter } from '@/utils/number';
import { Expense } from '../../hooks/useSearch';

interface Props {
  keyword: string;
  onClose: () => void;
  expenses?: Array<Expense>;
}

export default function Expenses(props: Props) {
  const { keyword, onClose, expenses } = props;

  const shouldShow = keyword.length > 0;

  if (!shouldShow) return null;

  const hasExpenses = expenses && expenses.length > 0;

  const navigate = useNavigate();
  const goToExpenses = () => {
    onClose();
    navigate('/expenses', {
      state: {
        keyword,
      },
    });
  };

  return (
    <Stack gap={1} sx={{ backgroundColor: 'white', p: 2, flexGrow: 1, width: '100%' }}>
      <Typography sx={{ fontSize: 22, fontWeight: 500, textAlign: 'center' }}>Expenses</Typography>
      {hasExpenses ? (
        <Stack>
          {expenses?.slice(0, 5).map((expense) => (
            <Stack
              key={expense.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              sx={{ p: 1 }}
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography sx={{ fontSize: 'var(--spacing-5)' }}>
                  {
                    EXPENSE_CATEGORY_EMOJIS[
                      expense.category as keyof typeof EXPENSE_CATEGORY_EMOJIS
                    ].emoji
                  }
                </Typography>
                <Stack>
                  <Typography>{expense.details}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'var(--text-color-secondary)' }}>
                    {expense.category}
                    {expense.subcategory ? ` / ${expense.subcategory}` : ''}
                  </Typography>
                </Stack>
              </Stack>
              <Stack alignItems="end">
                <Typography>{euroFormatter(expense.valueEur)}</Typography>
                <Typography sx={{ fontSize: 12, color: 'var(--text-color-secondary)' }}>
                  {expense.country}
                </Typography>
              </Stack>
            </Stack>
          ))}
          {expenses && expenses.length > 5 && (
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{ pl: 2, fontSize: 14 }}>+ {expenses.length - 5} expenses</Typography>
              <Button
                onClick={goToExpenses}
                variant="text"
                sx={{ color: 'var(--text-color-secondary)', fontSize: 14 }}
              >
                Show all
              </Button>
            </Stack>
          )}
        </Stack>
      ) : (
        <Typography sx={{ fontSize: 14, color: 'var(--text-color-secondary)', pt: 2 }}>
          No expenses found.
        </Typography>
      )}
    </Stack>
  );
}
