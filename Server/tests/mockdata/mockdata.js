const mock = {
    signup: {
        firstName: 'Eric',
        lastName: 'skemc',
        email: 'eric6@gmail.com',
        password: 'Rwanda123',
        userName: 'skemc-eric',
        phoneNumber: '0785824928'

    },

    signin: {
        email: 'eric6@gmail.com',
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
        comment: 'jgdhjhf',
        locationLat: '400',
        locationLong: '500'
    },

    rightToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlcmljQGdtYWlsLmNvbSIsImlhdCI6MTU3NDI2NjYyN30.U5h0_Knk_Pu72JfuIeEtDFBPNmydDAM-TyfSEI_dUTY'
    },

    wrongToken: {
        token: 'OiJIUzI1NiIsInR5jjjjkcCI6Iksknsvpjalf94flvavavnavgaUJMwJhXOl7wFeLSCb_RLitkg'
    },

    invalidToken: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwYXBhQGdtYWlsLmNvbSIsImlhdCI6MTU3NDI2ODA4NH0.jIxrCzf8yPd6sXhhrjFoqei_10JeWd9h5Ocrfv6jvwQ'
    }
};

export default mock;