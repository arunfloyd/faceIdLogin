export const checkValidData = (email,name) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  if (!isEmailValid) return "Email is not Valid";
  if(name.length < 2) return "Enter a valid Name" 
  

  return null;
};