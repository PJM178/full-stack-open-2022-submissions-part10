import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  consturctor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accesstoken`,
    );

    return accessToken ? JSON.parse(accessToken) : [];
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accesstoken`,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accesstoken`);
  }
}

export default AuthStorage;