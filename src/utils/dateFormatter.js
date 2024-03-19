import { format } from 'date-fns';

export const formatDateFromInput = (inputDate) => {
  const date = new Date(inputDate);
  return format(date, 'dd/MM/yyyy');
};
