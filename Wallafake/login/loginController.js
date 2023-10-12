import { loginUser } from './loginModel.js';

export const loginController = async (form) => {
  const username = form.elements['username'].value;
  const password = form.elements['password'].value;
  const user = {
    username,
    password,
  };

  try {
    const res = await loginUser(user);
    localStorage.setItem('accessToken', res.accessToken);
  } catch (error) {
    console.log(error);
  }
};
