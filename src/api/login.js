import php from 'utils/php'


export function loginByEmail(email, password) {
  const data = {
      username:email,
      password:password
  };
  return php({
    url: '/user/login/'+email,
    method: 'post',
    data
  });
}

export function logout() {
  return php({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return php({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

