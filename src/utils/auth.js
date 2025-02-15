const baseUrl = "http://localhost:3001";

const request = (url, options) => {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export const signUp = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signIn = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("jwt", data.token);
//         return data;
//       }
//       return Promise.reject("No token recieved");
//     });
// };

export const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
