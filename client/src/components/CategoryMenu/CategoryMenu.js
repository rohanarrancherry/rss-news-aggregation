import React, {useState, useEffect} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from "reactstrap";

const CategoryMenu = () => {
    const [active, setActive] = useState("latest");
    const [cat, setCat] = useState([]);

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
        
    );
};

export default CategoryMenu;
