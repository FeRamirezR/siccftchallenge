import axios from 'axios';

const endpoint = 'http://localhost:8080/procedures';

async function getProcedures() {
  try {
    const procedures = await axios.get(endpoint+'/all');
    return procedures.data;
  } catch (error) {
    console.log(error);
  }
};

async function createProcedures(dataPost) {
    try {
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updateProcedures(dataPost) {
    try {
        const updateProcedure = {
            "idProcedure": dataPost.idProcedure,
            "filedNum": dataPost.filedNum,
            "filedYear": dataPost.filedYear,
            "procedureName": dataPost.procedureName,
            "procedureDesc": dataPost.procedureDesc,
            "idPerson": dataPost.idPerson,
            "idEmployee": dataPost.idEmployee
          }
        const response= await axios.post(endpoint+'/save', updateProcedure);
        return response.data;
    }catch(error){
      console.log(error);
    }
}

async function deleteProcedure(id){
    try {
        await axios.delete(endpoint+"/delete/"+id);
        
    } catch (error) {
    console.log(error);
    }
}

export {
    getProcedures,
    createProcedures,    
    updateProcedures,
    deleteProcedure,
};
