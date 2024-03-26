export const SIGNUP_THANKYOU_MESSAGE =
    'Hey! Thank you for joining the Valadate community - let’s get started by setting up your account!'

export const LIVE_IN = 'I live in'

export const LOOKING_FOR = 'I’m looking for someone within'

export const formDefaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    state: '',
    zip: '',
    miles: '',
    birthDate: '1990-03-09',
    gender: '',
    lookingFor: '',
    interests: [],
    ageRange: [20, 65],
    habits: [],
    images: ['', '', '', '', ''],
}

export const USER_INTERESTS = [
    { id: 1, interestName: 'dancing' },
    { id: 2, interestName: 'cooking' },
    { id: 3, interestName: 'doing stuff outdoors' },
    { id: 4, interestName: 'politics' },
    { id: 5, interestName: 'pets' },
    { id: 6, interestName: 'photography' },
    { id: 7, interestName: 'sports' },
    { id: 8, interestName: 'traveling' },
    { id: 9, interestName: 'reading' },
    { id: 10, interestName: 'painting' },
    { id: 11, interestName: 'music' },
    { id: 12, interestName: 'writing' },
    { id: 13, interestName: 'gardening' },
    { id: 14, interestName: 'watching movies' },
]

export const USER_PARTY = [
    { id: 1, partyHabitName: 'Socialite' },
    { id: 2, partyHabitName: 'Enthusiast' },
    { id: 3, partyHabitName: 'Reveler' },
    { id: 4, partyHabitName: 'Mingle' },
    { id: 5, partyHabitName: 'Boisterous' },
    { id: 6, partyHabitName: 'Spirited' },
    { id: 7, partyHabitName: 'Celebrator' },
    { id: 8, partyHabitName: 'Lively' },
    { id: 9, partyHabitName: 'Groove' },
    { id: 10, partyHabitName: ' Festive' },
]

export const formErrorKeys = {
    email: 1,
    firstName: 1,
    lastName: 1,
    password: 1,
    city: 2,
    state: 2,
    zip: 2,
    miles: 2,
    birthDate: 2,
    gender: 3,
    lookingFor: 4,
    interests: 5,
    ageRange: 6,
    habits: 6,
    userimageone: 7,
    userimagetwo: 7,
}
