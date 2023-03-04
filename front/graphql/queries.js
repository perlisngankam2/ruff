import {gql} from '@apollo/client';
import Personnel from '../pages/personnel';

//personnel
export const GET_ALL_PERSONNELS = gql `
query findAllpersonnel {
    findAllpersonnel {
        id
        firstName
        lastName
        phoneNumber
        salary
        situationMatrimonial
        sexe
        fonction
        status
        dateOfStartWork
        dateOfBirth
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
export const GET_ALL_STUDENT =  gql `
query findAllstudents {
        findAllstudents {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            adress
            transport
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


export const GET_ALL_FRAIS_INSCRIPTION =  gql `
    query findAllfraisinscription {
        findAllfraisinscription {
            id
            nameFraisInscription
            montant
        }
    }
`;


// one Personnel
export const GET_ALL_PERSONNEL_BY_ID = gql `
query findOnePersonnel ($id: String!) {
    findOnePersonnel (id: $id) {
        id
        firstName
        lastName
        phoneNumber
        situationMatrimonial
        sexe
        fonction
        status
        dateOfStartWork
        dateOfBirth
        childNumber
    }
}
`;

//one student
export const GET_STUDENT_BY_ID =  gql `
    query findOnestudent ($id: String!) {
        findOnestudent (id: $id) {
            id
            matricule
            firstname
            lastname
            dateOfBirth
            sex
            adress
            transport
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


//annee academique
export const GET_ALL_ANNEE_ACADEMIQUE = gql `
    query findAllAnnerAccademique {
        findAllAnnerAccademique {
            id
            name
            description
        }
    }
`
//niveau d'etude
export const GET_ALL_STUDY_LEVEL = gql `
    query findAllNiveauEtude {
        findAllNiveauEtude {
            id
            name
            description
            montantPension
        }
    }
`

//get reduction scolarite
export const GET_ALL_REDUCTION_SCOLARITE = gql  `
    query findAllreductionscolarite {
        findAllreductionscolarite {
            id
            name
            description
            montant
            pourcentage
        }
    }
`;

//one cycle
export const GET_ONE_CYCLE =  gql `
query findOnecycle ($id: String!) {
    findOnecycle (id: $id) {
        id
        name
    }
}
`;

export const GET_USER_CONNECTED = gql `
query user ($id: String!) {
    user (id: $id) {
        id
        email
        password
        firstName
        lastName
        name
        role
        phoneNumber
        active
        deactivatedAt
    }
}
`;


export const GET_ALL_USER = gql `
query findAlluser {
    findAlluser {
        id
        email
        password
        firstName
        lastName
        name
        role
        phoneNumber
        active
        deactivatedAt
    }
}
`;

//personnel by userid

export const GET_PERSONNEL_BY_USERID= gql `
query getpersonnelbyaccount ($userid: String!) {
    getpersonnelbyaccount (userid: $userid) {
        id
        firstName
        lastName
        phoneNumber
        salary
        situationMatrimonial
        sexe
        fonction
        status
        dateOfStartWork
        dateOfBirth
        childNumber
    }
}
`;




