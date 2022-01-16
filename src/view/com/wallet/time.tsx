import { format } from 'timeago.js';

export const ActionTimeStamp = ({ timeStamp }: { timeStamp: string }) => {
  let time = format(timeStamp);
  let formatting = {
    ago: '',
    years: 'y',
    year: 'y',
    months: 'mo',
    month: 'mo',
    weeks: 'w',
    week: 'w',
    days: 'd',
    day: 'd',
    hours: 'hr',
    hour: 'hr',
    minutes: 'min',
    minute: 'min',
    seconds: 's',
  };

  for (const format in formatting) {
    time = time.replace(`${format}`, `${(formatting as any)[format]}`);
  }

  if (time !== 'just now') {
    time = time.split(' ').join('');
  }

  return <span className="gray">{time}</span>;
};
