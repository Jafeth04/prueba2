import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { sendEmailVerification, getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9Typ6I1nAT2jcyF8uzNWjD9AyZ9j0kKE",
  authDomain: "pluni-e5d0e.firebaseapp.com",
  projectId: "pluni-e5d0e",
  storageBucket: "pluni-e5d0e.appspot.com",
  messagingSenderId: "109626506816",
  appId: "1:109626506816:web:c1ea81ff03203ee97829a5",
  measurementId: "G-R2MLZWPM07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registroBtn = document.getElementById('registro'); // Botón de registro

registroBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del botón

    const email = document.getElementById('emailreg').value;
    const password = document.getElementById('passwordreg').value;

    try {
        // Crear el usuario
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        alert("Usuario creado");

        // Enviar verificación por correo
        await sendEmailVerification(cred.user);
        alert("Se ha enviado un correo de verificación");

        // Cerrar sesión
        await auth.signOut();
    } catch (error) {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
            alert('El correo ya está en uso');
        } else if (errorCode === 'auth/invalid-email') {
            alert('El correo no es válido');
        } else if (errorCode === 'auth/weak-password') {
            alert('La contraseña debe tener al menos 6 caracteres');
        } else {
            alert('Error desconocido: ' + error.message);
        }
    }
});
    