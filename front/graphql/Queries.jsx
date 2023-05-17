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
    }
}
`

//category personnel
export const GET_ALL_Category_Personnel = gql ` 
    query findAllcategoriepersonnel {
        findAllcategoriepersonnel {
            id
            nom
            description
            montant
        }
    }
`;


export const GET_Category_Personnel_BY_ID = gql ` 
query findOneCategoriepersonnel ($id: String!) {
    findOneCategoriepersonnel (id: $id) {
        id
        nom
        description
        montant
    }
}
`;

export const GET_Category_Personnel_ID = gql ` 
query findCategoriepersonnelbypersonnel ($personnelid: String!) {
    findCategoriepersonnelbypersonnel (personnelid: $personnelid)
}
`;

export const GET_SALLE_BY_ID = gql ` 
    query findOnesalle ($id: String!) {
        findOnesalle (id: $id) {
            id
            name
            section
            montantPensionSalle
            effectif
            levelId
            levelName
        }
    }
` 

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
            salleid
            salleName
            categorieid
            categoryName
            parentTel
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

//recuperation de la secrion de l'eleve
export const GET_SECTION_STUDENT_BY_ID = gql `
    query findSectionByStudent ($studentid: String!) {
        findSectionByStudent (studentid: $studentid) {
            id
            name
            description
        }
    }
`

//cycle 
export const GET_ALL_CYCLE =  gql `
    query findAllcycle {
        findAllcycle {
            id
            name
            sectionid
            sectionName
        }
    }
`;

//liste des classes
export const GET_ALL_CLASS = gql `
    query findAllsalle {
        findAllsalle {
            id
            name
            section
            montantPensionSalle
            effectif
            levelId
            levelName
        }
    }
`;

//get al frais inscription
export const GET_ALL_FRAIS_INSCRIPTION =  gql `
    query findAllfraisinscription {
        findAllfraisinscription {
            id
            nameFraisInscription
            montant
        }
    }
`;


//reguperation des information de l'etablissement
export const GET_ALL_SCHOOL_PARAMETER = gql  `
query findAllparameters {
    findAllparameters {
        id
        name
        postalBox
        phoneNumber
        emailAddress
        schoolCurrency
        contry
        year
        anneeAcademiqueName
        anneeAcademiqueId
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
            birthPlace
            sex
            adress
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
            salleid
            salleName
            categorieid
            categoryName
            parentTel
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
            cycleid
            cycleName
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
            priority
        }
    }
`;

//tranche student recupere toutes les tranches qui ont ete paye par un eleve
export const GET_ALL_TRANCHE_STUDENT = gql `
    query findAlltranchestudent {
        findAlltranchestudent {
            id
            name
            description
            montant
            complete
            reste
            surplus
            studentid
            trancheid
        }
}
`;

//stattistique des eleves de la section anglophone 
export const GET_STUDENT_STATISTICS_ANGLOPHONE_SECTION = gql `
    query getStudentStatisticsAnglophone {
        getStudentStatisticsAnglophone {
            name
            matricle
            amountExpected
            amountPaid
            collectionRate
            restToPay
            rateArrears
        }
    }
`

//TOTal stattistique des eleves de la section anglophone
export const GET_TOTAL_STUDENT_STATISTICS_ANGLOPHONE_SECTION = gql `
    query getTotalStudentStatisticsAnglophone {
        getTotalStudentStatisticsAnglophone {
            MONTANT_ATTENDU
            MONTANT_EN_CAISSE
            TAUX_ENCAISSEMENT
            RESTE_RECOUVRER
            TAUX_RAR
        }
    }
`

//stattistique des eleves de la section francophone
export const GET_STUDENT_STATISTICS_FRANCOPHONE_SECTION = gql `
    query getStudentStatisticsFrancophone {
        getStudentStatisticsFrancophone {
            name
            matricle
            section
            amountExpected
            amountPaid
            collectionRate
            restToPay
            rateArrears
        }
    }
