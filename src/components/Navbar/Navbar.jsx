import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCart'

function Navbar() {
  return (
    <>
    <AppBar position="fixed" color="inherit">
        <Toolbar>
            <Typography className='flex items-center'>
                <img src="shopping-cart-3d-render-icon.jpg" alt=""  className="h-8" />
                E-Commerce
            </Typography>
            <div className=''/>
            <div className=' ml-auto '>
                <IconButton>
                    <Badge>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
            </div>

        </Toolbar>


    </AppBar>
    </>
  )
}

export default Navbar