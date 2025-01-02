# 🖼️ Image Captioning Application

Este proyecto es una **📜 aplicación de generación de subtítulos para imágenes** que utiliza servicios de inteligencia artificial como **🤖 Google Cloud Vision**, **🖥️ Microsoft Azure Computer Vision**, y **🔮 Clarifai**. Los usuarios pueden 📤 subir imágenes o proporcionar una 🌐 URL para analizar la imagen y generar descripciones basadas en los contenidos visuales.

---

## **✨ Características**

- 📥 Subida de imágenes locales o análisis mediante 🌐 URL.
- Integración con APIs de 🤖 AI:
    - **Google Cloud Vision**.
    - **Microsoft Azure Computer Vision**.
    - **Clarifai**.
- ✅ Validación de imágenes por tamaño (hasta 5️⃣ MB) y formatos permitidos (📷 JPEG, PNG, WEBP).
- 🖱️ Interfaz de usuario sencilla con feedback de carga.

---

## **📋 Requisitos**

### **⚙️ Backend**

- **Node.js** v16 o superior.
- **pnpm** v9.0 
- **APIs configuradas**:
    - 🤖 Google Cloud Vision API.
    - 🖥️ Microsoft Azure Computer Vision API.
    - 🔮 Clarifai API.
- Configuración de 📂 Multer para manejar la subida de imágenes.

### **🖼️ Frontend**

- Navegador moderno (🌐 Chrome, Firefox, Edge).
- **🎨 Bootstrap 5** y **⚡ SweetAlert2** para estilos y feedback.

---

## **🚀 Instalación**

### ℹ️ Uso de Ngrok

Ngrok se utiliza en este proyecto para exponer el servidor backend local a una URL pública. Esto es útil para probar la aplicación con APIs externas o desde dispositivos móviles.

#### Instalación de Ngrok

1️⃣ Descarga e instala Ngrok desde [ngrok.com](https://ngrok.com/).

2️⃣ Ejecuta el siguiente comando para exponer tu servidor local:

```bash
ngrok http 3000
```

3️⃣ Copia la URL proporcionada por Ngrok (por ejemplo, `https://<your-ngrok-id>.ngrok.io`) y configúrala como `PUBLIC_URL` en el archivo `.env` y en `app.js`.

```env
PUBLIC_URL=https://<your-ngrok-id>.ngrok.io
```
```app.js
PUBLIC_URL=https://<your-ngrok-id>.ngrok.io
```

---

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/usuario/image-captioning-app.git
cd image-captioning-app
```

### 2️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
PORT=3000
PUBLIC_URL=http://localhost:3000
GOOGLE_APPLICATION_CREDENTIALS=path/to/google/credentials.json
AZURE_APPLICATION_ENDPOINT=https://your-azure-endpoint
AZURE_APPLICATION_API_KEY=your-azure-api-key
CLARIFAI_APPLICATION_API_KEY=your-clarifai-api-key
```

### 3️⃣ Instalar dependencias

Ejecuta los siguientes comandos para instalar las dependencias necesarias:

```bash
cd backoffice

pnpm install
```

### 4️⃣ Iniciar el servidor

```bash
pnpm start
```

El servidor estará disponible en `http://localhost:3000`.

---

## **🛠️ Uso de la aplicación**

### 1️⃣ Frontend

Accede a la interfaz de usuario visitando `http://localhost:3000` en tu navegador.

### 2️⃣ Subida de imágenes

- Selecciona una imagen desde tu 📁 dispositivo local o proporciona una 🌐 URL válida de imagen.
- Elige uno de los servicios de análisis:
    - 🤖 Google Cloud Vision.
    - 🖥️ Microsoft Azure Computer Vision.
    - 🔮 Clarifai.
- Haz clic en **"📝 Generate Caption"** para iniciar el análisis.

### 3️⃣ Resultados

- Los subtítulos generados aparecerán en 🃏 tarjetas con su correspondiente nivel de confianza.

---

## **🔗 Endpoints del backend**

### **📤 POST /api/analyze**

Sube una imagen o analiza una 🌐 URL mediante el servicio seleccionado.

#### **📋 Cuerpo de la solicitud**

| Campo          | Tipo     | Descripción                                                  |
| -------------- | -------- | ------------------------------------------------------------ |
| `typeServices` | `string` | Servicio de análisis (`google`, `azure`, `clarifai`).        |
| `imageFile`    | `file`   | Imagen a subir (opcional si `imageUrl` está presente).       |
| `imageUrl`     | `string` | 🌐 URL de la imagen (opcional si `imageFile` está presente). |

#### **✅ Ejemplo de respuesta exitosa**

```json
{
    "success": true,
    "data": [
        {
            "name": "Sky",
            "confidence": 92.3
        },
        {
            "name": "Cloud",
            "confidence": 88.1
        }
    ]
}
```

#### **❌ Posibles errores**

| Código | Mensaje                                                    |
| ------ | ---------------------------------------------------------- |
| 400    | ❌ Invalid file type. Only JPEG, PNG, and WEBP are allowed. |
| 400    | ⚠️ File size exceeds the limit of 5MB.                     |
| 500    | 🚨 Failed to analyze picture.                              |

---

## **🛠️ Tecnologías utilizadas**

- **⚙️ Backend**:
    - Node.js, Express, Multer.
    - 🤖 Google Cloud Vision API.
    - 🖥️ Microsoft Azure Computer Vision API.
    - 🔮 Clarifai API.
- **🎨 Frontend**:
    - 🎨 Bootstrap 5, ⚡ SweetAlert2.
    - 🖼️ HTML, CSS, JavaScript.

---

## **🧪 Pruebas**

1️⃣ **Subida exitosa**: Sube una imagen válida y confirma que los subtítulos se generan correctamente. 2️⃣ **Tipo de archivo inválido**: Intenta subir un archivo `.txt` o `.pdf`. 3️⃣ **Tamaño de archivo excedido**: Sube una imagen mayor a 5️⃣ MB. 4️⃣ **URL no válida**: Proporciona una 🌐 URL incorrecta o inaccesible.

---

## **🤝 Contribuciones**

Las contribuciones son bienvenidas. Por favor, abre un 🐛 issue o envía un 🔄 pull request.

---

## **📜 Licencia**

Este proyecto está licenciado bajo la [MIT License](LICENSE).