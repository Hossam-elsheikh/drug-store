import * as Yup from 'yup';

export const AuthFormSchema = (type: string) => Yup.object().shape({
    name: type === "sign-up" ? Yup.string().required("Name is required").min(3).max(50) : Yup.string(),
    mobile: type === "sign-up" ? Yup.string().required("Mobile is required").matches(/^[0-9]+$/, "Mobile number is not valid") : Yup.string(),
    addresses: type === "sign-up" ? Yup.array().of(
        Yup.object().shape({
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
            street: Yup.string().required("Street is required"),
        })
    ).required("Addresses is required") : Yup.array(),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: type === "sign-up" ? Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required("Re-entering password is required") : Yup.string(),
});

export    const initialAuthFormValues = {
        name: "",
        age: "",
        mobile: "",
        addresses: [{ state: "", city: "", street: "", block: "" }],
        email: "",
        password: "",
        confirmPassword: "",
    }