import React from "react";
import SignInForm from "../sign-in/_components/SignInForm";
import Button from "@/components/Buttons/Buttons";
import Input from "@/components/Inputs/Input";
import { MailIcon } from 'lucide-react';


export default function testPage(){

    return(
        <div className="">
            <SignInForm />
{/* 
            <Button 
                label="Envoyer"
                variant="primary"
                width="w-[440px] " 
            />

            <Input
            label="Email"
            placeholder="votre@email.com"
            rightIcon={<MailIcon className="w-5 h-5" />}
            type="email"
            required
            /> */}

        </div>
    );
}