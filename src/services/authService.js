export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (username === 'username' && password === 'password') {
        resolve(true);
      } else {
        reject(false);
      }
    }, 5000);
  });
}

export function register(username, password, email, firstName, lastName) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (username && password && email && firstName && lastName) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 5000);
  });
}
