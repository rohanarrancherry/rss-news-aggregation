import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUI from './table';
import { Link } from 'react-router-dom';
function EditorUi(){
  return (
    <div>
    <div>
      <div class="container" style={{display: "flex", justifyContent: "space-between", margin:"2%"}}>
      <h2 style={{display: "inline"}}>LIST OF RSS FEEDs</h2>
      <Link to="/button">
      <Button style={{display: "inline"}} variant="secondary" size="sm">ADD</Button>
      </Link>
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