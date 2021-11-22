import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {useSelector, useDispatch} from 'react-redux'
import  fetchaction from '../actions'
import Button from '@mui/material/Button';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function Table (){
const users= useSelector(state=>state.rootReducer.FetchuserReducer.users)
const[isLoading,setisLoading]=useState(true);
const[userdata,setuserdata]=useState('');
const[singleUser,setsingleUser]=useState('');
const [open, setOpen] = useState(false);
const[isLoadingModal,setisLoadingModal]=useState(true);

const dispatch= useDispatch();

const columns = [
{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'profileImage',
    headerName: 'Profile Image',
    width: 150,
    editable: true,
    renderCell: (params) => <img src={params.value} />

  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'Email',
    headerName: 'Email',
    type: 'email',
    width: 110,
    editable: true,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'State',
    headerName: 'State',
    width: 180,
    editable: true,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
  },
  {
    field: 'city',
    headerName: 'City',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    valueGetter: (params) =>
      `${params.getValue(params.id, 'profileImage') || ''} ${
        params.getValue(params.id, 'name') || ''
      }`,
  },
  {
  field: "Action",
  renderCell: (params) => <Button variant="contained" color="primary" onClick={ (event) => {onOpenModal(event, params.value)} }> Action</Button>

 },
];

 
 useEffect(()=>{
 	dispatch(fetchaction());
    setTimeout(function(){let d=renderrow();
    	console.log(d)

    },3000)

 },[]);

const onOpenModal = (e,data) => {
    console.log(data,e)
    setsingleUser(data)
	setOpen(true);
	setisLoadingModal(false)
};
  
const onCloseModal = () => setOpen(false);


const renderrow=()=>{
	console.log(users)

	let data=users[0].results;
	let row=[]
    data.map((data,index)=>{
     let name=data.name.title+' '+data.name.first+' '+data.name.last;
     let email=data.email;
     let state=data.location.state;
     let city=data.location.city;
     let profilrimage=data.picture.thumbnail;
     let rowData={
     	id:index,
     	name:name,
     	profileImage:profilrimage,
     	Email:email,
     	City:city,
     	State:state,
     	Action:data
     }
      row.push(rowData)

    })
    setuserdata(row);
    setisLoading(false);

 }

	return(
	    <div>

	       <h1> Display Data</h1>
		    <div className="container mt-5">
			    <div className="row m-0 ">
				    <div className="col-md-12">
					    <div style={{ height: 400, width: '100%' }}>
				        
					    {isLoading?<p>Loadding.....</p>:
						      <DataGrid
						        rows={userdata}
						        columns={columns}
						        pageSize={5}
						      />
						  } 
						  </div>  
					  </div>
				  </div>
			  </div>
	          

			   <Modal open={open} onClose={onCloseModal} center>
			        <h3 className="pl-5 text-primary">User Record</h3>
			        {isLoadingModal ? <p>Loadding.....</p>:

			        <div className="row m-0 mt-2  p-5" >
						     
 			                <div className="col-md-6">
                             <label>First Name </label><br/>
                             <input type="text" value={singleUser.name.first} />

			                </div>
			                <div className="col-md-6">
				                <label>Email </label><br/>
	                             <input type="text" value={singleUser.email} />
			                </div>
			                <div className="col-md-6">
                             <label>Phone </label><br/>
                             <input type="text" value={singleUser.phone} />

			                </div>
			                <div className="col-md-6">
				                <label>Country </label><br/>
	                             <input type="text" value={singleUser.location.country} />
			                </div>
			                <div className="col-md-6">
                             <label>City</label><br/>
                             <input type="text" value={singleUser.location.city} />

			                </div>
			                <div className="col-md-6">
				                <label>State </label><br/>
	                             <input type="text" value={singleUser.location.state} />
			                </div>
			                <div className="col-md-6">
                             <label>postcode</label><br/>
                             <input type="text" value={singleUser.location.postcode} />

			                </div>
			                <div className="col-md-6">
				                <label>DOB</label><br/>
	                             <input type="text" name="gender" value={singleUser.dob.date} />

			                </div>
			                <div className="col-md-6">
				                <label>Age</label><br/>
	                             <input type="number" name="gender" value={singleUser.dob.age} />

			                </div>
                           <div className="col-md-6">
				                <label>Registered date</label><br/>
	                             <input type="text"  value={singleUser.registered.date} />

			                </div>
                         
			         </div>
				    } 

			   </Modal>
	    </div>
	   
	)
}

export default Table