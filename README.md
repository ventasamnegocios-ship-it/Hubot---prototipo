# HUBot — prototipo web de prueba

Aplicación web de chat para validar HUBot antes de integrarlo con WhatsApp.

## Requisitos

- Node.js 20 o superior
- Una clave de API de OpenAI para activar las respuestas de IA
- Un servicio de alojamiento Node.js para publicar la app bajo HTTPS

## Ejecutar localmente

1. Descomprime el proyecto.
2. Copia `.env.example` a `.env`.
3. Añade tu clave a `OPENAI_API_KEY` en `.env`.
4. Instala dependencias: `npm install`
5. Inicia el servidor: `npm start`
6. Abre `http://localhost:3000`

No publiques el archivo `.env` ni pegues la clave en el navegador. En producción, configura las variables de entorno en el panel del proveedor de alojamiento.

## Activar la base documental del HUB

1. Prepara documentos autorizados y revisa su vigencia, jurisdicción, permisos y datos confidenciales.
2. Crea un vector store en la plataforma de OpenAI y carga los documentos aprobados.
3. Configura `OPENAI_VECTOR_STORE_ID` como variable de entorno en el servidor.
4. Prueba respuestas con citas y contenido de los documentos. No asumas que una respuesta es correcta solo porque recuperó un archivo.

Si no se configura `OPENAI_VECTOR_STORE_ID`, HUBot responderá usando el modelo y sus instrucciones, sin consultar una biblioteca privada del HUB.

## Publicar mediante HTTPS

Despliega este proyecto en un proveedor compatible con aplicaciones Node.js. Configura `npm start` como comando de inicio y define las variables `OPENAI_API_KEY`, `OPENAI_MODEL` y, opcionalmente, `OPENAI_VECTOR_STORE_ID` en el panel seguro del proveedor. Activa el dominio y HTTPS/TLS del proveedor antes de compartir el enlace.

El archivo `server.js` sirve la interfaz y el endpoint de chat desde el mismo origen. La clave de OpenAI permanece en el servidor. No habilites CORS abierto sin una necesidad clara.

## Limitaciones de esta prueba

- La memoria conversacional está en RAM y se borra al reiniciar el servidor; no es memoria persistente.
- No hay inicio de sesión ni control de membresía; no utilizar con datos confidenciales ni presentarlo como servicio privado para miembros.
- No hay carga de archivos desde el chat, generación de adjuntos, ni conexión con WhatsApp.
- La limitación de solicitudes es básica y por instancia; antes de producción se requiere protección adicional contra abuso.
- No hay monitorización completa, base de datos, panel de administración ni sistema de evaluación automatizado.
- HTTPS protege el transporte, pero no sustituye la autenticación, la gestión de accesos, las políticas de retención, el cifrado de datos almacenados ni la revisión de seguridad.
- Revisa las condiciones vigentes de OpenAI, Meta y el proveedor de alojamiento antes de una publicación real.

## Siguiente etapa

Probar consultas de las seis áreas del HUB, revisar la calidad con un especialista y conectar una biblioteca documental aprobada. Luego añadir memoria persistente, autenticación y observabilidad antes de abrirlo a miembros.
