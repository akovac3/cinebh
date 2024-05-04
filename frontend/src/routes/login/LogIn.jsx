import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Button from "../../components/Button";
import Logo from "../../components/Logo";
import SignUp from "./SignUp";
import Success from "../../components/Success"
import Input from "../../components/Input"
import Label from "../../components/Label";

import { url, signin } from "../../utils/api";
import PasswordReset from "./PasswordReset";

const LogIn = ({ toggleSidebar }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [validData, setValidData] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const onFocus = (setFocused) => setFocused(true)
    const onBlur = (setFocused) => setFocused(false)

    const validateEmail = (email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        setValidEmail(isValid);
    };

    const success = () => {
        toggleSidebar(<Success text={ "Sign In Successful! 🎉" } toggleSidebar={ toggleSidebar } />)
    }

    const onFinish = async (values) => {
        try {
            const response = await axios.post(url + signin, values)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem("firstName", response.data.firstName)
                localStorage.setItem("lastName", response.data.lastName)
                localStorage.setItem("loggedIn", email)
                success()
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setValidData(false)
                console.log('Incorrect email or password');
            } else if (error.response && error.response.status === 500) {
                console.log('Internal Server Error');
            } else {
                console.log('An error occurred');
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email && password) {
            const values = {
                email: email,
                password: password
            }
            onFinish(values)
        }
    }

    const handleEmailChange = (event) => {
        setValidData(true)
        setEmail(event.target.value)
        validateEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setValidData(true)
        setPassword(event.target.value)
    }

    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    return (
        <div className="flex flex-col items-center justify-center text-neutral-25 pt-80">
            <Logo />
            <div className="flex py-32">
                <Button variant="secondary" disabled className="!bg-[#FCFCFD1A] !text-neutral-300 !border-none !shadow-light-25 w-[36px] h-40 absolute left-[70px]">
                    <FontAwesomeIcon icon={ fas.faArrowLeft } className="h-[20px]" />
                </Button>
                <p className="text-heading-h5 text-neutral-300">Welcome Back</p>
            </div>
            <div className="w-[70%]">
                <Label
                    label="Email"
                    active={ emailFocused }
                    error={ !validData || !validEmail }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEnvelope } /> }
                    variant={ (!validEmail || !validEmail) ? 'error' : 'default' }
                    errorMessage={ validEmail ? null : "Enter valid email address" }
                >
                    <Input
                        text="Email Address"
                        className="w-full pb-16"
                        error={ !validData || !validEmail }
                        onChange={ handleEmailChange }
                        onFocus={ () => onFocus(setEmailFocused) }
                        onBlur={ () => onBlur(setEmailFocused) }
                    />
                </Label>
                <Label
                    label="Password"
                    active={ passwordFocused }
                    password
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLock } /> }
                    rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEyeSlash } onClick={ () => setPasswordVisibility(!passwordVisibility) } /> }
                    variant={ !validData ? 'error' : 'default' }
                    error={ !validData }
                    errorMessage="Email or Password that you've entered is incorrect."
                >
                    <Input
                        text="Password"
                        type={ passwordVisibility ? "text" : "password" }
                        className="w-full pb-24"
                        error={ !validData }
                        onChange={ handlePasswordChange }
                        onFocus={ () => onFocus(setPasswordFocused) }
                        onBlur={ () => onBlur(setPasswordFocused) }
                    />
                </Label>

                <div className="flex items-center justify-center pt-8 pb-32">
                    <label htmlFor="rememberMe" className="flex-1 text-neutral-400 font-semibold">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="mr-4 checked:bg-primary-600"
                            checked={ rememberMe }
                            onChange={ handleRememberMeChange }
                        />
                        Remember Me
                    </label>
                    <Button
                        variant="tertiary"
                        onClick={ () => toggleSidebar(<PasswordReset toggleSidebar={ toggleSidebar } />) }
                        className="!text-neutral-400 font-semibold no-underline !p-0"
                    >
                        Forgot Password?
                    </Button>
                </div>
                <Button
                    className="w-full disabled:bg-primary-200"
                    disabled={ email === "" || password === "" || !validEmail || !validData }
                    onClick={ handleSubmit }
                >
                    Sign In
                </Button>
            </div>

            <div className="text-body-l flex items-center justify-center pt-32 pb-80">
                Don't have an account yet?
                <Button
                    variant="tertiary"
                    className="!text-neutral-25"
                    onClick={ () => toggleSidebar(<SignUp toggleSidebar={ toggleSidebar } />) }
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default LogIn;
