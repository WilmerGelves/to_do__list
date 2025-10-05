# Usa la imagen base de nginx
FROM nginx:alpine

# Copia tu configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos del sitio (HTML, CSS, JS)
COPY . /usr/share/nginx/html

# Expone el puerto 80 para servir el sitio
EXPOSE 80

# Comando por defecto que ejecuta nginx
CMD ["nginx", "-g", "daemon off;"]
