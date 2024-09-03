import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image'
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserItems(props) {


    useEffect(() => {
        console.log(props?.name)
    }, [props])



    return (
        <Link to={`/user/${props.id}`}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon></ImageIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ fontSize: '10px' }} primary={
                    <>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                color: 'blue',
                                display: 'inline',
                                fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }
                            }}
                        >
                            {props?.name}
                        </Typography>
                    </>
                } secondary={
                    <>
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' }
                            }}
                        >
                            {props?.email}
                        </Typography>
                    </>}>

                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
        </Link>
    )
}
