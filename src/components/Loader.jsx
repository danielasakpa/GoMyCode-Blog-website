import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

function Loader() {
    return (
        <div
            class="fixed inset-0 p-4 flex flex-wrap bg-black justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <BallTriangle
                height="80"
                width="80"
                radius={5}
                color="#ffffff"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader