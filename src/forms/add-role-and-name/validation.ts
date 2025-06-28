import { FormErrorTypes, FormValueTypes } from "./types";

export const validateAddRoleAndName = (values : FormValueTypes) => {
const errors: FormErrorTypes = {};

if (!values.role) {
    errors.role = 'Role is required';
}

if (!values.firstName) {
    errors.firstName = 'First Name is required';
}

if (!values.lastName) {
    errors.lastName = 'Last Name is required';
}

return errors;
}