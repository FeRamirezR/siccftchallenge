import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getUsers,
} from '../services/users.services';


const Users = () => {

  const columns=[
    {
        title: 'id',
        field: 'id',
        type: 'numeric'
    },
    {
      title: 'Nombre',
      field: 'name'
  },
    {
      title: 'Correo',
      field: 'email'
    },
    {
      title: 'Genero',
      field: 'gender',
    },
    {
        title: 'Estado',
        field: 'status'
    }
  ];

  const [data, setData] = useState([]);


  const peticionGet=async()=>{
    const users= await getUsers();
    setData(users);
  }


  useEffect(()=>{
    peticionGet();
  }, []);


  return (
    <>
    <GridTable
      columns={columns}
      dataApi={data}
      title='Usuarios'
    />
    </>
  );
};

export default Users;
