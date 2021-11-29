
export const itemSchema = {
    name: 'item_details',
    properties: {
        name: 'string'
    }
}

export const sessionSchema = {
    name: 'session_details',
    properties: {
        session_id: { type: 'int', default: 0 },
        session_name: 'string',
        items: { type: 'list', objectType: 'item_details' }
    }
}

// Is this how to handle updated shchemas?
// https://stackoverflow.com/questions/42868522/react-native-realm-migration
// export default new Realm({
//     schema: [sessionSchema],
//     schemaVersion: 1,
//     migration: (oldRealm, newRealm) => {
//         // Do something?
//     }
// })
