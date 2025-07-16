import React from "react";

export default function Layout({ children }: Readonly< {children : React.ReactNode} >){

    return(
        <main className="min-h-screen flex flex-col justify-center items-center w-full">
            {children}
        </main>
    );
}