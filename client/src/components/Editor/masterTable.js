//import JsonData from '../PopUp/ChannelMasterData.json';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useState ,useEffect, useMemo} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function MasterTableUI(){
    const [loadingData, setLoadingData] = useState(true);
    const columns = useMemo(() => [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Link",
          accessor: "link",
        },
        {
          Header: "Tags",
          accessor: "tags",
        },
      ]);
    const [data,setMasterData] =useState("");

    useEffect(() => {
        async function getData() {
          await axios
            .get("/api/editor/channellist")
            .then((response) => {
              // check if the data is populated
              console.log(response.data);
              setMasterData(response.data);
              // you tell it that you had the result
              setLoadingData(false);
            });
        }
        if (loadingData) {
          // if the result is not ready so you make the axios call
          getData();
        }
      }, []);
  

    return(
        <div>
        
            <Table columns={columns} data={data} />
        </div>
    );
    }

    export default MasterTableUI;