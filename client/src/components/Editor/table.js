//import JsonData from './tablelist.json';
import React, { useState, state, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BsTrashFill } from 'react-icons/bs';
import { Form } from 'react-bootstrap';
//import DeletePopUp from './delete';
function TableUI(){
    const [show, setShow] = useState(false);
    //const [data, setData] = useState({ _id: "62456c48f7c100063224b073", enable: "" });
    const [posts, setPosts] = useState({JsonData:[] });
    const handleDeleteClose = () => setShow(false);
    const handleDeleteShow = () => setShow(true);
      useEffect(() => {
		const fetchPostList = async() =>{
            const {data} = await axios("/api/editor/channellist")
            setPosts({JsonData:data})
            console.log(data)
        }
        fetchPostList()
	},[setPosts])

const DisplayData=posts.JsonData.map(
    (info)=>{
        return(
            <tr key={info._id}>
                <td>{info.name}</td>
                <td>{info.link}</td>
                <td>{info.tags}</td>
                <td><Button variant="outline-secondary" onClick={handleDeleteShow} > Delete</Button></td>
                <td>
                    <Form>
                     <Form.Check type="switch" id="custom-switch" />
                     </Form>
                </td>
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
                <th></th>
                <th>Enable</th>
                </tr>
            </thead>
            <tbody>
             
                
                {DisplayData}
                
            </tbody>
        </Table>
        <Modal show={show} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please confirm to delete.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Confirm
            </Button>
            <Button variant="primary" onClick={handleDeleteClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal> 
    </div>
);
}

export default TableUI;