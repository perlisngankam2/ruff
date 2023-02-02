import { gql } from "@apollo/client";

//personnel
export const CREATE_PERSONNEL = gql `
    mutation createpersonnel ($createPersonnelUser: PersonnelCreateInput!) {
        createpersonnel (createPersonnelUser: $createPersonnelUser) {
            id
            situationMatrimonial
            sexe
            fonction
            status
            dateOfStartWork
            dateOfBirth
            matricule
            childNumber
        }
    }
`;

//categorie personnel
export const CREATE_CATEGORY_PERSONNEL = gql`
    mutation createcategoriepersonnnel ($createCategoriePersonnel: CategoriePersonnelCreateInput!) {
        createcategoriepersonnnel (createCategoriePersonnel: $createCategoriePersonnel) {
            id
            nom
            description
        }
    }
`;


//Students
export const CREATE_STUDENT = gql` 
    mutation createStudent ($student: StudentCreateInput!) {
        createStudent (student: $student) {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            classe
            adress
            transport
            categoryStudent
            fatherFirstName
            fatherLastName
            fatherPhoneNumber
            fatherProfession
            motherFirstName
            motherLastName
            motherPhoneNumber
            motherProfession
            tutorFirstName
            tutorLastName
            tutorPhoneNumber
            tutorProfession
        }
    }
`;

//student category
export const CREATE_CATEGORY_ELEVE = gql ` 
    mutation createcategorieeleve ($createCategorieEleve: CategorieEleveCreateInput!) {
        createcategorieeleve (createCategorieEleve: $createCategorieEleve) {
            id
            nom
            description
        }
    }
`;


//class
export const CREATE_SALLE = gql ` 
    mutation createSalle ($salle: SalleCreateInput!) {
        createSalle (salle: $salle) {
            id
            name
            section
            cycle
            effectif
        }
    }
`;

//section
export const CREATE_SECTION = gql `
    mutation createSection ($section: SectionCreateInput!) {
        createSection (section: $section) {
            id
            name
            description
        
        }
    }
`;

//cycle
export const CREATE_CYCLE = gql `
    mutation createCycle ($cycle: CycleCreateInput!) {
        createCycle (cycle: $cycle) {
            id
            name
            section
        }
    }
`;

export const fragmentCyle = gql` fragment CycleClass on cyle {
    id
    name
    section
}
`;


//delete Categprie personnel
export const DELETE_CATEGORY_PERSONNEL = gql `
    mutation deletecategoriepersonnel ($id: String!) {
        deletecategoriepersonnel (id: $id) {
            id
            nom
            description
        }
    }
`;


//delete personnel
export const DELETE_PERSONNEL = gql `
    mutation deletepersonnel ($id: String!) {
        deletepersonnel (id: $id) {
            id
            situationMatrimonial
            sexe
            fonction
            status
            dateOfStartWork
            dateOfBirth
            matricule
            childNumber
        }
    }
`;


//delete section
export const DELETE_SECTION = gql `
mutation deletesection ($id: String!) {
    deletesection (id: $id) {
        id
        name
        description
    }
}
`;

export const DELETE_CYCLE = gql `
    mutation deletecycle ($id: String!) {
        deletecycle (id: $id) {
            id
            name
            section
        }
}
`;

export const DELETE_SALLE = gql `
    mutation deleteSalle ($id: String!) {
        deleteSalle (id: $id) {
            id
            name
            section
            cycle
            effectif
        }
    }
`;


export const DELETE_STUDENT = gql `
    mutation deletestudent ($id: String!) {
        deletestudent (id: $id) {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            classe
            adress
            transport
            categoryStudent
            fatherFirstName
            fatherLastName
            fatherPhoneNumber
            fatherProfession
            motherFirstName
            motherLastName
            motherPhoneNumber
            motherProfession
            tutorFirstName
            tutorLastName
            tutorPhoneNumber
            tutorProfession
        }
    }
`;


//categorie Student

export const DELETE_CATEGORY_STUDENT = gql `
    mutation deletecategorieeleve ($id: String!) {
        deletecategorieeleve (id: $id) {
            id
            nom
            description
        }
    }
`;


//update class
export const UPDATE_CLASS = gql `
    mutation UpdateSalle ($id: String!, $input: SalleUpdateInput!) {
        UpdateSalle (id: $id, input: $input) {
            id
            name
            section
            cycle
            effectif
        }
    }
`;


//update cycle
export const UPDATE_CYCLE = gql `
    mutation updatecycle ($id: String!, $input: CycleUpdateInput!) {
        updatecycle (id: $id, input: $input) {
            id
            name
            section
        }
    }
`;








