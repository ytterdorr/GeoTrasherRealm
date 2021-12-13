import Realm from 'realm';

const dbPath = 'GeoTrasherData.realm';

itemSchema = {
    name: 'item_details',
    properties: {
        name: 'string',
        location: '{}?'
    }
}

sessionSchema = {
    name: 'session_details',
    properties: {
        session_id: { type: 'int', default: 0 },
        session_name: 'string',
        items: { type: 'list', objectType: 'item_details' },
        itemCount: 'int?',
        itemSum: "{}?"
    }
}

let realm = new Realm({
    path: 'GeoTrasherData.realm',
    schema: [sessionSchema, itemSchema],
    schemaVersion: 4
});

const getAllSessions = () => {
    return realm.objects('session_details');
}

const deleteAllSessions = () => {
    realm.write(() => {
        realm.delete(getAllSessions());
    })
}

const deleteSessionById = (_id) => {
    realm.write(() => {
        realm.delete(getSessionById(_id))
    })
}

const getSessionById = (_id) => {
    return realm.objects('session_details').filtered(`session_id = ${_id}`);
}

const addItemToSession = async (sessionId, item) => {
    console.log("addItemToSession")
    let session = await getSessionById(sessionId)[0]
    console.log("session: ", session)
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        ses.items.push(item)
    })
}

const updateSessionById = (_id, sessionData) => {
    realm.write(() => {
        let session = getSessionById(_id);
    })
}

const updateItemSumsById = async (sessionId, sessionSum) => {
    const session = await getSessionById(sessionId)[0]
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        ses.itemSum = sessionSum;
    });
}


export {
    dbPath,
    getAllSessions,
    deleteSessionById,
    addItemToSession,
    updateItemSumsById
}

export default realm;