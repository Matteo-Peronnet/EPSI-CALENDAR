import {AsyncStorage} from 'react-native';

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        return null;
    }
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
    }
};
