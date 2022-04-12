import JsonData from '../PopUp/ChannelMasterData.json';
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function MasterTableUI(){
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