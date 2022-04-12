import JsonData from './testTablelist.json';
import React,{useState} from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
//import { BsTrashFill } from 'react-icons/bs';
//import DeletePopUp from '../PopUp/delete'
function TableUI(){
    const [show, setShow] = useState(false);
  
    const handleDeleteClose = () => setShow(false);
    const handleDeleteShow = () => setShow(true);
const DisplayData=JsonData.map(
    (info)=>{
        return(
            <tr>
                <td>{info.name}</td>
                <td>{info.link}</td>
                <td>{info.tags}</td>
                <td><Button onClick={handleDeleteShow()} /> </td>
                <td>
                    <Form>
                     <Form.Check type="switch" id="custom-switch"/>
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