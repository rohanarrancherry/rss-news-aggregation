import React, {useState, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {Tabs, Tab} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

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
        <Tabs
            classes={{root: classes.root, scroller: classes.scroller}}
            value={active}
            onChange={(event, newValue) => {
                console.log(newValue);
                setActive(newValue);
                navigate(`/dashboard/${newValue}`)
            }}
            indicatorColor="primary"
            textColor="primary"
            variant={"scrollable"}
            scrollButtons={"on"}
        >
            {cat.map((category, index) => (
                <Tab key={index} label={category} value={category}/>
            ))}
        </Tabs>
    );
};

export default CategoryMenu;
