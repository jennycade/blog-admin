import { useState } from 'react';
import { Link } from 'react-router-dom';

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
              { typeof leaveForm === 'function' ? (
                <button onClick={handleConfirmCancelClick}>
                  Yes, discard changes
                </button>
                ) : (
                  <Link className="link-button" to={leaveForm}>
                    Yes, discard changes
                  </Link>
                )
              }
              
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