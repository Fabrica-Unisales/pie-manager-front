export default class UserMocks{
    static build() {
        const users = [
            { username: 'admin@admin', password: 'admin' },
            { username: 'user2', password: 'password2' },
            { username: 'user3', password: 'password3' },
        ];

        localStorage.setItem('users', JSON.stringify(users));
    }
}