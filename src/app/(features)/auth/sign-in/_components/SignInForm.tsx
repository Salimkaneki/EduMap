'use client'
import React, { useState } from "react";
import { MailIcon, Lock, Eye, EyeOff } from "lucide-react";

import Input from "@/components/Inputs/Input";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-[400px] h-[428px] flex flex-col items-center justify-center gap-6">
      <div className="">
        <h1 className="">
          Admin Connectez-vous !!!
        </h1>
      </div>

      <div className="w-full flex flex-col ">
        <Input 
            label="Email"
            placeholder="votre@email.com"
            rightIcon={<MailIcon className="w-5 h-5" />}
            type="email"
            required
        />
      </div>
    </div>
  );
}