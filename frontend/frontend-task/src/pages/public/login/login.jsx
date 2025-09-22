import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/header"
import apiLogin from "../../../services/login"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function loginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, login } = useContext(AuthContext);

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);

    async function handleLogin(e) {
        e.preventDefault();
        
        const from = location.state?.from.pathname || "/home"
        
        const payload = {
            email: email,
            password: password
        }
        
        if(!email || !password) {
            setError("Preencha todos os campos corretamente")
            return;
        }

        try {
            const result = await apiLogin.login(payload)
            
            login({
            token: result.data.token,
            user: {
            id: result.data.userId,
            name: result.data.name
      }
    })
          //apiLogin.setToken(result.data.token)
          //apiLogin.setId(result.data.userId)
          //apiLogin.setAuthor(result.data.name)  
         
          navigate(from)
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center bg-[#FFDFB9]">
            <Header />
                <form className="w-[90%] max-w-md mx-auto bg-white p-10 rounded-3xl shadow-lg mt-8 space-y-4 mb-6" onSubmit={handleLogin}>
                    <h1 className="block mb-5 font-semibold text-gray-800 text-4xl text-center">Login</h1>
                    <p className="mb-10">Efetue o login para continuar, caso nao tenha uma conta, clique no botão de cadastro!</p>
                    {error && <p className="text-red-400">{error}</p>}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Email:</label>
                        <input type="email" name="email" placeholder="Digite seu E-mail " className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setEmail(e.target.value)}/> 
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-800">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua Senha" className="w-full border border-gray-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="gap-4 flex flex-col mt-10">
                        <button type="submit" className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition">Login</button>
                        <a onClick={() => navigate("/signup")} className="w-full py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition text-center"> Cadastre-se aqui</a>
                        <a href="/" className="block text-center text-blue-600 hover:underline mt-2">Voltar</a>
                    </div>
                </form>
        </div>

    )

}

