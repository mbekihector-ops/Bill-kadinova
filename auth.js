import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const configured = firebaseConfig.apiKey !== "PASTE_FIREBASE_API_KEY_HERE" && firebaseConfig.projectId !== "PASTE_PROJECT_ID_HERE" && firebaseConfig.appId !== "PASTE_FIREBASE_APP_ID_HERE";
const modal = document.getElementById('authModal');
const form = document.getElementById('authForm');
const nameWrap = document.getElementById('fullNameWrap');
const nameInput = document.getElementById('authName');
const emailInput = document.getElementById('authEmail');
const passwordInput = document.getElementById('authPassword');
const statusEl = document.getElementById('authStatus');
const submitBtn = document.getElementById('authSubmit');
const resetBtn = document.getElementById('resetPassword');
const registerTab = document.getElementById('registerTab');
const loginTab = document.getElementById('loginTab');
let mode = 'register';
let auth = null;
if (configured) { const app = initializeApp(firebaseConfig); auth = getAuth(app); }

function message(text, error=false) { statusEl.textContent = text; statusEl.classList.toggle('error', error); }
function openAuth(nextMode='register') { modal.hidden = false; document.body.classList.add('modal-open'); setMode(nextMode); message(''); }
function closeAuth() { modal.hidden = true; if (!document.querySelector('.modal-backdrop:not([hidden])')) document.body.classList.remove('modal-open'); }
function setMode(nextMode) { mode = nextMode; const registering = mode === 'register'; nameWrap.hidden = !registering; nameInput.required = registering; passwordInput.autocomplete = registering ? 'new-password' : 'current-password'; submitBtn.textContent = currentAuthText(registering ? 'Tengeneza akaunti' : 'Ingia', registering ? 'Create account' : 'Sign in'); registerTab.classList.toggle('active', registering); loginTab.classList.toggle('active', !registering); resetBtn.hidden = registering; message(''); }
function currentAuthText(sw,en) { return document.documentElement.lang === 'en' ? en : sw; }
function friendlyError(error) { const code = error?.code || ''; const map = { 'auth/email-already-in-use':'Barua pepe hii tayari imesajiliwa. Jaribu kuingia.', 'auth/invalid-email':'Tafadhali hakiki barua pepe.', 'auth/weak-password':'Nenosiri ni dhaifu. Tumia angalau herufi 8.', 'auth/invalid-credential':'Barua pepe au nenosiri si sahihi.', 'auth/user-not-found':'Akaunti haijapatikana.', 'auth/too-many-requests':'Majaribio mengi. Subiri kidogo kisha jaribu tena.', 'auth/network-request-failed':'Tatizo la mtandao. Hakikisha intaneti ipo.' }; const enMap = { 'auth/email-already-in-use':'This email is already registered. Try signing in.', 'auth/invalid-email':'Please check the email address.', 'auth/weak-password':'Password is too weak. Use at least 8 characters.', 'auth/invalid-credential':'Email or password is incorrect.', 'auth/user-not-found':'Account not found.', 'auth/too-many-requests':'Too many attempts. Please wait and try again.', 'auth/network-request-failed':'Network issue. Check your internet connection.' }; return (document.documentElement.lang === 'en' ? enMap[code] : map[code]) || (document.documentElement.lang === 'en' ? 'Could not complete this action. Check Firebase setup and try again.' : 'Hatukuweza kukamilisha hatua hii. Hakiki mipangilio ya Firebase kisha jaribu tena.'); }

document.getElementById('openAuth')?.addEventListener('click', () => openAuth('register'));
document.getElementById('closeAuth')?.addEventListener('click', closeAuth);
modal?.addEventListener('click', e => { if (e.target === modal) closeAuth(); });
registerTab.addEventListener('click', () => setMode('register'));
loginTab.addEventListener('click', () => setMode('login'));
resetBtn.addEventListener('click', async () => { if (!configured) return message('Kwanza kamilisha firebase-config.js na mipangilio ya Firebase.', true); const email = emailInput.value.trim(); if (!email) return message('Andika barua pepe kwanza.', true); try { await sendPasswordResetEmail(auth, email); message('Kiungo cha kubadilisha nenosiri kimetumwa kwenye barua pepe yako.'); } catch (e) { message(friendlyError(e), true); } });
form.addEventListener('submit', async e => { e.preventDefault(); message(''); if (!configured) return message('Usajili halisi bado haujawashwa. Fuata README.txt: tengeneza Firebase project, weka config kwenye firebase-config.js, na washa Email/Password na Email Verification.', true); const email = emailInput.value.trim(); const password = passwordInput.value; submitBtn.disabled = true; submitBtn.textContent = currentAuthText('Subiri…','Please wait…'); try { if (mode === 'register') { const credential = await createUserWithEmailAndPassword(auth, email, password); const fullName = nameInput.value.trim(); if (fullName) await updateProfile(credential.user, { displayName: fullName }); await sendEmailVerification(credential.user); message('Akaunti imetengenezwa. Fungua barua pepe yako na uthibitishe akaunti kabla ya kuingia kikamilifu.'); form.reset(); } else { const credential = await signInWithEmailAndPassword(auth, email, password); if (!credential.user.emailVerified) { await signOut(auth); message('Thibitisha barua pepe yako kwanza. Angalia Inbox au Spam.', true); } else { message('Umeingia kikamilifu. Karibu Bill KadiNova!'); setTimeout(closeAuth, 1400); } } } catch (error) { message(friendlyError(error), true); } finally { submitBtn.disabled = false; submitBtn.textContent = currentAuthText(mode === 'register' ? 'Tengeneza akaunti' : 'Ingia', mode === 'register' ? 'Create account' : 'Sign in'); } });
if (auth) onAuthStateChanged(auth, user => { const trigger = document.getElementById('openAuth'); if (user && user.emailVerified && trigger) { trigger.textContent = (user.displayName || user.email) + ' · Toka'; trigger.onclick = async () => { await signOut(auth); location.reload(); }; } });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal && !modal.hidden) closeAuth(); });
