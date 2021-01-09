const admin = require('firebase-admin');

const serviceAccount = require('./key.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports=  {
    firestore: firestore,
    entries: {
        async addEntry(name, content) {
            const res = await firestore.collection('entries').doc(name).set({ content: content })
            return res
        },
        async getEntry(name) {
            const doc = firestore.collection('entries').doc(name);
            const res = await doc.get();
            return res.data();
        },
        async getAllEntries() {
            const doc = firestore.collection('entries');
            const res = await doc.get();
            const data = []
            res.forEach(snapshot => {
                data.push(snapshot.get())
            })
            return data
        },
        async updateEntry(name, content) {
            const doc = firestore.collection('entries').doc(name);
            const res = await doc.set({ value: content }, { merge: true })
            return res
        },
        async removeEntry(name) {
            const res = await firestore.collection('entries').doc(name).delete();
            return res
        },
        async addLink(id, entry) {
            const res = await firestore.collection('selfEntries').doc(id).set({ entry: entry })
            return res
        },
        async getLink(id) {
            const doc = firestore.collection('selfEntries').doc(id);
            const res = await doc.get();
            return res.data();
        },
        async removeLink(id) {
            const res = await firestore.collection('selfEntries').doc(id).delete();
            return res
        }
    },
    blacklist: {
        async addBlacklist(id) {
            const res = await firestore.collection('blacklists').doc(id).set({ blacklist: true })
            return res
        },
        async removeBlacklist(id) {
            const res = await firestore.collection('blacklists').doc(id).set({ blacklist: false })
            return res
        },
        async checkBlacklist(id) {
            const doc = firestore.collection('blacklists').doc(id);
            const res = await doc.get();
            const data = res.data();
            if (!res || !data || data.blacklist === false ) {
                return false
            } else {
                return data.blacklist || true
            }
        }
    }
}