`
  // //total stattistique des eleves de la section francophone
export const GET_TOTAL_STUDENT_STATISTICS_FRANCOPHONE_SECTION = gql `
    query getTotalStudentStatisticsFrancophone {
        getTotalStudentStatisticsFrancophone {
            MONTANT_ATTENDU
            MONTANT_EN_CAISSE
            TAUX_ENCAISSEMENT
            RESTE_RECOUVRER
            TAUX_RAR
        }
    }
`


// grand tableau des stattistique To des eleves par sections et par classe section anglophone
export const GET_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION = gql`
query getGeneralAnglophoneSectionStatistics {
    getGeneralAnglophoneSectionStatistics {
        sectionName
        className
        numberOfStudents
        expectedAmount
        sumAmountAlreadyPaid
        rateT
        amountRest
        rateZ
    }
}
`
export const GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_ANGLOPHONE_SECTION = gql `
query TotalGeneralAnglophoneSectionStatistics {
    TotalGeneralAnglophoneSectionStatistics {
        TOTAL_EFFECTIFS_ENREGISTRES
        TOTAL_MONTANT_ATTENDU
        TOTAL_MONTANT_EN_CAISSE
        TOTAL_TAUX_ENCAISSEMENT
        TOTAL_RESTE_A_RECOUVRER
        TAUX_RAR
    }
}
`

//Le vrai To pour la section francophone 
// TABLEAU DE SUIVI GENERAL  DU PAIEMENT DES FRAIS DE SCOLARITE
export const GET_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION = gql `
    query getGeneralFrancophoneSectionStatistics {
        getGeneralFrancophoneSectionStatistics {
            sectionName
            className
            numberOfStudents
            expectedAmount
            sumAmountAlreadyPaid
            rateT
            amountRest
            rateZ
        }
    }
`



//total de suivie generala de paiement des vrai de scolarite section francophone
export const GET_TOTAL_GENERAL_FEES_STATISTICS_PER_CLASS_FRANCOPHONE_SECTION = gql `
query TotalGeneralFrancophoneSectionStatistics {
    TotalGeneralFrancophoneSectionStatistics {
        TOTAL_EFFECTIFS_ENREGISTRES
        TOTAL_MONTANT_ATTENDU
        TOTAL_MONTANT_EN_CAISSE
        TOTAL_TAUX_ENCAISSEMENT
        TOTAL_RESTE_A_RECOUVRER
        TAUX_RAR
    }
}
`

//Statistique de l'inscription pour la section anglphone 
export const GET_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS = gql`
query getSectionStatisticsAnglophoneAdmissionFee {
    getSectionStatisticsAnglophoneAdmissionFee {
        sectionName
        className
        numberOfStudents
        numberOfStudentsStartedPaying
        expectedAmount
        numberOfStudentsCompletedFee
        TAUXA
        sumAmountAlreadyPaid
        TAUXB
        numberOfStudentsNotPaid
        TAUXC
        amountRest
        TAUXD
    }
}
`

export const GET_TOTAL_STATISTICS_PRIMAIRE_ANGLOPHONE_CLASS = gql`
    query TotalSectionStatisticsAnglophoneAdmissionFee {
        TotalSectionStatisticsAnglophoneAdmissionFee {
            TOTAL_EFFECTIFS_ENREGISTRES
            TOTAL_MONTANT_ATTENDU
            TOTAL_NOMBRE_ENCAISSEMENT
            TOTAL_NOMBRE_SANS_ENCAISSEMENT
            TOTAL_MONTANT_EN_CAISSE
            TOTAL_FIRST_TAUX_ENCAISSEMENT
            TOTAL_SECOND_TAUX_ENCAISSEMENT
            TOTAL_RESTE_A_RECOUVRER
            TOTAL_FIRST_TAUX_RECOUVRIR
            TOTAL_SECOND_TAUX_RECOUVRIR
        }
    }
