import {useEffect, useState} from "react";
import {Button} from "reactstrap";
import Feed from "../Feed/Feed";
import axios from "axios";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(async () => {
        if (isLoading) {
            const url = '/api/editor/update'
            await axios.get(url).then(() => {
                setLoading(false)
            })
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Updating…' : 'Update Feeds'}
        </Button>
    );
}

export default LoadingButton;