import { gql } from "@apollo/client";

// npx mikro-orm schema:update --run

//personnel
export const CREATE_PERSONNEL = gql `
mutation createpersonnel ($createPersonnelUser: PersonnelCreateInput!) {
    createpersonnel (createPersonnelUser: $createPersonnelUser) {
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



//categorie personnel
export const CREATE_CATEGORY_PERSONNEL = gql`
mutation createcategoriepersonnnel ($createCategoriePersonnel: CategoriePersonnelCreateInput!) {
    createcategoriepersonnnel (createCategoriePersonnel: $createCategoriePersonnel) {
        id
        nom
        description
        montant
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
            montantPensionSalle
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
        }
    }
`;

export const CREATE_STUDY_LEVEL = gql `
    mutation createNiveauEtude ($niveauEtude: NiveauEtudeCreateInput!) {
        createNiveauEtude (niveauEtude: $niveauEtude) {
            id
            name
            description
            montantPension
        }
    }
`;

//annee academique
export const CREATE_ANNEE_ACADEMIQUE = gql`
    mutation createAnnerAccademique ($anneeAccademique: AnneeAccademiqueCreateInput!) {
        createAnnerAccademique (anneeAccademique: $anneeAccademique) {
            id
            name
            description
        }
    }
`;

//frais inscription
export const CREATE_FRAIS_INSCRIPTION = gql`
    mutation createFraisInscription ($fraisInscription: FraisInscriptionInput!) {
        createFraisInscription (fraisInscription: $fraisInscription) {
            id
            nameFraisInscription
            montant
        }
    }
`;


//reduction scolarite
export const CREATE_REDUCTION_SCOLARITE = gql `
    mutation createreductionscolarite ($reductionscolarite: RedutionScolariteInput!) {
        createreductionscolarite (reductionscolarite: $reductionscolarite) {
            id
            name
            description
            montant
            pourcentage
        }
    }
`;

//cretion de lq tranche
export const CREATE_TRANCHE_PENSION = gql `
    mutation createTranche ($tranche: TrancheCreateInput!) {
        createTranche (tranche: $tranche) {
            id
            name
            description
            dateLine
            montant
            priority
        }
    }
`

//fronction d'initialisation du paiemt d'une pension pour un eleve donne
export  const CREATE_TRANCHE_STUDENT = gql `
    mutation createTrancheStudent ($trancheStudent: TrancheStudentCreateInput!) {
        createTrancheStudent (trancheStudent: $trancheStudent) {
            id
            name
            description
            montant
            complete
            reste
        }
    }
`;

//mutation de creation de l'avance tranche de la pension
export const CREATE_AVANCE_TRANCHE = gql `
    mutation createavancetranche ($avancetranche: AvanceTrancheCreateInput!) {
        createavancetranche (avancetranche: $avancetranche) {
            id
            name
            description
            dateLine
            montant
            reste
            complete
        }
    }
`;

export const CREATE_SCOLARITE_TRANCHE_STUDENT  = gql`
    mutation createTrancheStudent ($trancheStudent: TrancheStudentCreateInput!) {
        createTrancheStudent (trancheStudent: $trancheStudent) {
            id
            name
            description
            montant
            complete
            reste
            surplus
            avance
        }
    }
`;

//mutation d'affection de la pension a une classe 
export const CREATE_MONTANT_SCOLARITE_CLASS = gql `
    mutation createPension ($pension: PensionCreateInput!) {
        createPension (pension: $pension) {
            id
            name
            description
            montantPension
            dateLine
        }
    }
`;

export const CREATE_PERSONNEL_SALLE = gql `
    mutation createPersonnelSalle ($input: PersonnelSalleCreateInput!) {
        createPersonnelSalle (input: $input) {
            id
        }
    }
`;


export const CREATE_COURSE = gql`
    mutation createCourse ($input: CourseCreateInput!) {
        createCourse (input: $input) {
            id
            title
            time
        }
    }
`;

export const CREATE_TRANCHE_PRIORITY = gql`
    mutation createtranchepriority ($input: TranchePriorityInput!) {
        createtranchepriority (input: $input) {
            id
            name
            description
        }
    }
