import FormErrors from "./FormErrors";
import Error from "./Error";

export type ExpressError = {
    formErrors?: FormErrors[],
    systemErrors?: Error
}