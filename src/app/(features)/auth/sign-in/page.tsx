import React from "react";
import SignInForm from "./_components/SignInForm";
import InputS from "@/components/Inputs/Inputs";


export default function SignInPage(){

    return(
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <SignInForm />
            <InputS />
        </div>
    );
}