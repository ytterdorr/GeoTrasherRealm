import Realm from 'realm';

const dbPath = 'GeoTrasherData.realm';

const itemSchema = {
    name: 'item_details',
    properties: {
        name: 'string',
        location: '{}?'
    }
}

const itemTypeSchema = {
    name: 'item_type',
    properties: {
        name: 'string',
        iconName: 'string?'
    }
}

const userSettingsSchema = {
    name: 'user_settings',
    properties: {
        userName: 'string?',
        activeSession: { type: 'bool', default: false },
        items: { type: 'list', objectType: 'item_type' }, // Item list used by user
        sessionView: 'string?',  // name of session preferred by user
        multiClickTimer: 'int', // How long the timer wats for next click
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


/// Realm object
let realm = new Realm({
    path: 'GeoTrasherData.realm',
    schema: [sessionSchema, itemSchema, itemTypeSchema, userSettingsSchema],
    schemaVersion: 7
});

const defaultItems = [
    { name: 'nicotine', iconName: 'nicotine' },
    { name: 'plastic', iconName: 'plastic' },
    { name: 'paper', iconName: 'paper' },
    { name: 'food', iconName: 'food' },
    { name: 'metal', iconName: 'metal' },
    { name: 'glass', iconName: 'glass' },
    { name: 'other', iconName: 'other' },
]

const defaultUserSettings = {
    userName: 'Anonymous User',
    activeSession: false,
    items: defaultItems,
    sessionView: 'SessionButtonTop',
    multiClickTimer: 600,
}

// Getters
const getAllSessions = () => {
    return realm.objects('session_details');
}

const getSessionById = (_id) => {
    return realm.objects('session_details').filtered(`session_id = ${_id}`)[0];
}

const getUserSettings = () => {
    let settings = realm.objects('user_settings');
    console.log("userSettings", settings)
    if (settings.length) {
        return settings[0]
    }
    else { // user settings never set, this is the first time app is used. 
        setDefaultUserSettings()
        return defaultUserSettings
    }
}

const getLatestSession = () => {
    const sessions = realm.objects('session_details')
    console.log("Sessions length", sessions.length)
    if (sessions.length) {
        return realm.objects('session_details')[sessions.length - 1]

    }
}

// returns a boolean
const getActiveSession = () => {
    const settings = getUserSettings()
    return settings.activeSession;
}


// Set / Update /add

const setDefaultUserSettings = () => {
    realm.write(() => {
        let userSettings = realm.objects('user_settings')
        if (userSettings.length) {
            settings = realm.objects[0]
        } else { // If no user settings set before
            realm.create('user_settings', defaultUserSettings)
        }
    })
}

const setActiveSession = (active) => {
    // active: bool

    let settings = getUserSettings()
    realm.write(() => {
        settings.activeSession = active;
    })
}

const setSessionNameById = (_id, name) => {
    realm.write(() => {
        let session = getSessionById(_id);
        session.session_name = name
    })
}

const addItemToSession = async (sessionId, item) => {
    console.log("addItemToSession")
    let session = await getSessionById(sessionId)
    realm.write(() => {
        let ses = getSessionById(sessionId);
        console.log(ses)
        ses.items.push(item)
    })
}

const updateItemSumsById = async (sessionId, itemSums) => {
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`);
        ses.itemSum = itemSums;
    });
}

const updateItemSumsAndTotalById = async (sessionId, itemSums, totalCount) => {
    realm.write(() => {
        let ses = realm.objects('session_details').filtered(`session_id = ${sessionId}`);
        ses.itemSum = itemSums;
        ses.itemCount = totalCount
    });
}


// Delete
const deleteSessionById = (_id) => {
    realm.write(() => {
        realm.delete(getSessionById(_id))
    })
}

const deleteAllSessions = () => {
    const sessions = realm.objects('session_details');
    console.log("sessions", sessions)
    sessions.forEach(session => {
        console.log("session", session)
        deleteSessionById(session.session_id)
    })
}


const popLastItem = async (sessionId) => {
    console.log("todo: popLastItem")
    let session = await getSessionById(sessionId)
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




export {
    dbPath,
    getSessionById,
    getAllSessions,
    getUserSettings,
    getActiveSession,
    getLatestSession,

    setActiveSession,
    setSessionNameById,
    addItemToSession,
    updateItemSumsById,
    updateItemSumsAndTotalById,
    popLastItem,
    deleteSessionById,
    deleteAllSessions,
}

export default realm;