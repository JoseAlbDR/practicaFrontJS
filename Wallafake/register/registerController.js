import { loginUser } from './registerModel.js';

export const registerController = async (form) => {
  const username = form.elements['username'].value;
  const password = form.elements['password'].value;
  const user = {
    username,
    password,
  };

  const res = await registerUser(user);
  console.log(res);
};
