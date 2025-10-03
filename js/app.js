const API_URL = "https://todoapitest.juansegaliz.com/Todos";

let tareas = [];

function mostrarCrear() {
  document.getElementById("titulo").innerText = "Crear tarea nueva";
  document.getElementById("formularioContenedor").style.display = "block";
  document.getElementById("listaContenedor").style.display = "none";
  document.getElementById("formularioContenedor").innerHTML = `
    <form id="formTarea" onsubmit="crearTarea(event)">
      <label for="title">Título</label>
      <input type="text" id="title" required>
      <label for="description">Descripción</label>
      <textarea id="description" required></textarea>
      <label for="priority">Prioridad</label>
      <input type="number" id="priority" min="0" max="5" value="0">
      <label for="dueAt">Fecha límite</label>
      <input type="datetime-local" id="dueAt">
      <button type="submit" class="btn crear">Crear</button>
    </form>
  `;
  
  // Cerrar menú en móviles después de seleccionar una opción
  if (window.innerWidth <= 768) {
    toggleMenu();
  }
}

//Creación de una tarea nueva 
async function crearTarea(event) {
  event.preventDefault(); //Prevenir el comportamiento por defecto del formulario

  // Obtener los valores del formulario
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = parseInt(document.getElementById("priority").value);
  const dueAt = document.getElementById("dueAt").value;

  // Validaciones básicas
  if (!title || !description) {
    alert("Por favor, completa al menos el título y la descripción");
    return;
  }

  // Preparar el objeto de datos para la API
  const nuevaTarea = {
    title: title,
    description: description,
    priority: priority || 0,
    dueAt: dueAt || null
  };

  try {
    // Hacer la petición POST a la API
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaTarea)
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    
    // Mostrar mensaje de éxito
    alert("Tarea creada exitosamente!");
    
    // Limpiar el formulario
    document.getElementById("formTarea").reset();
    
    // Opcional: Redirigir a la lista de tareas
    mostrarLista();
    
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    alert("Algo ha salido mal, no se ha podido crear la tarea: " + error.message);
  }
}

//Listar tareas
async function mostrarLista() {
  document.getElementById("titulo").innerText = "Lista de tareas";
  document.getElementById("formularioContenedor").style.display = "none";
  document.getElementById("listaContenedor").style.display = "block";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error HTTP: " + res.status);

    const data = await res.json();
    tareas = data && Array.isArray(data.data) ? data.data : [];

    renderizarTareas(tareas);
  } catch (error) {
    console.error("No se han podido obtener las tareas", error);
  }
  
  // Cerrar menú en móviles después de seleccionar una opción
  if (window.innerWidth <= 768) {
    toggleMenu();
  }
}

