import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployee,
} from '../services/employees.services';

//MODAL
import {Modal, TextField, Button} from '@material-ui/core';
import '../assets/css/modalStyles.css'
import {makeStyles} from '@material-ui/core/styles';

//styles modal
const useStyles = makeStyles((theme) => ({

  confirm:{
    color:'#fee3e3',
    backgroundColor:'#ED8384',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '2px 10px 1px',
    border: '1px solid #ED8384',
    borderRadius: '10px 10px',
    transition: 'all 0.4s ease 0s'
  },
  cancel:{
    color:'#ED8384',
    backgroundColor:'#FCE9E5',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '2px 10px 1px',
    border: '1px solid #ED8384',
    borderRadius: '10px 10px',
    transition: 'all 0.4s ease 0s',
    marginLeft: '5px'
  },
  iconos:{
    cursor: 'pointer'
  }, 
}));

const Employees = () => {

  const columns=[
    {
        title: 'Dependencia en la que labora',
        field: 'deparmentWork'
    },
    {
        title: 'Fecha de ingreso',
        field: 'dateAdmission',
        type: 'date'
    }
  ];
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado]=useState({
    deparmentWork: "",
    dateAdmission: "",
    idPerson: "8ccb6221-f6a1-438e-8d11-963943665301",
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setEmpleadoSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log('DATA',empleadoSeleccionado);
  }

  const peticionGet=async()=>{
    const patients= await getEmployees();
    setData(patients);
  }

  const peticionPost=async()=>{
    console.log('POST',empleadoSeleccionado);

    const postEmployees = await createEmployees(empleadoSeleccionado);    
    setData(data.concat(postEmployees));
    abrirCerrarModalInsertar();
   
  };

  const peticionUpdate=async()=>{
    const updtEmployees = await updateEmployees(empleadoSeleccionado);   
    setData(data.concat(updtEmployees));
    abrirCerrarModalEditar();
  }

  const peticionDelete=async()=>{
    await deleteEmployee(empleadoSeleccionado.idEmployee)
    setData(data.filter(empleado=>empleado.idEmployee!==empleadoSeleccionado.idEmployee));
    abrirCerrarModalEliminar();
  }

  const seleccionarEmpleado=(empleado, caso)=>{
    setEmpleadoSeleccionado(empleado);
    (caso==="Editar")?abrirCerrarModalEditar()
    :abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  }, []);

  
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const bodyInsertar=(
    <div className={'modal'}>
        <h3>Agregar Nuevo Empleado</h3>
        <TextField className={'inputMaterial'} label="Dependencia en la que labora" name="deparmentWork" onChange={handleChange}/>
        <br />
        <label for="start">Fecha de ingreso:</label>
        <br />
        <input type="date" className={'inputData'} name="dateAdmission" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionPost()}>Insertar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEditar=(
    <div className={'modal'}>
        <h3>Editar Empleado</h3>
        <TextField className={'inputMaterial'} label="Dependencia en la que labora" name="deparmentWork" onChange={handleChange}/>
        <br />
        <label for="start">Fecha de ingreso:</label>
        <br />
        <input type="date" className={'inputData'} name="dateAdmission" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionUpdate()}>Editar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEliminar=(
    <div className={'modal'}>
      <p>Estás seguro que deseas eliminar al usuario <b>{empleadoSeleccionado && empleadoSeleccionado.empleado}</b>? </p>
      <div align="right">
        <Button className={styles.confirm} onClick={()=>peticionDelete()}>Sí</Button>
        <Button className={styles.cancel} onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  );

  return (
    <>
    <GridTable
      columns={columns}
      dataApi={data}
      title='Empleados'
      editAction={seleccionarEmpleado}
      insertAction={abrirCerrarModalInsertar}
      deleteAction={seleccionarEmpleado}
    />
    <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
    </Modal>
    <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
    </Modal>
    <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
    </Modal>
    </>
  );
};

export default Employees;
