import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD'

moment.locale('nb');

export const dates = [
  {
    title: 'I forrige uke',
    from: moment().startOf('week').subtract(7, 'day').format(DATE_FORMAT),
    to: moment().startOf('week').subtract(1, 'day').format(DATE_FORMAT),
  },
  {
    title: 'I denne uken',
    from: moment().startOf('week').format(DATE_FORMAT),
    to: moment().endOf('week').format(DATE_FORMAT),
  },
  {
    title: 'I går',
    from: moment().subtract(1, 'day').format(DATE_FORMAT),
    to: moment().format(DATE_FORMAT),
  },
];
