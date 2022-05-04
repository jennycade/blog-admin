function Time(props) {
  // props
  const {timeString} = props;

  return (
    <time dateTime={timeString}>
      {timeString}
    </time>
  );
};

export default Time;