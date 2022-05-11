function Alert({message, buttons}) {
  return (
    <div className='alert-container'>
      <div className='alert'>
        <p>{message}</p>
        <div className="button-group">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default Alert;