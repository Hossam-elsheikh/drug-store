import * as Yup from 'yup'
type TranslationFunction = (key: string) => string;

export const AuthFormSchema = (type: string, fe: TranslationFunction) =>
    Yup.object().shape({
        name:
            type === 'sign-up'
                ? Yup.string().required(fe('nameRequired')).min(3).max(50)
                : Yup.string(),
        mobile:
            type === 'sign-up'
                ? Yup.string()
                    .required(fe('mobileRequired'))
                    .matches(/^\+?[0-9]+$/, fe('mobileInvalid'))
                : Yup.string(),
        addresses:
            type === 'sign-up'
                ? Yup.array()
                    .of(
                        Yup.object().shape({
                            governorate: Yup.string().required(fe('governorateRequired')),
                            city: Yup.string().required(fe('cityRequired')),
                            // block: Yup.string().required(
                            //     'block is required'
                            // ),
                        })
                    )
                    .required(fe('addressRequired'))
                : Yup.array(),
        email: Yup.string()
            .required(fe('emailRequired'))
            .email(fe('emailInvalid')),
        password: Yup.string()
            .required(fe('passwordRequired'))
            .min(8, fe('passwordMin'))
            // .matches(
            //     /[a-z]/,
            //     'Password must contain at least one lowercase letter'
            // )
            // .matches(
            //     /[A-Z]/,
            //     'Password must contain at least one uppercase letter'
            // )
            // .matches(/[0-9]/, 'Password must contain at least one number')
            // .matches(
            //     /[!@#$%^&*(),.?":{}|<>]/,
            //     'Password must contain at least one special character'
            // ),
        // confirmPassword:
        //     type === 'sign-up'
        //         ? Yup.string()
        //             .oneOf([Yup.ref('password')], 'Passwords do not match')
        //             .required('Re-entering password is required')
        //         : Yup.string(),
    })

export const initialAuthFormValues = {
    name: '',
    age: '',
    mobile: '',
    addresses: [{ governorate: '', city: '', block: '' }],
    email: '',
    password: '',
    confirmPassword: '',
}

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
            // block: Yup.string().required('block is required'),
        })
    ),
    // postalCode: Yup.string().required('Postal Code is required'),
})

export const CheckoutInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryAddress: [{ governorate: '', city: '', block: '' }],
    postalCode: '',
}

// password Modal UserProfile

export const ModalPasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .matches(/[0-9]/, 'Password must contain at least one number')
        // .matches(
        //     /[!@#$%^&*(),.?":{}|<>]/,
        //     'Password must contain at least one special character'
        // )
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

// Checkout Validation Schema

export const addressValidationSchemaDialog = Yup.object({
    governorate: Yup.string().required('governorate is required'),
    city: Yup.string().required('City is required'),
    // block: Yup.string().required('block is required'),
})

export const governorates: any = {
    "Al Asimah": ["Kuwait City", "Dasma", "Mirqab", "Qibla", "Salhiya", "Sharq", "Bneid Al-Gar", "Mansouriya"],
    "Hawalli": ["Hawalli", "Salmiya", "Bayan", "Rumaithiya", "Jabriya", "Shaab", "Maidan Hawalli"],
    "Farwaniya": ["Farwaniya", "Khaitan", "Jleeb Al-Shuyoukh", "Al-Rai", "Ardhiya", "Riggai", "Omariya"],
    "Mubarak Al-Kabeer": ["Abu Al-Hasaniya", "Abu Fatira", "Al-Messila", "Al-Qurain", "Mubarak Al-Kabeer", "Sabah Al-Salem", "Fnaitees"],
    "Al Jahra": ["Jahra", "Saad Al Abdullah", "Abdali", "Subiya", "Al-Naeem", "Al-Oyoun"],
    "Al Ahmadi": ["Ahmadi", "Fahaheel", "Mangaf", "Egaila", "Mahboula", "Abu Halifa", "Sabahiya"]
};