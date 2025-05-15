'use client';
import React from 'react';

export default function ItemsEdit ({params}) {
    console.log('params', params.id);
    return (
        <div>
            <h1>Items Edit</h1>
            <p>Item ID: {params.id}</p>
        </div>
    );
}
