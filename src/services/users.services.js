import axios from 'axios';

const endpoint = 'https://gorest.co.in/public/v1/users';

async function getUsers() {
  try {
    const persons = await axios.get(endpoint);
    console.log('persons',persons.data.data);
    return persons.data.data;
  } catch (error) {
    console.log(error);
  }
};


export {
  getUsers,
};
