import React from 'react';
import Divider from '@material-ui/core/Divider';

export default function() {
    return <Divider 
            variant="middle"
            style={{
                width: "80%",
                alignSelf: "center",
                marginTop: "20px",
                marginBottom: "20px",
            }} />;
}