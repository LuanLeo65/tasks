import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import apiLogin from "../../../services/login";


export default function addAccountPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    async function handleCreateAccount(e) {
        e.preventDefault(); 

        if(!name || !email || !password) {
            setError("Preencha todos os campos corretamente")
            return;
        }
        const payload = {
            name: name,
            birth: birthDate,
            email: email,
            password: password
        }  
        try {
            await apiLogin.createAccount(payload)
            navigate("/login")

        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
            <Header />
                <form className="w-[90%] max-w-md mx-auto bg-white p-10 rounded-3xl shadow-lg mt-8 space-y-4 mb-6" onSubmit={handleCreateAccount}>
                    <h1 className="block mb-5 font-semibold text-gray-800 text-4xl text-center">Cadastre-se</h1>
                    <p className="mb-10">Preencha os campos abaixo para criar sua conta!</p>
                    {error && <p className="text-red-400">{error}</p>}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Nome:</label>
                        <input type="text" name="name" placeholder="Digite seu Nome " className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setName(e.target.value)}/> 
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Data de Nascimento:</label>
                        <input type="date" name="birthDate" placeholder="Digite sua Data de Nascimento " className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setBirthDate(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Email:</label>
                        <input type="email" name="email" placeholder="Digite seu E-mail " className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setEmail(e.target.value)}/> 
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Senha:</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua Senha" className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="gap-4 flex flex-col mt-10">
                        <button type="submit" className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition">Cadastrar</button>
                        <button onClick={() => navigate("/login")} className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition"> Ja tenho uma conta</button>
                    </div>
                </form>
        </div>
    )
}