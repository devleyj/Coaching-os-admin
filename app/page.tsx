import Slidebar from "./components/Slidebar";

export default function HOME(){
  return(
    <div className="flex min-h-screen bg-slate-50">
      <Slidebar />

      <main className= "flex-1 p-8">
        <h1 className= "text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className= "mt-2 text-slate-500 ">
          Welcome to Coaching OS 
        </p>

      </main>

    </div>
  )
}