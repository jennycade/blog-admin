import { useState } from 'react';

function Form({handleSubmit, leaveForm, children}) {

  // state
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  const handleCancelClick = () => {
    setShowCancelWarning(true);
  }

  const handleDontCancelClick = () => {
    setShowCancelWarning(false);
  }

  const handleConfirmCancelClick = () => {
    leaveForm();
  }

  return (
    <>
      { showCancelWarning && (
        // TODO: abstract into <Alert> component
        <div className='alert-container'>
          <div className='alert'>
            <p>Are you sure you want to leave this page? Your changes will not be saved.</p>
            <div className="button-group">
              <button onClick={handleConfirmCancelClick}>
                Yes, discard changes
              </button>
              <button onClick={handleDontCancelClick}>
                No, stay here
              </button>
            </div>
          </div>
        </div>
      )

      }
      <form onSubmit={handleSubmit}>
        { children }

        <div className="button-group">
          <button
            type="submit"
            className="btn-primary"
          >Submit</button>

          <button
            type="button"
            className="btn-warning"
            onClick={handleCancelClick}
          >Cancel</button>

        </div>
      </form>
    </>
  );
};

export default Form;