import React,{useState,useEffect} from 'react';
import { Button , Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUI from './table';
import MasterTableUI from './masterTable'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./navbar";
import LoadingButton from "../LoadingButton/LoadingButton";
function ChannelList(props) {
  const [postData, setData] = useState({ source: "", url: "" ,category:"", enable:true});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setData({ ...postData, [e.target.name]: e.target.value });

	};
  const rowSelect = (row) =>{
    setButtonDisabled(false)
    setData({ ...postData, ...row });
  }
  const addNewChannel = async() =>{
    
    props.onHide();
    console.log(postData)
    try {
      const url = "/api/editor/addchannel";
      const { data: res } = await axios.post(url,postData)
      props.changeForceUI()
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {}
    }

  }
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
    setButtonDisabled(true)
    setData({ source: "", url: "" ,category:"", enable:true})
  };

 
  return (
    <>
     <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Channel List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <MasterTableUI onSelect={rowSelect} />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{float: 'left'}} variant="outline-dark" onClick={() =>{props.onHide(); setButtonDisabled(true);}}>Cancel</Button>
        <Button style={{float: 'left'}} disabled={buttonDisabled} variant="outline-primary" onClick={() =>{ addNewChannel(); }}>Ok</Button>
        <Button style={{float: 'right'}} variant="outline-success" onClick={() => { props.onHide(); handleShow();}}>Add New</Button>
      </Modal.Footer>
    </Modal>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control required size="sm" type="text" placeholder="Channel Name" name="source" onChange={handleChange}	value={postData.name}/>
          <Form.Control required size="sm" type="text" placeholder="Channel Link" name="url" onChange={handleChange}	value={postData.link} />
          <Form.Control size="sm" type="text" placeholder="Tag" name="category" onChange={handleChange}	value={postData.tags}/>
          <Form.Check enabled type="switch" id="custom-switch" label="Enable"  name="enable" onChange={handleChange}	checked={postData.enable} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={buttonDisabled} onClick={()=>{addNewChannel(); handleClose();}}>
            Add Channel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
   
  );
}

function EditorUi(){
  const [modalShow, setModalShow] = React.useState(false);
  const [value, setValue] = useState(1);
  const changeForceUI = () =>{
    console.log("called force")
    setValue((value)=>value+1)
  }
  return (  
    <div>
      <Navigation/>
    <div>
      <div class="container" style={{display: "flex", justifyContent: "space-between", margin:"2%"}}>
      <h2 style={{display: "inline"}}>LIST OF RSS FEEDs</h2>
  
      <Button style={{display: "inline"}} variant="secondary" size="sm" onClick={() => setModalShow(true)}>ADD Channel</Button>
      <LoadingButton />
        <ChannelList
          show={modalShow}
          changeForceUI = {changeForceUI}
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
      <TableUI value={value} />
      </div>

    </div>
    </div>
  );
}
  
export default EditorUi;