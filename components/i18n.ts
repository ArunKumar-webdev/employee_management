/* eslint-disable */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        ns: ["translations"],
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"]
        },
        defaultNS: "translations",
        returnObjects: true,
        resources: {
            en: {
                translations: {
                    EmployeeId: "Employee Id",
                    EmployeeManagementPortal: "Employee Management Portal",
                    EmployeeName: "Employee Name",
                    EmployeeSalary: "Employee Salary",
                    EmployeeSalary: "Employee Salary",
                    EmployeeAge: "Employee Age",
                    Edit: "Edit",
                    Delete: "Delete",
                    ViewEmployee: "View Employee",
                    EditEmployee: "Edit Employee",
                    AddEmployee: "Add Employee",
                    ProfileImagePreview: "Profile Image Preview",
                    Name: "Name",
                    Salary: "Salary",
                    Age: "Age",
                    ProfileImage: "Profile Image"
                }
            },
            fr: {
                translations: {
                    EmployeeId: "ID d'employé",
                    EmployeeManagementPortal: "Portail de gestion des employés",
                    EmployeeName: "Nom de l'employé",
                    EmployeeSalary: "Salaire de l'employé",
                    EmployeeAge: "Âge des employés",
                    Edit: "Modifier",
                    Delete: "supprimer",
                    ViewEmployee: "Voir l'employé",
                    EditEmployee: "Modifier un employé",
                    AddEmployee: "Ajouter un employé",
                    ProfileImagePreview: "Aperçu de l'image de profil",
                    Name: "Nom",
                    Salary: "Salaire",
                    Age: "Âge",
                    ProfileImage: "Image de profil"
                }
            }
        },
        react: {
            useSuspense: false,
            bindI18n: "languageChanged loaded",
            bindStore: "added removed",
            nsMode: "default"
        }
    });

export { i18n as i18nInit };
