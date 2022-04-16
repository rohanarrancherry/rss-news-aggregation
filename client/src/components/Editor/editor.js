import React,{useState} from 'react';
import { Button , Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUI from './table';
import MasterTableUI from './masterTable'

function ChannelList(props) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Channel List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <MasterTableUI />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{float: 'left'}} variant="outline-dark" onClick={props.onHide}>Cancel</Button>
        <Button style={{float: 'left'}} variant="outline-primary" onClick={props.onHide}>Ok</Button>
        <Button style={{float: 'right'}} variant="outline-success" onClick={() => { props.onHide(); handleShow();}}>Add New</Button>
      </Modal.Footer>
    </Modal>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control size="sm" type="text" placeholder="Channel Name" />
          <Form.Control size="sm" type="text" placeholder="Channel Link" />
          <Form.Control size="sm" type="text" placeholder="Tag" />
          <Form.Check enabled type="switch" id="custom-switch" label="Enable"/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Channel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
   
  );
}

function EditorUi(){
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
    <div>
      <div class="container" style={{display: "flex", justifyContent: "space-between", margin:"2%"}}>
      <h2 style={{display: "inline"}}>LIST OF RSS FEEDs</h2>
      <Button style={{display: "inline"}} variant="secondary" size="sm" onClick={() => setModalShow(true)}>ADD</Button>
      <ChannelList
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      <hr
        style={{
            color: "black",
            backgroundColor: "black",
            height: 5,
            marginLeft:"3%",
            marginRight:"3%"

        }}
    />
    </div>
    <div>
      <div class="container">
      <TableUI></TableUI>
      </div>

    </div>
    </div>
  );
}
  
export default EditorUi;