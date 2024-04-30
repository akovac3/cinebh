import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import Button from "../../components/Button";
import Logo from "../../components/Logo";
import SignUp from "./SignUp";
import SignInSuccess from "../../components/SignInSuccess"
import Input from "../../components/Input"

import { url, signin } from "../../utils/api";

const LogIn = ({ toggleSidebar }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

    const onFocus = (setFocused) => setFocused(true)
    const onBlur = (setFocused) => setFocused(false)

    const success = () => {
        toggleSidebar(<SignInSuccess toggleSidebar={ toggleSidebar } />)
    }

    const onFinish = async (values) => {
        try {
            const response = await axios.post(url + signin, values)
            console.log('Successfully logged in')
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem("firstName", response.data.firstName)
            localStorage.setItem("lastName", response.data.lastName)
            localStorage.setItem("loggedIn", email)
            success()
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email && password) {
            const values = {
                email: email,
                password: password,
            }
            onFinish(values)
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    return (
        <div className="flex flex-col items-center justify-center text-neutral-25 pt-80">
            <Logo />
            <p className="py-40 text-heading-h5 text-neutral-300">Welcome Back</p>
            <div className="w-[70%] pb-24">
                <Input
                    label="Email"
                    text="Email Address"
                    open={ emailFocused }
                    placeholder={ email }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEnvelope } /> }
                    className="w-full pb-16"
                    onChange={ handleEmailChange }
                    onFocus={ () => onFocus(setEmailFocused) }
                    onBlur={ () => onBlur(setEmailFocused) }
                />

                <Input
                    label="Password"
                    text="Password"
                    open={ passwordFocused }
                    placeholder={ password }
                    type="password"
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLock } /> }
                    rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEyeSlash } /> }
                    className="w-full pb-24"
                    onChange={ handlePasswordChange }
                    onFocus={ () => onFocus(setPasswordFocused) }
                    onBlur={ () => onBlur(setPasswordFocused) }
                />

                <label htmlFor="rememberMe">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={ rememberMe }
                        onChange={ handleRememberMeChange }
                    />
                    Remember Me
                </label>

                <Button className="w-full" onClick={ handleSubmit }>Sign In</Button>
            </div>

            <div className="text-body-l flex items-center justify-center pb-80">
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
