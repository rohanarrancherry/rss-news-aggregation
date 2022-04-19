import React,{useState} from 'react';
import { Button , Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUI from './table';
import MasterTableUI from './masterTable'
import axios from "axios";

function ChannelList(props) {
  const [postData, setData] = useState({ name: "", link: "" ,tags:"", enable:true});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
		setData({ ...postData, [e.target.name]: e.target.value });
	};
  const addNewChannel = async() =>{
    console.log(postData)
    try {
      const url = "/api/editor/addchannel";
      const { data: res } = await axios.post(url,postData)
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

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
    setData({ name: "", link: "" ,tags:"", enable:true})
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
          <MasterTableUI />
      </Modal.Body>
      <Modal.Footer>
        <Button style={{float: 'left'}} variant="outline-dark" onClick={props.onHide}>Cancel</Button>
        <Button style={{float: 'left'}} disabled={buttonDisabled} variant="outline-primary" onClick={props.onHide}>Ok</Button>
        <Button style={{float: 'right'}} variant="outline-success" onClick={() => { props.onHide(); handleShow();}}>Add New</Button>
      </Modal.Footer>
    </Modal>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control size="sm" type="text" placeholder="Channel Name" name="name" onChange={handleChange}	value={postData.name}/>
          <Form.Control size="sm" type="text" placeholder="Channel Link" name="link" onChange={handleChange}	value={postData.link} />
          <Form.Control size="sm" type="text" placeholder="Tag" name="tags" onChange={handleChange}	value={postData.tags}/>
          <Form.Check enabled type="switch" id="custom-switch" label="Enable"  name="enable" onChange={handleChange}	value={postData.enable} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{addNewChannel(); handleClose();}}>
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