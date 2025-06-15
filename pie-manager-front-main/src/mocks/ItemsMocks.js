export default class ItemsMocks {
    static build() {
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sydney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: '4',
                name: 'Jane Smith',
                age: 27,
                address: 'Chicago No. 2 River View',
                tags: ['creative', 'designer'],
            },
            {
                key: '5',
                name: 'Robert Johnson',
                age: 45,
                address: 'Los Angeles No. 8 Beach Road',
                tags: ['manager', 'strict'],
            },
            {
                key: '6',
                name: 'Emily Davis',
                age: 31,
                address: 'Boston No. 12 Harbor Street',
                tags: ['friendly', 'developer'],
            },
            {
                key: '7',
                name: 'Michael Wilson',
                age: 38,
                address: 'Seattle No. 5 Rain Avenue',
                tags: ['cool', 'architect'],
            },
            {
                key: '8',
                name: 'Sarah Martinez',
                age: 29,
                address: 'Miami No. 3 Palm Drive',
                tags: ['smart'],
            },
            {
                key: '9',
                name: 'David Thompson',
                age: 52,
                address: 'Austin No. 7 Music Lane',
                tags: ['veteran', 'loser'],
            },
            {
                key: '10',
                name: 'Jennifer Garcia',
                age: 33,
                address: 'Portland No. 4 Forest Park',
                tags: ['nice', 'organized'],
            },
            {
                key: '11',
                name: 'Thomas Rodriguez',
                age: 41,
                address: 'Denver No. 9 Mountain View',
                tags: ['outdoorsy', 'teacher'],
            },
            {
                key: '12',
                name: 'Lisa Lee',
                age: 26,
                address: 'San Francisco No. 11 Tech Way',
                tags: ['ambitious', 'developer'],
            },
            {
                key: '13',
                name: 'Daniel Clark',
                age: 36,
                address: 'Atlanta No. 6 Peachtree Street',
                tags: ['reliable'],
            },
            {
                key: '14',
                name: 'Jessica Wright',
                age: 39,
                address: 'Nashville No. 15 Country Road',
                tags: ['creative', 'musician'],
            },
            {
                key: '15',
                name: 'Matthew Allen',
                age: 44,
                address: 'New Orleans No. 10 Jazz Street',
                tags: ['cool', 'chef'],
            },
            {
                key: '16',
                name: 'Amanda Scott',
                age: 28,
                address: 'Dallas No. 14 Star Boulevard',
                tags: ['energetic', 'sales'],
            },
            {
                key: '17',
                name: 'Christopher Adams',
                age: 50,
                address: 'Philadelphia No. 17 Liberty Avenue',
                tags: ['historic', 'professor'],
            },
            {
                key: '18',
                name: 'Stephanie Baker',
                age: 32,
                address: 'Las Vegas No. 21 Casino Drive',
                tags: ['adventurous', 'loser'],
            },
            {
                key: '19',
                name: 'Joshua Nelson',
                age: 35,
                address: 'Phoenix No. 19 Desert Road',
                tags: ['tough', 'developer'],
            },
            {
                key: '20',
                name: 'Nicole Carter',
                age: 30,
                address: 'Minneapolis No. 16 Lake Street',
                tags: ['nice', 'analyst'],
            },
            {
                key: '21',
                name: 'Andrew Mitchell',
                age: 47,
                address: 'San Diego No. 22 Ocean Drive',
                tags: ['relaxed', 'surfer'],
            },
            {
                key: '22',
                name: 'Rebecca Turner',
                age: 34,
                address: 'Houston No. 18 Space Center Blvd',
                tags: ['smart', 'scientist'],
            },
            {
                key: '23',
                name: 'Kevin Phillips',
                age: 43,
                address: 'Detroit No. 20 Motor Street',
                tags: ['hardworking', 'engineer'],
            }
        ];

        const items = {data : data, nextId: 24, length: 23};
        
        localStorage.setItem('items', JSON.stringify(items));
    }
}