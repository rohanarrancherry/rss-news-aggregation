import JsonData from '../PopUp/ChannelMasterData.json';
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function MasterTableUI(){
    /*const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/editor/:eId/channellist";
			const { data: res } = await axios.get(url);
			localStorage.setItem("token", res.accessToken);
			if (res.role === "user"){
				window.location = '/'
			}
			else if (res.role === "editor"){
				window.location = '/editor'
			}

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
  */
    const DisplayData=JsonData.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.name}</td>
                    <td>{info.link}</td>
                    <td>{info.tags}</td>                    
                </tr>
            );
        }
    )
    
    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </Table>
             
        </div>
    );
    }

    export default MasterTableUI;