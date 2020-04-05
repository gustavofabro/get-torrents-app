import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import delegator from './src/delegator'

export default function App() {
  const [input, setInput] = useState('')
  const [torrents, setTorrents] = useState([{
    name: 'torrent1',
    url: 'magnet::'
  }, {
    name: 'torrent3',
    url: 'magnet::'
  }])
 

  function getTorrents() {
    delegator.extractTorrents(input).then((data) => {
      setTorrents(data)
    })
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
          <Feather name="search" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.torrentList}
        data={torrents}
        keyExtractor={torrent => String(torrent.name)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: torrent }) => (
          <View style={styles.torrent}>
            <Text color="#FFF">{torrent.name}</Text>
          </View>
        )}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'flex-start',
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
    paddingHorizontal: 10,
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
    marginTop: 60,
    paddingHorizontal: 30
  }
});
