import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LogIn from "./LogIn";
import SignUpSuccess from "../../components/SignUpSuccess";

import { url, signup } from "../../utils/api";

const SignUp = ({ toggleSidebar }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [retypePassword, setRetypePassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [retypePasswordFocused, setRetypePasswordFocused] = useState(false)
    const [firstNameFocused, setFirstNameFocused] = useState(false)
    const [lastNameFocused, setLastNameFocused] = useState(false)

    const onFocus = (setFocused) => setFocused(true)
    const onBlur = (setFocused) => setFocused(false)

    const success = () => {
        toggleSidebar(<SignUpSuccess toggleSidebar={ toggleSidebar } />)
    }

    const onFinish = async (values) => {
        try {
            const response = await axios.post(url + signup, values)
            console.log(response)
            console.log('Successfully logged in')
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("loggedIn", email)
            success()
        } catch (error) {
            console.log(error)
            console.warning(error.response.data.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== retypePassword) {
            setPasswordsNotMatch(true)
            console.log(password)
            return;
        }

        if (email && password && !passwordsNotMatch) {
            const values = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
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

    function handleRetypePasswordChange(event) {
        setRetypePassword(event.target.value)
    }

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }

    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    return (
        <div className="flex flex-col items-center justify-center text-neutral-0 py-80">
            <Logo />
            <p className="py-40 text-heading-h5 text-neutral-300">Hello</p>
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
                    label="First name"
                    text="First name"
                    open={ firstNameFocused }
                    placeholder={ firstName }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faUserPlus } /> }
                    className="w-full pb-16"
                    onChange={ handleFirstNameChange }
                    onFocus={ () => onFocus(setFirstNameFocused) }
                    onBlur={ () => onBlur(setFirstNameFocused) }
                />

                <Input
                    label="Last name"
                    text="Last name"
                    open={ lastNameFocused }
                    placeholder={ lastName }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faUserPlus } /> }
                    className="w-full pb-16"
                    onChange={ handleLastNameChange }
                    onFocus={ () => onFocus(setLastNameFocused) }
                    onBlur={ () => onBlur(setLastNameFocused) }
                />

                <Input
                    label="Password"
                    text="Password"
                    open={ passwordFocused }
                    placeholder={ password }
                    error={ passwordsNotMatch }
                    type="password"
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLock } /> }
                    rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEyeSlash } /> }
                    className="w-full pb-24"
                    onChange={ handlePasswordChange }
                    onFocus={ () => onFocus(setPasswordFocused) }
                    onBlur={ () => onBlur(setPasswordFocused) }
                />

                <Input
                    label="Confirm Password"
                    text="Retype Password"
                    open={ retypePasswordFocused }
                    placeholder={ retypePassword }
                    error={ passwordsNotMatch }
                    type="password"
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLock } /> }
                    rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEyeSlash } /> }
                    className="w-full pb-24"
                    onChange={ handleRetypePasswordChange }
                    onFocus={ () => onFocus(setRetypePasswordFocused) }
                    onBlur={ () => onBlur(setRetypePasswordFocused) }
                />

                <Button className="w-full mt-32" onClick={ handleSubmit }>Sign Up</Button>
            </div>

            <div className="text-body-l flex items-center justify-center">
                Already have an account?
                <Button variant="tertiary" className="!text-neutral-25" onClick={ () => toggleSidebar(<LogIn toggleSidebar={ toggleSidebar } />) } >Sign In</Button>
            </div>
        </div>
    )
}

export default SignUp;
