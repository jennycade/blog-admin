function Time(props) {
  // props
  const {dateInput} = props;

  // convert date
  const date = new Date(dateInput);
  
  // 1984-08-03
  const absoluteDateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  // August 3, 1984 8:50 pm
  // calculate am/pm
  const hour24 = date.getHours();
  const timeOfDay = date.hour24 < 12 ? 'am' : 'pm';
  // calculate 12-hr clock hour
  let hour12;
  if (hour24 === 0) {
    hour12 = 12;
  } else if (hour24 <= 11) {
    hour12 = hour24;
  } else {
    hour12 = hour24 - 12;
  }
  
  const fullDate = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hour12}:${date.getMinutes().toString().padStart(2, '0')} ${timeOfDay}`;

  return (
    <time dateTime={absoluteDateString}>
      {fullDate}
    </time>
  );
};

export default Time;