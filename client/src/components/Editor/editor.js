import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUI from './table';
function EditorUi(){
  return (
    <div>
    <div>
      <div class="container" style={{display: "flex", justifyContent: "space-between", margin:"2%"}}>
      <h2 style={{display: "inline"}}>LIST OF RSS FEEDs</h2>
      <Button style={{display: "inline"}} variant="secondary" size="sm">ADD</Button>
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