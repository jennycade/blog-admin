import { useState } from 'react';

// components
import Alert from './Alert';

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
        <Alert
          message="Are you sure you want to leave this page? Your changes will not be saved."
          buttons={(
            <>
              <button onClick={handleConfirmCancelClick}>
                Yes, discard changes
              </button>
              <button className="btn-warning" onClick={handleDontCancelClick}>
                No, stay here
              </button>
            </>
          )}
        />
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