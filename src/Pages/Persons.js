import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getPersons,
  createPersons,
  updatePersons,
  deletePerson,
} from '../services/persons.services';

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

const Persons = () => {

  const columns=[
    {
        title: 'Nombre',
        field: 'name'
    },
    {
        title: 'Apellido',
        field: 'lastName'
    },
    {
      title: 'Documento',
      field: 'doc',
      type:'numeric'
  },
    {
      title: 'Correo',
      field: 'email'
    },
    {
      title: 'Telefono',
      field: 'phone',
    },
    {
        title: 'Dirección',
        field: 'address'
    }
  ];
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [personaSeleccionado, setPersonaSeleccionado]=useState({
    name: "",
    lastName: "",
    doc: "",
    email: "",
    phone: "",
    dirección: "",
    idDocType: "280e8ed9-1c40-4ac2-adef-5b3c1710644d",
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setPersonaSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log('DATA',personaSeleccionado);
  }

  const peticionGet=async()=>{
    const patients= await getPersons();
    setData(patients);
  }

  const peticionPost=async()=>{
    console.log('POST',personaSeleccionado);

    const postPersons = await createPersons(personaSeleccionado);    
    setData(data.concat(postPersons));
    abrirCerrarModalInsertar();
   
  };

  const peticionUpdate=async()=>{
    const updtPersons = await updatePersons(personaSeleccionado);   
    setData(data.concat(updtPersons));
    abrirCerrarModalEditar();
  }

  const peticionDelete=async()=>{
    await deletePerson(personaSeleccionado.idPerson)
    setData(data.filter(persona=>persona.idPerson!==personaSeleccionado.idPerson));
    abrirCerrarModalEliminar();
  }

  const seleccionarPersona=(persona, caso)=>{
    setPersonaSeleccionado(persona);
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
        <h3>Agregar Nuevo usuario</h3>
        <TextField className={'inputMaterial'} label="Nombre" name="name" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Apellido" name="lastName" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Correo" name="email" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Telefono" name="phone" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Documento" name="doc" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Dirección" name="address" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionPost()}>Insertar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEditar=(
    <div className={'modal'}>
        <h3>Editar usuario</h3>
        <TextField className={'inputMaterial'} label="Nombre" name="name" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Apellido" name="lastName" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Correo" name="email" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Telefono" name="phone" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Documento" name="doc" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Dirección" name="address" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionUpdate()}>Editar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEliminar=(
    <div className={'modal'}>
      <p>Estás seguro que deseas eliminar al usuario <b>{personaSeleccionado && personaSeleccionado.persona}</b>? </p>
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
      title='Personas'
      editAction={seleccionarPersona}
      insertAction={abrirCerrarModalInsertar}
      deleteAction={seleccionarPersona}
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

export default Persons;
