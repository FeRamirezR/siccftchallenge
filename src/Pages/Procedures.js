import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getProcedures,
  createProcedures,
  updateProcedures,
  deleteProcedure,
} from '../services/procedures.services';

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

const Procedures = () => {

  const columns=[
    {
        title: 'Nro. Radicado',
        field: 'filedNum',
        type:'numeric'
    },
    {
        title: 'Año Radicado',
        field: 'filedYear',
        type:'numeric'
    },
    {
      title: 'Tramite',
      field: 'procedureName',
    },
    {
      title: 'Descripción',
      field: 'procedureDesc',
    },
    {
      title: 'Persona que Radica',
      field: 'idPerson'
    },
    {
      title: 'Funcionario que Recibe',
      field: 'idEmployee',
    }
  ];
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [tramiteSeleccionado, setTramiteSeleccionado]=useState({
    filedNum: "",
    filedYear: "",
    procedureName: "",
    procedureDesc: "",
    idPerson: "",
    idEmployee: ""
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setTramiteSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const peticionGet=async()=>{
    const patients= await getProcedures();
    setData(patients);
  }

  const peticionPost=async()=>{
    const postProcedures = await createProcedures(tramiteSeleccionado);    
    setData(data.concat(postProcedures));
    abrirCerrarModalInsertar();
   
  };

  const peticionUpdate=async()=>{
    const updtProcedures = await updateProcedures(tramiteSeleccionado);   
    setData(data.concat(updtProcedures));
    abrirCerrarModalEditar();
  }

  const peticionDelete=async()=>{
    await deleteProcedure(tramiteSeleccionado.idProcedure)
    setData(data.filter(tramite=>tramite.idProcedure!==tramiteSeleccionado.idProcedure));
    abrirCerrarModalEliminar();
  }

  const seleccionarTramite=(tramite, caso)=>{
    setTramiteSeleccionado(tramite);
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
        <h3>Nuevo Tramite</h3>
        <TextField className={'inputMaterial'} label="Nro. Radicado" name="filedNum" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Año Radicado" name="filedYear" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Tramite" name="procedureName" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Descripción" name="procedureDesc" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Persona que Radica" name="idPerson" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Funcionario que Recibe" name="idEmployee" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionPost()}>Insertar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEditar=(
    <div className={'modal'}>
        <h3>Editar Tramite</h3>
        <TextField className={'inputMaterial'} label="Nro. Radicado" name="filedNum" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Año Radicado" name="filedYear" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Tramite" name="procedureName" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Descripción" name="procedureDesc" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Persona que Radica" name="idPerson" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Funcionario que Recibe" name="idEmployee" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionUpdate()}>Editar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEliminar=(
    <div className={'modal'}>
      <p>Estás seguro que deseas eliminar el tramite <b>{tramiteSeleccionado && tramiteSeleccionado.tramite}</b>? </p>
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
      title='Tramites'
      editAction={seleccionarTramite}
      insertAction={abrirCerrarModalInsertar}
      deleteAction={seleccionarTramite}
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

export default Procedures;
