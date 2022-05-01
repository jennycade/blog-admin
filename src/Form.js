import Input from "./Input";

function Form(props) {
  // props
  const { formData } = props;

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