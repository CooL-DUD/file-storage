import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

export function useGUN() {
    const db = GUN({
        // peers: ['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun'],
        peers: ['http://localhost:8765/gun']
    });
    const user = db.user().recall({sessionStorage: true})

    return { db, user }
}