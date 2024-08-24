import * as Yup from 'yup'

export const AuthFormSchema = (type: string) =>
    Yup.object().shape({
        name:
            type === 'sign-up'
                ? Yup.string().required('Name is required').min(3).max(50)
                : Yup.string(),
        mobile:
            type === 'sign-up'
                ? Yup.string()
                      .required('Mobile is required')
                      .matches(/^[0-9]+$/, 'Mobile number is not valid')
                : Yup.string(),
        addresses:
            type === 'sign-up'
                ? Yup.array()
                      .of(
                          Yup.object().shape({
                              state: Yup.string().required('State is required'),
                              city: Yup.string().required('City is required'),
                              street: Yup.string().required(
                                  'Street is required'
                              ),
                          })
                      )
                      .required('Addresses is required')
                : Yup.array(),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .matches(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            )
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                'Password must contain at least one special character'
            ),
        confirmPassword:
            type === 'sign-up'
                ? Yup.string()
                      .oneOf([Yup.ref('password')], 'Passwords do not match')
                      .required('Re-entering password is required')
                : Yup.string(),
    })

export const initialAuthFormValues = {
    name: '',
    age: '',
    mobile: '',
    addresses: [{ state: '', city: '', street: '', block: '' }],
    email: '',
    password: '',
    confirmPassword: '',
}

// Checkout Validation Schema

export const CheckoutValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(3).max(40),
    lastName: Yup.string().required('Last Name is required').min(3).max(40),
    mobile: Yup.string()
        .required('Mobile is required')
        .matches(/^[0-9]+$/, 'Mobile number is not valid'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    deliveryAddress: Yup.array().of(
        Yup.object().shape({
            country: Yup.string().required('Country is required'),
            city: Yup.string().required('City is required'),
            street: Yup.string().required('Street is required'),
        })
    ),
    postalCode: Yup.string().required('Postal Code is required'),
})

export const CheckoutInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryAddress: [{ country: '', city: '', street: '' }],
    postalCode: '',
}

// password Modal UserProfile

export const ModalPasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            'Password must contain at least one special character'
        )
        .required('New password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your new password'),
})

export const ModalPasswordInitialValues = {
    newPassword: '',
    confirmNewPassword: '',
}

// UserProfile Modal Data
export const UserProfileDataValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must not exceed 50 characters'),
    email: Yup.string().email('Invalid email'),
    mobile: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid'),
})

// search Schema

export const SearchSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters'),
})
