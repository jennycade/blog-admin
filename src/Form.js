import { useState } from 'react';

function Form({handleSubmit, leaveForm, children}) {

  return(
    <form onSubmit={handleSubmit}>
      { children }

      <div className="button-group">
        <button
          type="submit"
          className="btn-primary"
        >Submit</button>

        {/* TODO: have this pull up a warning */}
        <button
          type="button"
          className="btn-warning"
          onClick={leaveForm}
        >Cancel</button>

      </div>
    </form>
  );
};

export default Form;