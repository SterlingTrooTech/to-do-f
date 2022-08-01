const validate = values => {
  const errors = {}
  const requiredFields = [
    'userName',
    'gender',
    'age',
    'date',
    'taskName',
    'status'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = ' is Required'
    }
  });
  if ( !/^[a-zA-Z ]*$/i.test(values.userName) ) {
    errors.userName = ' can only have alphabets and white space'
  } else if (values?.userName?.length > 15) {
    errors.userName = 'Must be 15 characters or less'
  }
  return errors
}

export default validate;