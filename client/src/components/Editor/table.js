//import JsonData from './tablelist.json';
import React, { useState, useEffect } from 'react';
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
    const [id, setId] = useState("");
    const [posts, setPosts] = useState({JsonData:[] });
    const handleDeleteClose = () => setShow(false);
    const handleDeleteShow = (id) => {
      setShow(true)
      setId(id)
    };
    const confirmDelete = async() =>{
      try {
        const url = "/api/editor/channel/"+id;
        const { data: res } = await axios.delete(url)
        //fetchPostList()
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          //setError(error.response.data.message);
        }
      }
      handleDeleteClose();
    }
     
    const edit = async(id, value) =>{
      console.log(value)
      try {
        const url = "/api/editor/channel";
        const { data: res } = await axios.patch(url,{id:id, enable:value})
        //fetchPostList()
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          //setError(error.response.data.message);
        }
      }
    }

    useEffect(() => {
		const fetchPostList = async() =>{
            const {data} = await axios.get("/api/editor/channellist")
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
                <td><Button variant="outline-secondary" onClick={() => handleDeleteShow(info._id)} > Delete</Button></td>
                <td>
                    <Form>
                     <Form.Check type="switch" id="custom-switch" checked={info.enable}  onChange={()=>edit(info._id,!info.enable)}/>
                     </Form>
                </td>
            </tr>
        );
    }
)

return(
    <div>
        <Table striped bordered hover >
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
            <Button variant="secondary" onClick={confirmDelete }>
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