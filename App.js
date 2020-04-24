import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, TouchableOpacity, Clipboard, ToastAndroid, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import delegator from './src/delegator'

export default function App() {
  const [isSearching, setIsSearching] = useState(false)
  const [input, setInput] = useState('')
  const [torrents, setTorrents] = useState([])
 

  function getTorrents() {
    if (!input && !input.trim()) {
      return
    }

    setIsSearching(true)

    delegator.extractTorrents(input).then((data) => {
      console.log(data)
      setTorrents(data.urls)
      setIsSearching(false)
    })
    .catch((error) => { 
      setIsSearching(false)
      ToastAndroid.show(error, 5)
    })
  }

  async function copyToClipboard(link) {
    await Clipboard.setString(link);
    ToastAndroid.show('Copied to Clipboard!', 5)
  }

  return (
    <View style={styles.container}>
      <View style={styles.formInput}>
        <TextInput
          style={styles.torrentInput}
          placeholder="Digite o nome do torrent..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={getTorrents} style={styles.searchButton}>
          {isSearching? <ActivityIndicator styles={styles.loading} size="large" color="#0000ff" /> : 
          <Feather name="search" size={28} color="#000" />}
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.torrentList}
        data={torrents}
        keyExtractor={(torrent, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: torrent }) => (
          <TouchableOpacity style={styles.torrent} onPress={() => copyToClipboard(torrent.uri)}>
            <Text style={styles.torrentName} numberOfLines ={1}>{torrent.name}</Text>
            <Feather name="copy" size={28} color="#000" />
          </TouchableOpacity>
        )}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  formInput: {
    flexDirection: 'row',
    top: 40,
    marginHorizontal: 10
  },
  torrentInput: {
    flex: 1,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    paddingHorizontal: 10
  },
  searchButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginLeft: 15
  },
  torrentList: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20
  },
  torrent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  torrentName: {
    flex: 1
  }
});
