import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
export default function ListSection({item, index, navigation}) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.profileSec}>
        <Text>{index + 1}</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.owner.avatar_url,
          }}
        />
      </View>
      <View style={styles.nameSec}>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.owner.login}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {
              urlDetail: item?.html_url,
            })
          }>
          <Icon name="rightcircle" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    height: 55,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#1a8f89',
    borderBottomWidth: 0.9,
  },
  profileSec: {
    width: '30%',
    height: 55,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nameSec: {
    width: '70%',
    height: 55,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tinyLogo: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
});
