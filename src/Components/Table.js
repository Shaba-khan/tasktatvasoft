import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {useSelector, useDispatch} from 'react-redux'
import  fetchaction from '../actions'

function Table (){
const users= useSelector(state=>state.rootReducer.FetchuserReducer.users)
const[isLoading,setisLoading]=useState(true);
const dispatch= useDispatch();

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'profileImage',
    headerName: 'Profile Image',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'Email',
    headerName: 'Email',
    type: 'email',
    width: 110,
    editable: true,
  },
  {
    field: 'State',
    headerName: 'State',
    width: 110,
    editable: true,
  },
  {
    field: 'city',
    headerName: 'City',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'profileImage') || ''} ${
        params.getValue(params.id, 'name') || ''
      }`,
  },
];

const rows = [
      { id: 1, name: 'Snow', profileImage: 'Jon', Email: 35 ,City:'default', State:'default'},
  ];
 
 useEffect(()=>{
 	dispatch(fetchaction());
 },[]);

 
console.log(users)

	return(
	    <div>
	    <div style={{ height: 400, width: '100%' }}>
		      <DataGrid
		        rows={rows}
		        columns={columns}
		        pageSize={5}
		      />
		  </div>
	    </div>
	)
}

export default Table