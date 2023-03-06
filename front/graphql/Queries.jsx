import {gql} from '@apollo/client';

//personnel
export const GET_ALL_PERSONNELS = gql `
    query findAllpersonnel { 
        findAllpersonnel {
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
            password
            email
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

//liste des classes
export const GET_ALL_CLASS =  gql `
    query findAllsalle {
        findAllsalle {
            id
            name
            section
            cycle
            montantPensionSalle
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
export const GET_PERSONNEL_BY_ID =  gql `
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
            password
            email
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

//recuperqtion de toutes les tranches
export const GET_ALL_TRANCHE_PENSION = gql `
    query findAlltranche {
        findAlltranche {
            id
            name
            description
            dateLine
            montant
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



