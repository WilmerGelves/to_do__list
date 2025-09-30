# 📝 TO-DO LIST App

Una aplicación web moderna y responsive para gestionar tus tareas diarias. Desarrollada con HTML, CSS y JavaScript vanilla, conectada a una API RESTful.

## 🚀 Características

- ✅ **Crear nuevas tareas** con título, descripción, prioridad y fecha límite
- 📋 **Ver lista completa** de tareas organizadas en tabla
- 🔍 **Buscar tareas** por palabra clave en título o descripción
- ✏️ **Editar tareas** existentes manteniendo el ID
- 🗑️ **Eliminar tareas** con confirmación
- ✅ **Marcar tareas como completadas**
- 🎨 **Interfaz moderna** con diseño responsive
- 📱 **Compatible con dispositivos móviles**

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: RESTful API externa
- **Estilos**: CSS puro con diseño moderno y gradientes
- **Almacenamiento**: Persistencia en base de datos mediante API

## 📦 Estructura del Proyecto
todo-list-app/
│
├── index.html # Estructura principal de la aplicación
├── css/
│ └── style.css # Estilos principales
├── js/
│ └── app.js # Lógica de la aplicación
└── README.md # Documentación


## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/Todos` | Obtener todas las tareas |
| `POST` | `/Todos` | Crear nueva tarea |
| `PUT` | `/Todos/{id}` | Actualizar tarea existente |
| `DELETE` | `/Todos/{id}` | Eliminar tarea |

## 🎯 Funcionalidades Detalladas

### Crear Tarea
- Formulario con validación de campos requeridos
- Campos: título, descripción, prioridad (0-5), fecha límite
- Interfaz intuitiva con feedback visual

### Listar Tareas
- Tabla responsive con 4 columnas: Título, Descripción, Estado, Acciones
- Iconos visuales para estado completado/pendiente
- Diseño limpio y fácil de leer

### Buscar Tareas
- Búsqueda en tiempo real por título o descripción
- Filtrado en el cliente sin necesidad de recargar
- Manejo de resultados vacíos

### Gestionar Estado
- **Marcar como completado**: Cambia ❌ por ✅ y muestra botón de eliminar
- **Eliminar tarea**: Confirmación antes de eliminar
- **Editar tarea**: Formulario pre-llenado con datos actuales

## 🎨 Diseño

### Colores Principales
- **Azul principal**: `#1E3A8A` a `#1D4ED8` (gradiente sidebar)
- **Azul botones**: `#3B82F6`
- **Fondo**: `#F1F5F9`
- **Texto**: `#334155`

### Características de UI
- Sidebar fijo con navegación
- Tablas con bordes suaves y sombras
- Botones con efectos hover
- Formularios con validación visual
- Iconos intuitivos para acciones

## 📱 Responsive Design
- Sidebar colapsible en dispositivos móviles
- Tablas adaptables con scroll horizontal
- Elementos touch-friendly en móviles
- Tipografía escalable

## 🚀 Instalación y Uso

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir `index.html`** en un navegador web moderno
3. **La aplicación se conecta automáticamente** a la API configurada

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para consumo de API)
- JavaScript habilitado

## 🔧 Configuración

### Variables de API
La URL de la API está configurada en `app.js`:
```javascript
const API_URL = "https://todoapitest.juansegaliz.com/Todos";