`

//Statistique de l'inscription pour la section francophone 
export const GET_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS = gql `
query getSectionStatisticsFrancophoneAdmissionFee {
    getSectionStatisticsFrancophoneAdmissionFee {
        sectionName
        className
        numberOfStudents
        numberOfStudentsStartedPaying
        expectedAmount
        numberOfStudentsCompletedFee
        TAUXA
        sumAmountAlreadyPaid
        TAUXB
        numberOfStudentsNotPaid
        TAUXC
        amountRest
        TAUXD
    }
}
`

export const GET_TOTAL_STATISTICS_PRIMAIRE_FRANCOPHONE_CLASS = gql`
query TotalSectionStatisticsFrancophoneAdmissionFee {
    TotalSectionStatisticsFrancophoneAdmissionFee {
        TOTAL_EFFECTIFS_ENREGISTRES
        TOTAL_MONTANT_ATTENDU
        TOTAL_NOMBRE_ENCAISSEMENT
        TOTAL_NOMBRE_SANS_ENCAISSEMENT
        TOTAL_MONTANT_EN_CAISSE
        TOTAL_FIRST_TAUX_ENCAISSEMENT
        TOTAL_SECOND_TAUX_ENCAISSEMENT
        TOTAL_RESTE_A_RECOUVRER
        TOTAL_FIRST_TAUX_RECOUVRIR
        TOTAL_SECOND_TAUX_RECOUVRIR
    }
}
`

//Statistique de PREMIERERE TRANCHE pour la section anglphone 

export const GET_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION = gql`
    query getSectionStatisticsAnglophoneFirstInstalment {
        getSectionStatisticsAnglophoneFirstInstalment {
            sectionName
            className
            numberOfStudents
            expectedAmount
            numberOfStudentsCompletedFee
            TAUXA
            sumAmountAlreadyPaid
            TAUXB
            numberOfStudentsNotPaid
            TAUXC
            amountRest
            TAUXD
        }
    }
`;

export const GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_ANGLOPHONE_SECTION = gql`
query TotalSectionStatisticsAnglophoneFirstInstalmentFee {
        TotalSectionStatisticsAnglophoneFirstInstalmentFee {
            TOTAL_EFFECTIFS_ENREGISTRES
            TOTAL_MONTANT_ATTENDU
            TOTAL_NOMBRE_ENCAISSEMENT
            TOTAL_NOMBRE_SANS_ENCAISSEMENT
            TOTAL_MONTANT_EN_CAISSE
            TOTAL_FIRST_TAUX_ENCAISSEMENT
            TOTAL_SECOND_TAUX_ENCAISSEMENT
            TOTAL_RESTE_A_RECOUVRER
            TOTAL_FIRST_TAUX_RECOUVRIR
            TOTAL_SECOND_TAUX_RECOUVRIR
        }
    }
`;


//Statistique de PREMIERE TRANCHE POUR LA SECTION FRANCOPHONE
export const GET_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION = gql`
query getSectionStatisticsFrancophoneFirstInstalment {
    getSectionStatisticsFrancophoneFirstInstalment {
        sectionName
        className
        numberOfStudents
        numberOfStudentsStartedPaying
        expectedAmount
        numberOfStudentsCompletedFee
        TAUXA
        sumAmountAlreadyPaid
        TAUXB
        numberOfStudentsNotPaid
        TAUXC
        amountRest
        TAUXD
    }
}`

export const GET_TOTAL_STATISTICS_TRANCHE1_PRIMAIRE_FRANCOPHONE_SECTION = gql`
    query TotalSectionStatisticsFrancophoneFirstInstalmentFee {
        TotalSectionStatisticsFrancophoneFirstInstalmentFee {
            TOTAL_EFFECTIFS_ENREGISTRES
            TOTAL_MONTANT_ATTENDU
            TOTAL_NOMBRE_ENCAISSEMENT
            TOTAL_NOMBRE_SANS_ENCAISSEMENT
            TOTAL_MONTANT_EN_CAISSE
            TOTAL_FIRST_TAUX_ENCAISSEMENT
            TOTAL_SECOND_TAUX_ENCAISSEMENT
            TOTAL_RESTE_A_RECOUVRER
            TOTAL_FIRST_TAUX_RECOUVRIR
            TOTAL_SECOND_TAUX_RECOUVRIR
        }
    }
