import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyD9Typ6I1nAT2jcyF8uzNWjD9AyZ9j0kKE",
  authDomain: "pluni-e5d0e.firebaseapp.com",
  projectId: "pluni-e5d0e",
  storageBucket: "pluni-e5d0e.appspot.com",
  messagingSenderId: "109626506816",
  appId: "1:109626506816:web:c1ea81ff03203ee97829a5",
  measurementId: "G-R2MLZWPM07"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById('login');
const cerrar = document.getElementById('cerrar');

// Manejar el evento de inicio de sesión
login.addEventListener('click', (e) => {
  const email = document.getElementById('emaillog').value;
  const password = document.getElementById('passwordlog').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      alert("Usuario logueado");
      console.log(cred.user);
    }).catch(error => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode === 'auth/user-disabled') {
        alert('El usuario ha sido deshabilitado');
      } else if (errorCode === 'auth/user-not-found') {
        alert('El usuario no existe');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      }
    });
});

// Manejar el evento de cerrar sesión
cerrar.addEventListener('click', (e) => {
  auth.signOut().then(() => {
    alert('Sesión Cerrada');
  }).catch((error) => {
    alert('Error al Cerrar Sesión');
  });
});

// Comprobar el estado de autenticación
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("Usuario activo");
    const emailVerified = user.emailVerified;
    if (emailVerified) {
      // Redirigir al usuario a la página deseada
      window.location.href = "https://www.google.com/imghp?hl=es-419&tab=ri&ogbl";
    } else {
      alert("Por favor, verifica tu correo electrónico.");
      auth.signOut();
    }
  } else {
    console.log("Usuario Inactivo");
  }
});