//Visualización de las tablas con cada una de las tareas 
function renderizarTareas(lista) {
  const body = document.getElementById("bodyTareas");
  body.innerHTML = "";

  lista.forEach(t => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${t.title}</td>
      <td>${t.description}</td>
      <td>${t.isCompleted ? "✅" : "❌"}</td>
      <td class="acciones">
        ${t.isCompleted ? 
          `<button onclick="eliminarTarea(${t.id})" title="Eliminar">🗑️</button>` : 
          `<button onclick="marcarCompletado(${t.id})" title="Completar">✅</button>`
        }
        <button onclick="actualizarTarea(${t.id})" title="Actualizar">🔄</button>
      </td>
    `;

    body.appendChild(fila);
  });
}

//Filtrar por tareas
function buscarTareas() {
  const filtro = document.getElementById("filtro").value.toLowerCase().trim();
  
  // Si no hay filtro, mostrar todas las tareas
  if (filtro === "") {
    renderizarTareas(tareas);
    return;
  }

  // Filtrar por título O descripción (más completo)
  const filtradas = tareas.filter(t => 
    t.title.toLowerCase().includes(filtro) ||
    (t.description && t.description.toLowerCase().includes(filtro))
  );

  renderizarTareas(filtradas);

  // Opcional: Mostrar mensaje si no hay resultados
  if (filtradas.length === 0) {
    console.log("No se encontraron tareas que coincidan con: " + filtro);
  }
}

// Función para marcar una tarea como completada
async function marcarCompletado(id) {
  try {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) {
      alert("Tarea no encontrada");
      return;
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...tarea,
        isCompleted: true
      })
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    // Actualizar el estado local
    tarea.isCompleted = true;
    
    // Recargar la lista para mostrar los cambios
    renderizarTareas(tareas);
    
    alert("✅ Tarea marcada como completada!");
    
  } catch (error) {
    console.error("Error al completar la tarea:", error);
    alert("❌ Error al completar la tarea: " + error.message);
  }
}

// Función para eliminar una tarea
async function eliminarTarea(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    // Eliminar la tarea del array local
    tareas = tareas.filter(t => t.id !== id);
    
    // Recargar la lista para mostrar los cambios
    renderizarTareas(tareas);
    
    alert("🗑️ Tarea eliminada exitosamente!");
    
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    alert("❌ Error al eliminar la tarea: " + error.message);
  }
}

// Función para actualizar tarea (placeholder por ahora)
function actualizarTarea(id) {
  // Buscar la tarea por ID
  const tarea = tareas.find(t => t.id === id);
  
  if (!tarea) {
    alert("Tarea no encontrada");
    return;
  }

  // Cambiar el título
  document.getElementById("titulo").innerText = "Editar tarea";

  // Mostrar formulario y ocultar lista
  document.getElementById("formularioContenedor").style.display = "block";
  document.getElementById("listaContenedor").style.display = "none";

  // Crear formulario con los datos actuales de la tarea
  document.getElementById("formularioContenedor").innerHTML = `
    <form id="formTarea" onsubmit="guardarActualizacion(event, ${tarea.id})">
      <label for="title">Título</label>
      <input type="text" id="title" value="${tarea.title || ''}" required>

      <label for="description">Descripción</label>
      <textarea id="description" required>${tarea.description || ''}</textarea>

      <label for="priority">Prioridad</label>
      <input type="number" id="priority" min="0" max="5" value="${tarea.priority || 0}">

      <label for="dueAt">Fecha límite</label>
      <input type="datetime-local" id="dueAt" value="${tarea.dueAt ? tarea.dueAt.slice(0, 16) : ''}">

      <button type="submit" class="btn crear">Actualizar tarea</button>
      <button type="button" class="btn cancelar" onclick="mostrarLista()">Cancelar</button>
    </form>
  `;
}

// Función para guardar los cambios en la API
async function guardarActualizacion(event, id) {
  event.preventDefault();

  // Obtener los nuevos valores del formulario
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = parseInt(document.getElementById("priority").value);
  const dueAt = document.getElementById("dueAt").value;

  // Validaciones
  if (!title || !description) {
    alert("Por favor, completa al menos el título y la descripción");
    return;
  }

  // Buscar la tarea original para mantener el ID y otros campos
  const tareaOriginal = tareas.find(t => t.id === id);
  
  if (!tareaOriginal) {
    alert("Error: Tarea no encontrada");
    return;
  }

  // Preparar objeto actualizado (manteniendo el ID y estado de completado)
  const tareaActualizada = {
    ...tareaOriginal,  // Mantener todos los campos originales
    title: title,
    description: description,
    priority: priority || 0,
    dueAt: dueAt || null
    // El ID y isCompleted se mantienen igual
  };

  try {
    // Hacer petición PUT a la API
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaActualizada)
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    // Actualizar el array local
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
      tareas[index] = { ...tareas[index], title, description, priority, dueAt };
    }

    // Mostrar mensaje de éxito y volver a la lista
    alert("✅ Tarea actualizada exitosamente!");
    mostrarLista();
    
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    alert("❌ Error al actualizar la tarea: " + error.message);
  }
}

// Funcionalidad del menú hamburguesa
function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.overlay');
  const content = document.querySelector('.content');

  sidebar.classList.toggle('active');
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // En móviles, evitar el scroll del body cuando el menú está abierto
  if (sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}



// Funcionalidad del menú hamburguesa
function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger-menu');
  const overlay = document.querySelector('.overlay');
  const content = document.querySelector('.content');

  sidebar.classList.toggle('active');
  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // En móviles, evitar el scroll del body cuando el menú está abierto
  if (sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Cerrar menú al redimensionar la ventana si pasa al modo escritorio
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.overlay');
    
    sidebar.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});