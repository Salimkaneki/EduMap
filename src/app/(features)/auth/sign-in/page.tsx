import React from "react";
import SignInForm from "./_components/SignInForm";

export default function SignInPage(){
    return(
        <div className="min-h-screen h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2D55FB] to-[#000000] fixed inset-0">
            <SignInForm />
        </div>
    );
}