`


//recuperation d'une tranche de pension
export const GET_TRANCHE_PENSION_BY_ID = gql `
    query tranche ($id: String!) {
        tranche (id: $id) {
            id
            name
            description
            dateLine
            montant
            priority
        }
    }
`;

export const GET_ALL_MONTANT_TRANCHE_BY_SALLE = gql `
    query findAmountsBySalle ($salleid: String!) {
        findAmountsBySalle (salleid: $salleid)
    }
`

// export const GET_MONTANT_PENSION_SALLE_BY_STUDENT = gql `
//     query findMontantPensionstudent ($studentid: String!) {
//         findMontantPensionstudent (studentid: $studentid)
//     }
// `


//recuperation de toutes les payement de salaire et de scolarite pour gerer les depenses
export const GET_ALL_EXPENSE_PERSONNEL_STUDENT = gql `
    query findallexpenses {
        findallexpenses {
            id
            creditamount
            debitamount
            debitTotal
            creditTotal
            createdOn
            personnelid
            personnelFirstName
            personnelLastName
            personnelFonction
            studentid
            studentFirstname
            studentLastname
        }
    }
`

//one cycle
export const GET_ONE_CYCLE =  gql `
    query findOnecycle ($id: String!) {
        findOnecycle (id: $id) {
            id
            name
        }
    }
`;

//recuperation d'une section
export const GET_ONE_SECTION = gql `
    query findOnesection ($id: String!) {
        findOnesection (id: $id) {
            id
            name
            description
        }
    }
`;

export const GET_LEVEL_BY_ID = gql`
    query findOneNiveauEtude ($id: String!) {
        findOneNiveauEtude (id: $id) {
            id
            name
            description
            montantPension
            cycleid
            cycleName
        }
    }
`

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
        lastConnection
        deactivatedAt
        personnelid
        studentid
    }
}
`;

//Tranche student by studentIf
// export const GET_TRANCHE_STUDENT_BY_STUDENT_ID = gql `
//     query getTrancheStudentByStudent ($studentid: String!) {
//         getTrancheStudentByStudent (studentid: $studentid) {
//             id
//             name
//             description
//             montant
//             complete
//             reste
//         }
//     }
// `;



//personnel by userid
export const GET_PERSONNEL_BY_USERID= gql `
query getpersonnelbyaccount ($userid: String!) {
    getpersonnelbyaccount (userid: $userid) {
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

export const GET_CLASS_FEES_BY_STUDENT_ID = gql `
    query getClassfeebyStudent ($studentid: String!) {
        getClassfeebyStudent (studentid: $studentid)
    }
`

//reste a payer a le penion totale de chque eleve
export const GET_RESTE_PENSION_A_PAYER_BY_STUDENT_ID = gql `
    query findrestpensionbystudent ($studentid: String!) {
        findrestpensionbystudent (studentid: $studentid)
    }
`

//reste a peyer des tranches pour chaque eleve
export const GET_RESTE_MONTANT_TRANCHE_BY_STUDENT_ID = gql `
query findByStudentRestTranche ($studentid: String!) {
    findByStudentRestTranche (studentid: $studentid) {
        studentid
        Nom
        Priority
        Rest
    }
}
`

 export const GET_ALL_MONTANT_PENSION_CLASS = gql`
    query findAllpension {
        findAllpension {
            id
            name
            description
            montantPension
            dateLine
        }
    }
 `;

 export const GET_ALL_COURSES = gql`
    query findAllCourse {
        findAllCourse {
            id
            title
            time
        }
    }
 `;
export const GET_ALL_PERSONNEL_SALLE = gql `
    query findAllPersonnelSalle {
        findAllPersonnelSalle {
            id
            personnelId
            personnelFirstName
            personnelLastName
            personnelFunction
            salleId
            salleName
            courseId
            courseName
        }
    }
