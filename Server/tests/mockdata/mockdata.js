const mock = {
    signup: {
        firstName: 'eric',
        lastName: 'skemc',
        email: 'eric@gmail.com',
        password: 'Rwanda123',
        userName: 'skemc-eric',
        phoneNumber: '0785824928'

    },

    signin: {
        email: 'eric@gmail.com',
        password: 'Rwanda123'
    },

    invalidSigninEmail: {
        email: 'kapo@gmail.com',
        password: 'Rwanda123'
    },
    
    invalidSigninPassword: {
        email: 'eric6@gmail.com',
        password: 'Kareke123'
    },
     
    report: {
        title: 'hhhh',
        type: 'red-flag',
        comment: 'jgdhjhfhhh',
        locationLat: '400',
        locationLong: '500'
    },
    editComment: {
        comment: " killed a person"
    },

    editLocation: {
        locationLat: '08923',
        locationLong: '0894'
    },
    
    rightToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlcmljQGdtYWlsLmNvbSIsImlhdCI6MTU3NTQ3Nzc1NH0.G45MxUpTTtg1RITXq0-VUlPnYYeiLkZh5HlOlw06fDU'
    },

    wrongToken: {
        token: 'OiJIUzI1NiIsInR5jjjjkcCI6Iksknsvpjalf94flvavavnavgaUJMwJhXOl7wFeLSCb_RLitkg'
    },

    invalidToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkbm5ka2FAZ21haWwuY29tIiwiaWF0IjoxNTc0Nzc3NDI3fQ.EQmvtlvfuMswDpHVGWbJ6q64qai7LACeppbcJNLumZ4'
    }
};

export default mock;