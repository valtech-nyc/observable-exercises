import Kefir from 'https://unpkg.com/kefir@3.8.3/dist/kefir.esm.js';
import { isEmailValid, isPasswordValid } from './validation.js';

const SHOW_ELEMENT_CLASS = 'visible';

const eventValue = e => e.target.value;

const $email = document.getElementById('email');
const $emailError = document.getElementById('email-error');
const $password = document.getElementById('password');
const $passwordError = document.getElementById('password-error');
const $successMessage = document.getElementById('success-message');

export const email$ = Kefir.fromEvents($email, 'keydown', eventValue)
    .merge(Kefir.constant(''));
export const password$ = Kefir.fromEvents($password, 'keydown', eventValue)
    .merge(Kefir.constant(''));

const isEmailValid$ = email$.map(isEmailValid);
const isPasswordValid$ = password$.map(isPasswordValid);
export const isFormValid$ = Kefir.combine(
    [isEmailValid$, isPasswordValid$],
    (email, password) => email && password
);

isEmailValid$.observe(valid => {
    $emailError.classList.toggle(SHOW_ELEMENT_CLASS, !valid)
});

isPasswordValid$.observe(valid => {
    $passwordError.classList.toggle(SHOW_ELEMENT_CLASS, !valid)
});

isFormValid$.observe(valid => {
    $successMessage.classList.toggle(SHOW_ELEMENT_CLASS, valid)
});