`
export const CREATE_PARENT = gql`
mutation createParent ($parent: ParentCreateInput!) {
    createParent (parent: $parent) {
        id
        firstname
        lastname
        profession
        email
        phonenumber
        gender
        parentStatus
        childNumber
    }
}`

export const AFFECTATION_PARENT_TO_STUDENT = gql `
mutation createParentstudent ($input: ParentStudentCreateInput!) {
    createParentstudent (input: $input) {
        id
        tuteur
        childNumber
    }
}
`;

export const fragmentCycle = gql` fragment CycleClass on cyle {
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
            montantPensionSalle
            effectif
        }
    }
`;

export const DELETE_STUDY_LEVEL = gql `
mutation deleteNiveauEtude ($id: String!) {
    deleteNiveauEtude (id: $id) {
        id
        name
        description
        montantPension
    }
}`


export const DELETE_STUDENT = gql `
    mutation deletestudent ($id: String!) {
        deletestudent (id: $id) {
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

//SUPPRESSION D;UN COURS

export const DELETE_COURSE = gql `
    mutation deleteCourse ($id: String!) {
        deleteCourse (id: $id) {
            id
            title
            time
        }
    }
`;


//Suppression des montant des tranches de la pension
export const DELETE_TRANCHE_PENSION = gql `
    mutation deletepension ($id: String!) {
        deletepension (id: $id) {
            id
            name
            description
            montantPension
            dateLine
        }
    }
`;
//update class
export const UPDATE_SALLE = gql `
    mutation UpdateSalle ($id: String!, $input: SalleUpdateInput!) {
        UpdateSalle (id: $id, input: $input) {
            id
            name
            section 
            cycle
            montantPensionSalle
            effectif
        }
    }
`;

//Suppression d'un parent
export const DELETE_PARENT = gql `
    mutation deleteparent ($id: String!) {
        deleteparent (id: $id) {
            id
            firstname
            lastname
            profession
            email
            phonenumber
            gender
            parentStatus
            childNumber
        }
    }
`

//mise a jour de la section

export const UPDATA_SECTION = gql `
    mutation updatesection ($id: String!, $input: SectionUpdateInput!) {
        updatesection (id: $id, input: $input) {
            id
            name
            description
        }
}
`
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


//update eleve

export const UPDATE_STUDENT = gql `
mutation updateStudent ($id: String!, $input: StudentCreateInput!) {
    updateStudent (id: $id, input: $input) {
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

//create user
export const CREATE_USER = gql `
    mutation createuser ($createUser: UserCreateInput!) {
        createuser (createUser: $createUser) {
            id
            email
            password
            firstName
            lastName
            phoneNumber
            role
            active
            deactivatedAt
        }
    }
`;

//user login

export const LOGIN_USER = gql `
mutation login ($loginInput: LoginInput!) {
    login (loginInput: $loginInput) {
        access_token
        user {
            id
            email
            password
            firstName
            lastName
            phoneNumber
            role
            active
            deactivatedAt
        }
    }
}
`;

//prime

export const CREATE_PRIME = gql `
mutation createprime ($prime: PrimeCreateInput!) {
    createprime (prime: $prime) {
        id
        nom
        description
        montant
    }
}
`;

// retenue

export const CREATE_RETENUE = gql `
mutation createretenuesalarial ($retenue: RetenuCreateInput!) {
    createretenuesalarial (retenue: $retenue) {
        id
        nom
        description
        montant
    }
}
`;

//prime personel

export const CREATE_PRIME_PERSONNEL = gql `
mutation createprimepersonnel ($primePersonnel: PrimePersonnelCreateInput!) {
    createprimepersonnel (primePersonnel: $primePersonnel) {
        id
        startMonth
    }
}
`;

//generer le Salaire personnel

export const CREATE_SALAIRE = gql `
mutation createsalaire ($input: SalaireCreateInput!) {
    createsalaire (input: $input) {
        id
        jourPaie
        moisPaie
        montant
    }
}
`;

//payer salaire

export const PAY_SALAIRE = gql `
mutation createpaysalaire ($input: PaySalaireCreateInput!) {
    createpaysalaire (input: $input) {
        id
        jourPaie
        moisPaie
        payer
        montant
    }
}
`;

export const UPDATE_LEVEL = gql `
mutation updateNiveauEtude ($id: String!, $input: NiveauEtudeUpdateInput!) {
    updateNiveauEtude (id: $id, input: $input) {
        id
        name
        description
        montantPension
    }
}
`







