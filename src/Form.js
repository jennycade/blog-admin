import { useState } from "react";
import Input from "./Input";

function Form(props) {
  // props
  const { formData } = props;

  // state
  const [values, setValues] = useState({});

  return(
    <form>
      {
        formData.map(field => {
          return (
            <>
              <Input
                id={field.id}
                label={field.label}
                type={field.type}
                value={field.value}
                onChange={() => {}}
              />
            </>
          );
        })
      }
    </form>
  );
};

export default Form;