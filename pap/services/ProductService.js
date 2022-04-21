import React, { useEffect, useState } from 'react';

export function getProducts(id){
    return(
        fetch(`https://bar.aemgnascente.pt/products.php?id=${id}`)
        .then(res => res.json())
        .then(data => data)
    )
}