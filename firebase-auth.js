import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { 
      getAuth, 
      createUserWithEmailAndPassword, 
      signInWithEmailAndPassword, 
      sendEmailVerification, 
      sendPasswordResetEmail, 
      updateProfile, 
      onAuthStateChanged, 
      signOut 
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

    // Firebase Config embedded directly
    const firebaseConfig = {
      apiKey: "AIzaSyD6jmtCvnXT9GJ2ebkwRYmz5dGOfMFBJfM",
      authDomain: "bill-kadinova.firebaseapp.com",
      projectId: "bill-kadinova",
      storageBucket: "bill-kadinova.firebasestorage.app",
      messagingSenderId: "883046088442",
      appId: "1:883046088442:web:048e99a69ba33884d25343",
      measurementId: "G-7BJ6TRDC35"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let mode = 'register';

    const authModal = document.getElementById('authModal');
    const openAuthBtn = document.getElementById('openAuth');
    const closeAuthBtn = document.getElementById('closeAuth');
    const registerTab = document.getElementById('registerTab');
    const loginTab = document.getElementById('loginTab');
    const authForm = document.getElementById('authForm');
    const authName = document.getElementById('authName');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const fullNameWrap = document.getElementById('fullNameWrap');
    const authSubmit = document.getElementById('authSubmit');
    const resetPasswordBtn = document.getElementById('resetPassword');
    const authStatus = document.getElementById('authStatus');

    function setMode(newMode) {
      mode = newMode;
      const isSw = document.documentElement.lang === 'sw';
      authStatus.textContent = '';
      authStatus.className = 'auth-status';

      if (mode === 'register') {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        fullNameWrap.hidden = false;
        authName.required = true;
        authPassword.autocomplete = 'new-password';
        authSubmit.textContent = isSw ? 'Tengeneza akaunti' : 'Create account';
        resetPasswordBtn.hidden = true;
      } else {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        fullNameWrap.hidden = true;
        authName.required = false;
        authPassword.autocomplete = 'current-password';
        authSubmit.textContent = isSw ? 'Ingia' : 'Sign in';
        resetPasswordBtn.hidden = false;
      }
    }

    function updateAuthTrigger(user) {
      const isSw = document.documentElement.lang === 'sw';
      if (user) {
        const name = user.displayName || user.email.split('@')[0];
        openAuthBtn.textContent = `👤 ${name}`;
        openAuthBtn.title = isSw ? 'Akaunti yako' : 'Your account';
      } else {
        openAuthBtn.textContent = isSw ? '♙ Ingia / Sajili' : '♙ Sign in / Register';
        openAuthBtn.title = isSw ? 'Akaunti' : 'Account';
      }
    }

    openAuthBtn?.addEventListener('click', () => {
      const user = auth.currentUser;
      if (user) {
        const isSw = document.documentElement.lang === 'sw';
        const logoutMsg = isSw 
          ? `Umeingia kama ${user.email}. Unataka kutoka?` 
          : `Signed in as ${user.email}. Do you want to sign out?`;
        if (confirm(logoutMsg)) {
          signOut(auth).then(() => {
            toast(isSw ? 'Umetoka kwenye akaunti.' : 'Signed out successfully.');
          });
        }
      } else {
        authModal.hidden = false;
        document.body.classList.add('modal-open');
        setMode('register');
      }
    });

    closeAuthBtn?.addEventListener('click', () => {
      authModal.hidden = true;
      if (document.querySelectorAll('.modal-backdrop:not([hidden])').length === 0) {
        document.body.classList.remove('modal-open');
      }
    });

    registerTab?.addEventListener('click', () => setMode('register'));
    loginTab?.addEventListener('click', () => setMode('login'));

    authForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const isSw = document.documentElement.lang === 'sw';
      authStatus.className = 'auth-status';
      authStatus.textContent = isSw ? 'Tafadhali kusubiri...' : 'Please wait...';

      const email = authEmail.value.trim();
      const password = authPassword.value;
      const name = authName.value.trim();

      try {
        if (mode === 'register') {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          if (name) {
            await updateProfile(cred.user, { displayName: name });
          }
          await sendEmailVerification(cred.user);
          authStatus.textContent = isSw 
            ? 'Akaunti imetengenezwa! Tumetuma barua pepe ya uthibitisho. Tafadhali ifungue na uthibitishe kabla ya kuendelea.' 
            : 'Account created! Verification email sent. Please check your inbox and verify.';
          authForm.reset();
        } else {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          if (!cred.user.emailVerified) {
            authStatus.className = 'auth-status error';
            authStatus.textContent = isSw 
              ? 'Barua pepe yako haijathibitishwa bado. Angalia barua pepe yako kisha ubonyeze kiungo cha uthibitisho.' 
              : 'Your email is not verified yet. Please check your inbox and confirm.';
          } else {
            authStatus.textContent = isSw ? 'Umeingia kikamilifu!' : 'Signed in successfully!';
            setTimeout(() => {
              authModal.hidden = true;
              document.body.classList.remove('modal-open');
            }, 1200);
          }
        }
      } catch (err) {
        authStatus.className = 'auth-status error';
        let msg = err.message;
        if (err.code === 'auth/email-already-in-use') {
          msg = isSw ? 'Barua pepe hii imeshawasajiliwa.' : 'This email is already registered.';
        } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          msg = isSw ? 'Barua pepe au nenosiri si sahihi.' : 'Invalid email or password.';
        } else if (err.code === 'auth/weak-password') {
          msg = isSw ? 'Nenosiri ni dhaifu mno (weka angalau herufi 8).' : 'Password is too weak (min 8 chars).';
        }
        authStatus.textContent = msg;
      }
    });

    resetPasswordBtn?.addEventListener('click', async () => {
      const isSw = document.documentElement.lang === 'sw';
      const email = authEmail.value.trim();
      if (!email) {
        authStatus.className = 'auth-status error';
        authStatus.textContent = isSw ? 'Weka barua pepe yako kwanza.' : 'Enter your email address first.';
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email);
        authStatus.className = 'auth-status';
        authStatus.textContent = isSw 
          ? 'Kiungo cha kubadilisha nenosiri kimetumwa kwenye barua pepe yako.' 
          : 'Password reset link sent to your email.';
      } catch (err) {
        authStatus.className = 'auth-status error';
        authStatus.textContent = err.message;
      }
    });

    onAuthStateChanged(auth, (user) => {
      updateAuthTrigger(user);
    });
