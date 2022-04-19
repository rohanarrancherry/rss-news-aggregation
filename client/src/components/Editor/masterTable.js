//import JsonData from '../PopUp/ChannelMasterData.json';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useState ,useEffect, useMemo} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function MasterTableUI({onSelect}){
  const [posts, setPosts] = useState({JsonData:[] });
    useEffect(() => {
      const fetchPostList = async() =>{
              const {data} = await axios.get("/api/editor/masterdata")
              setPosts({JsonData:data})
              console.log(data)
          }
          fetchPostList()
    },[setPosts])
  
  const DisplayData=posts.JsonData.map(
      (info)=>{
          return(
              <tr key={info._id} onClick={() => onSelect(info)}>
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