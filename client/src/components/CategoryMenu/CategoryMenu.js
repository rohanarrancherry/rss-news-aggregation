import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {Tabs, Tab} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { Navbar, Nav } from 'react-bootstrap';
import { Row, Container } from "reactstrap";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const useTabStyles = makeStyles({
    root: {
        justifyContent: "center"
    },
    scroller: {
        flexGrow: "0"
    }
});

const CategoryMenu = () => {
    const [active, setActive] = useState("latest");
    const [cat, setCat] = useState([]);
    let navigate = useNavigate()

    function getCategories() {
        const url = "/api/user/categories";
        let token = localStorage.getItem("token")
        fetch(url, {
            headers: {Authorization: 'Bearer: ' + token}
        }).then(res => res.json()).then(data => {
            setCat(data)
            setActive(data[0])
        });
    }

    useEffect(() => {
        getCategories()
    }, [])

    const classes = useTabStyles();

    return (
            
            <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Nav className='m-auto'>
                    {cat.map((catg, index)=> (<Nav.Link href={`/dashboard/${catg}`}>{catg.toUpperCase()}</Nav.Link>))}

                </Nav>
                </Container>
            </Navbar>
            </> 

        // <Tabs
        //     classes={{root: classes.root, scroller: classes.scroller}}
        //     value={active}
        //     onChange={(event, newValue) => {
        //         console.log(newValue);
        //         setActive(newValue);
                
        //     }}
        //     indicatorColor="primary"
        //     textColor="primary"
        //     variant={"scrollable"}
        //     scrollButtons={"on"}
        // >
        //     {cat.map((category, index) => (
        //         <Tab key={index}  onClick={()=>{navigate(`/dashboard/${category}`)}} label={category} value={category}/>
        //     ))}
        // </Tabs>

        
    );
};

export default CategoryMenu;
