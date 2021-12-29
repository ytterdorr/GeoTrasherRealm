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
    return realm.objects('session_details').filtered(`session_id = ${_id}`)[0];
}

const addItemToSession = async (sessionId, item) => {
    console.log("addItemToSession")
    let session = await getSessionById(sessionId)[0]
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        ses.items.push(item)
    })
}

const popLastItem = async (sessionId) => {
    console.log("todo: popLastItem")
    let session = await getSessionById(sessionId)[0]
    let lastItemName = {}
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        if (ses.items && ses.items.length > 0) {
            const lastItem = ses.items[ses.items.length - 1]
            lastItemName = { name: lastItem.name }
            realm.delete(lastItem)

            //ses.itemSum[lastItem.name].value-=1;
            //ses.itemCount-=1
        }
    })
    return lastItemName
}

const setSessionNameById = (_id, name) => {
    realm.write(() => {
        let session = getSessionById(_id);
        session.session_name = name
    })
}

const updateSessionById = (_id, sessionData) => {
    realm.write(() => {
        let session = getSessionById(_id);
    })
}

const updateItemSumsById = async (sessionId, itemSums) => {
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        ses.itemSum = itemSums;
    });
}

const updateItemSumsAndTotalById = async (sessionId, itemSums, totalCount) => {
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`)[0];
        ses.itemSum = itemSums;
        ses.itemCount = totalCount
    });
}


export {
    dbPath,
    getSessionById,
    getAllSessions,
    deleteSessionById,
    setSessionNameById,
    addItemToSession,
    updateItemSumsById,
    updateItemSumsAndTotalById,
    popLastItem,
}

export default realm;