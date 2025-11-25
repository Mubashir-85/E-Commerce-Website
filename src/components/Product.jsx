import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material'
import  AddshoppingCart  from '@mui/icons-material/AddShoppingCart'

function Product({Product}) {
  return (
    <>

    <Card className="justify-center items-center ">
        <CardMedia title={Product.name}/>
            <CardContent>
                <div>
                    <Typography>
                        {Product.name}
                    </Typography>
                    <Typography>
                        {`$${Product.price}`}
                    </Typography>
                </div>
                <Typography>{Product.description}</Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <AddshoppingCart />
                </IconButton>
            </CardActions>


    </Card>

    
    
    </>
    )
}

export default Product