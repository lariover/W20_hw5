

const storage = {
    customers: [ {
        id: 1,
        name: 'Jan Novak',
        dateOfBirth: '1.1.1990',
        address: 'Prague'

    },
        {
            id: 2,
            name: 'Martin Zajic',
            dateOfBirth: '1.1.1990',
            address: 'Prague'

        },
        {
            id: 3,
            name: 'Roman Vesely',
            dateOfBirth: '1.1.1986',
            address: 'Prague'

        },
        {
            id: 4,
            name: 'Michal Rath',
            dateOfBirth: '1.1.1991',
            address: 'Prague'

        },
        {
            id: 5,
            name: 'Jan David',
            dateOfBirth: '1.1.1985',
            address: 'Prague'

        }
        ]

};
 let customerID = 6;

 module.exports = {storage,customerID};