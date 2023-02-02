import {gql} from '@apollo/client';

//personnel
export const GET_ALL_PERSONNELS = gql `
    query findAllpersonnel {
        findAllpersonnel {
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

//category personnel
export const GET_ALL_Category_Personnel = gql ` 
    query findAllcategoriepersonnel {
        findAllcategoriepersonnel {
            id
            nom
            description
        }
    }
`;


//student
export const GET_ALL_ATUDENT =  gql `
    query findAllstudents {
        findAllstudents {
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
`

//categorie eleve
export const GET_ALL_Category_Eleve= gql ` 
    query findAllcategorieeleve {
        findAllcategorieeleve {
            id
            nom
            description
        }
    }
`;

//section 
export const GET_ALL_SECTION =  gql `
    query findAllsection {
        findAllsection {
            id
            name
            description
        }
    }
`;

//cycle 
export const GET_ALL_CYCLE =  gql `
    query findAllcycle {
        findAllcycle {
            id
            name
            section
        }
    }
`;

export const GET_ALL_CLASS =  gql `
    query findAllsalle {
        findAllsalle {
            id
            name
            section
            cycle
            effectif
        }
    }
`;


//one student

export const GET_ONE_STUDENT =  gql `
    query findOnestudent ($id: String!) {
        findOnestudent (id: $id) {
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

//one cycle
export const GET_ONE_CYCLE =  gql `
query findOnecycle ($id: String!) {
    findOnecycle (id: $id) {
        id
        name
        section
    }
}
`;


