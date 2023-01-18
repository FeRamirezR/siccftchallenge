import axios from 'axios';

const endpoint = 'http://localhost:8080/employees';

async function getEmployees() {
  try {
    const employees = await axios.get(endpoint+'/all');
    return employees.data;
  } catch (error) {
    console.log(error);
  }
};

async function createEmployees(dataPost) {
    try {
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updateEmployees(dataPost) {
    try {
        const updateEmployee = {
            "idEmployee": dataPost.idEmployee,
            "deparmentWork": dataPost.deparmentWork,
            "dateAdmission": dataPost.dateAdmission,
            "idPerson": dataPost.idPerson
          }
        const response= await axios.post(endpoint+'/save', updateEmployee);
        return response.data;
    }catch(error){
      console.log(error);
    }
}

async function deleteEmployee(id){
    try {
        await axios.delete(endpoint+"/delete/"+id);
        
    } catch (error) {
    console.log(error);
    }
}

export {
    getEmployees,
    createEmployees,    
    updateEmployees,
    deleteEmployee,
};
