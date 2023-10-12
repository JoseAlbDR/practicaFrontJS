import { loginUser } from './loginModel.js';

export const loginController = async (form) => {
  const username = form.elements['username'].value;
  const password = form.elements['password'].value;
  const user = {
    username,
    password,
  };

  const res = await loginUser(user);
  console.log(res);
};
