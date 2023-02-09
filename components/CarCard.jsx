import React from 'react'
import Button from './Button'
import rupiah  from '../lib/rupiah'

export default function CarCard({ car, showDeleteModal }) {
    return (
        <div
            className="bg-white min-h-max rounded-lg overflow-hidden shadow"
            key={car.id}
        >
            <div className="h-44 bg-red-500 overflow-hidden items-center">
                <img
                    src={car.image}
                    alt=""
                    className="object-cover min-h-full w-full hover:scale-105 duration-200"
                />
            </div>
            <div className="px-4 py-2 flex flex-col">
                <h1 className="font-semibold text-lg">{car.name}</h1>
                <span className="text-gray-400 text-sm">Description:</span>
                <p>{car.description}</p>
                <span className='bg-green-500 rounded-full text-sm px-2 py-1 text-white ml-auto'>{rupiah(car.price)}</span>
            </div>
            <div className="border-t-[1px] px-4 py-2 flex space-x-1">
                <Button className="bg-yellow-500 hover:bg-yellow-500 text-white">
                    Detail
                </Button>
                <button
                    onClick={() => showDeleteModal(car.id)}
                    className="bg-red-500 py-1 px-3 hover:bg-red-600 focus:outline-none focus:ring-2 ring-red-300 active:scale-105 duration-200 text-white rounded text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