`;

//recuperation de la pension fixe a une classe dans la table pension salle
export const GET_ALL_PENSION_SALLE_ENTITY = gql `
query findAllpensionSalle {
    findAllpensionSalle {
        id
        name
        description
        montantPension
        dateLine
        yearid
        yearName
        salleId
        salleName
    }
}`

export const GET_PRIME= gql `
    query findAllprime {
        findAllprime {
            id
            nom
            description
            montant
        }
    }
`;

export const GET_ALL_COURSE_PERSONNEL_SALLE = gql `
    query findbyCoursePersonnelSalle ($salleid: String!, $personnelid: String!, $courseid: String!) {
        findbyCoursePersonnelSalle (salleid: $salleid, personnelid: $personnelid, courseid: $courseid) {
            id
        }
    }
`;

export const GET_ALL_PARENT = gql `
query findAllparents {
    findAllparents {
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

//recuperation des infos de l'eleve a partir de tranche student
// export const GET_STUDENT_BY_TRANCHE_STUDENT = gql `
// query getTrancheStudentByStudent ($studentid: String!) {
//     getTrancheStudentByStudent (studentid: $studentid) {
//         id
//         name
//         description
//         montant
//         complete
//         reste
//         surplus
//     }
// }
// `; 

//recuperation de toutes informations des paiement des tranches dans tranche_student
// export const GET_ALL_TRANCHE_STUDENT


//recuperation de la classe deml'eleve\
export const GET_STUDENT_SALLE = gql `
    query findSalleByStudent ($studentid: String!) {
        findSalleByStudent (studentid: $studentid) {
            id
            name
            section
            montantPensionSalle
            effectif
            levelId
            levelName
        }
    }
`

// recuperation du dernier paiement effectue

export const GET_LAST_PAYMENT = gql `
    query AmountRecentAvanceTrancheByStudent ($studentid: String!) {
        AmountRecentAvanceTrancheByStudent (studentid: $studentid)
    }
`;

export const GET_AVANCE_MONTANT_TRANCHE_BY_STUDENT = gql  `
    query SumAvanceTrancheByStudent ($studentid: String!, $trancheid: String!) {
        SumAvanceTrancheByStudent (studentid: $studentid, trancheid: $trancheid)
    }
`

//RECUPERATION DE LA DATE LIMITE DE PAIEMENT PAR TRANCHE POUR CHQUE ELEVE
export const GET_DATELINE_TRANCHE_BY_STUDENT = gql `
query getTrancheDateLineByStudent ($studentid: String!, $trancheid: String!) {
    getTrancheDateLineByStudent (studentid: $studentid, trancheid: $trancheid)
}
`;

export const GET_ALL_MONTANT_TRANCHE_BY_STUDENT = gql `
    query AmountrExpectedByTranche ($studentid: String!) {
        AmountrExpectedByTranche (studentid: $studentid)    
    }
`;
export const GET_ALL_SALAIRE_BY_ID = gql `
query getsalairebypersonnel ($personnelid: String!) {
    getsalairebypersonnel (personnelid: $personnelid) {
        id
        jourPaie
        moisPaie
        montant
    }
}
`
export const GET_ALL_PAYSALAIRE_BY_ID = gql `
query getpaysalairebypersonnel ($personnelid: String!) {
    getpaysalairebypersonnel (personnelid: $personnelid) {
        id
        moisPaie
        montant
        personnelid
    }
}
`

// export const GET_ALL_TRANCHE_DATE_LINE_BY_STUDENT = gql `
//     query TrancheDateLine ($studentid: String!) {
//         TrancheDateLine (studentid: $studentid)
//     }
// `

export const GET_ALL_TRANCHE_COMPLETE_BY_STUDENT = gql `
    query getalltranchecompletedbystudent ($studentid: String!) {
        getalltranchecompletedbystudent (studentid: $studentid) {
            id
            name
            description
            dateLine
            montant
        }
    }
`;

export const GET_ALL_TRANCHE_BY_STUDENT_ID = gql `
    query getClassfeeofStudent ($studentid: String!) {
        getClassfeeofStudent (studentid: $studentid) {
            id
            name
            description
            dateLine
            montant
            priority
        }
    }
`;

export const GET_PENSION_ALREADY_PAY_BY_STUDENT_ID = gql `
    query findpensionbystudent ($studentid: String!) {
        findpensionbystudent (studentid: $studentid) {
            id
            name
            description
            montantPension
            complete
            reste
            surplus
            dateLine
        }
    }
`;

export const GET_ALL_RETENUE = gql `
    query findAllretenusalarial {
        findAllretenusalarial {
            id
            nom
            description
            montant
        }
    }`
    


export const GET_ALL_MONTH_SALARY = gql `
query PersonnelMonthSalary ($personnelid: String!) {
    PersonnelMonthSalary (personnelid: $personnelid)
}
`;

export const GET_SALARY_NET = gql `
query PersonnelNetSalary ($personnelid: String!) {
    PersonnelNetSalary (personnelid: $personnelid)
}
`;

//NOMS DE TOUTES LES PRIMES ATTRIBUES A UN PERSONNEL
export const GET_ALL_NAME_PRIME_PERSONNEL = gql `
query findnamesprimebypersonnel ($personnelid: String!) {
    findnamesprimebypersonnel (personnelid: $personnelid)
}
`;
//MONTANT DE TOUTES LES PRIMES ATTRIBUES A UN PERSONNEL
export const GET_ALL_AMOUNT_PRIME_PERSONNEL = gql `
query findmontantprimebypersonnel ($personnelid: String!) {
    findmontantprimebypersonnel (personnelid: $personnelid)
}
`;
//MONTANT TOTAL DE TOUTES LES PRIMES ATTRIBUES A UN PERSONNEL
export const GET_SUM_AMOUNT_PRIME_PERSONNEL = gql `
query getallpersonnelprimebymont ($personnelid: String!, $month: String!) {
    getallpersonnelprimebymont (personnelid: $personnelid, month: $month)
}
`;

//NOMS DE TOUTES LES RETENUES ATTRIBUES A UN PERSONNEL
export const GET_ALL_NAME_RETENU_PERSONNEL = gql `
query findnamesretenubypersonnel ($personnelid: String!) {
    findnamesretenubypersonnel (personnelid: $personnelid)
}
`;
//MONTANT DE TOUTES LES RETENUES ATTRIBUES A UN PERSONNEL
export const GET_ALL_AMOUNT_RETENU_PERSONNEL = gql `
query findmontantretenubypersonnel ($personnelid: String!) {
    findmontantretenubypersonnel (personnelid: $personnelid)
}
`;
//MONTANT TOTAL DE TOUTES LES RETENUES ATTRIBUES A UN PERSONNEL
export const GET_SUM_AMOUNT_RETENU_PERSONNEL = gql `
query getallretenupersonnelbymonth ($personnelid: String!, $month: String!) {
    getallretenupersonnelbymonth (personnelid: $personnelid, month: $month)
}
`;
//noms et montant des primes d'un personnel
export const GET_PRIME_PERSONNEL = gql `
query primesETnomprimepersonnel ($personnelid: String!) {
    primesETnomprimepersonnel (personnelid: $personnelid)
}
`;
//noms et montant des retenue d'un personnel
export const GET_RETENUE_PERSONNEL = gql `
query getRetenuEtNom ($personnelid: String!) {
    getRetenuEtNom (personnelid: $personnelid)
}
`;

export const FIND_ALL_SALAIRE = gql `
query findallsalaire {
    findallsalaire {
        id
        jourPaie
        moisPaie
        payer
        montant
        personnelid
        personnelFirstName
        personnelLastName
        personnelFonction
    }
}
`;
export const FIND_BY_ID_SALAIRE = gql `
query getonesalaire ($id: String!) {
    getonesalaire (id: $id) {
        id
        jourPaie
        moisPaie
        payer
        montant
        personnelid
        personnelFirstName
        personnelLastName
        personnelFonction
    }
}
`;

export const FIND_ID_PRIME = gql `
query findIdPrimesByPrimesPersonnel ($personnelid: String!, $month: String!) {
    findIdPrimesByPrimesPersonnel (personnelid: $personnelid, month: $month)
}
`;