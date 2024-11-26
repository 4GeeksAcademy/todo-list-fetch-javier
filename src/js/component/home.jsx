import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
	const [item, setItem] = useState("")
	const [toDos, setToDos] = useState([]) // Este estado almacena la lista de tareas que provienen del servidor, es decir, los objetos del array data.todos.


	// agrego mis tareas a mi base de datos 
	const handleEnter =  async(e) => {
		if (e.key === "Enter") {
	       fetch("https://playground.4geeks.com/todo/todos/javier", { // url que quiero recibir mi informacion
			method: "POST",  
			body: JSON.stringify({ // esta linea hace que mi codigo viaje como si fuera un texto a traves de internet y cuando el servidor cuando lo reciba lo convierte en objeto y json lo convierte en texto 
				"label": item,
				"is_done": false
			  }),
			headers: {
			  "Content-Type": "application/json"  // que tipo de dato estoy enviando, este es el mas comun cuando envio objetos en mi peticion.
			}
		  }) 
		  .then((respuesta)=> {     // fetch recibe esa respuesta y resuelve la promesa con un objeto de tipo Response y la guardo en mi parametro0, que contiene información sobre la respuesta del servidor (estado, encabezados, cuerpo, etc.).
			if (respuesta.ok) console.log ("Tarea agregada correctamente")
		  })
			setItem("") // vacio mi input 
		 await handleGetTodos()
		 
		}
	}

	// muestro en consola las tareas del usuario 
	const handleGetTodos = async () =>{
		let names = "javier"
		try {
			const respuesta = await fetch("https://playground.4geeks.com/todo/users/javier")
			const data = await respuesta.json ()
			if(respuesta.ok) setToDos(data.todos)
		} catch (error) {
			console.log(error)

		}
	}
console.log (names);
// codigo mejorado
	const handleDelete = async (id) => {  // Borramos la tarea de nuestra base de datos 
			fetch(`https://playground.4geeks.com/todo/todos/${id}`, { 
				method: "DELETE" 
			});

			if (respuesta.ok) {
				console.log("Tarea eliminada correctamente");
				await handleGetTodos(); // Actualizamos la lista de tareas después de borrar, porque esperamos a que muestre las tareas nuevas, ahora sin la que elimine 
			}
	}; 


   useEffect(() =>{  // es un hooks que nos permite ejecutar codigo despues de ejecutar UN COMPONENTE 
      handleGetTodos()
   }, [])


	return (
		
		<div className="container">
			<h1>todos</h1>
			<div className="lista-contenedor">
				<ul>
					<li><input type="text" placeholder="Que falta hacer?" onChange={(e) => setItem(e.target.value)} value={item} onKeyDown={(e) => handleEnter(e)}></input> </li>
					{toDos && toDos.map((item, index) => (
						<li key={index}> {item.label} <i className="fa fa-times" onClick={() => handleDelete(item.id)}></i></li>
					))}
					<li className="faltantes"> {toDos.length} tareas faltantes </li>
				</ul>
			</div>
		</div>
	);
};

export default Home;