import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

export function useGUN() {
    const db = GUN()
    const user = db.user()

    return { db, user }
}