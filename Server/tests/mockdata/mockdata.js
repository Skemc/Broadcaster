const mock = {
    signup: {
        firstName: 'Eric',
        lastName: 'skemc',
        email: 'eric@gmail.com',
        password: 'Rwanda123',
        userName: 'skemc-eric',
        phoneNumber: '0785824928'

    },

    signin: {
        email: 'eric8@gmail.com',
        password: 'Rwanda000'
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
        comment: 'jgdhjhf',
        locationLat: '400',
        locationLong: '500'
    },

    rightToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlcmljNkBnbWFpbC5jb20iLCJpYXQiOjE1NzQ3NzQ5MjN9.u_2_Ilq-wmFFslfQkOtbDuVFbA76eZ9eVwF0b-Ivp2c'
    },

    wrongToken: {
        token: 'OiJIUzI1NiIsInR5jjjjkcCI6Iksknsvpjalf94flvavavnavgaUJMwJhXOl7wFeLSCb_RLitkg'
    },

    invalidToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkbm5ka2FAZ21haWwuY29tIiwiaWF0IjoxNTc0Nzc3NDI3fQ.EQmvtlvfuMswDpHVGWbJ6q64qai7LACeppbcJNLumZ4'
    }
};

export default mock;