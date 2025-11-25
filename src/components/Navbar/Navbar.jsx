import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCart'

function Navbar() {
  return (
    <>
    <AppBar position="fixed" color="inherit">
        <Toolbar>
            <Typography>
                <img src="" alt="Commerce.js" height={"25px"} className="" />
            </Typography>

        </Toolbar>


    </AppBar>
    </>
  )
}

export default Navbar