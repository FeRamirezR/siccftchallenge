import axios from 'axios';

const endpoint = 'http://localhost:8080/persons';

async function getPersons() {
  try {
    const persons = await axios.get(endpoint+'/all');
    return persons.data;
  } catch (error) {
    console.log(error);
  }
};

async function createPersons(dataPost) {
    try {
        // var fecha = new Date(dataPost.birthDate);
        // var dias = 1;
        // fecha.setDate(fecha.getDate() + dias);
        // dataPost.birthDate=fecha.toISOString().substring(0, 10);

        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updatePersons(dataPost) {
    try {
        // var fecha = new Date(dataPost.birthDate);
        // var dias = 1;
        // fecha.setDate(fecha.getDate() + dias);
        // dataPost.birthDate=fecha.toISOString().substring(0, 10);
        const updatePerson = {
            "idPerson": dataPost.idPerson,
            "doc": dataPost.doc,
            "idDocType": "280e8ed9-1c40-4ac2-adef-5b3c1710644d",
            "name": dataPost.name,
            "lastName": dataPost.lastName,
            "address": dataPost.address,
            "email": dataPost.email,
            "phone": dataPost.phone
          }
          console.log('updatePerson', updatePerson);
        const response= await axios.post(endpoint+'/save', updatePerson);
        return response.data;
    }catch(error){
      console.log(error);
    }
}

async function deletePerson(id){
    try {
        await axios.delete(endpoint+"/delete/"+id);
        
    } catch (error) {
    console.log(error);
    }
}

export {
    getPersons,
    createPersons,    
    updatePersons,
    deletePerson,
};
