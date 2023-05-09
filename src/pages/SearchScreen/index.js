import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import api from '../../services/api';
import ListSection from '../../components/ListSection';
import {useInfiniteQuery, useQuery} from 'react-query';
import EmpyShow from '../../components/EmpyShow';
export default function SearchScreen({navigation}) {
  const [repositorySearch, setRepositorySearch] = useState('');
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [responseRepos, setResponseRepos] = useState([]);
  const [countResponseRepos, setCountResponseRepos] = useState('');
  const [pageResponseRepos, setPageResponseRepos] = useState(0);
  const [pageNum, setpageNum] = useState(1);
  // const LIMIT_PAGE = 100;
  const reposResponse = useInfiniteQuery(
    ['repos'],
    ({pageParam = 100}) => fetchRepos(repositorySearch, pageNum, pageParam),
    {
      refetchOnWindowFocus: false,
    },
  );
  console.log(
    '🚀 ~ file: index.js:35 ~ SearchScreen ~ reposResponse:',
    reposResponse?.data?.pages,
  );
  async function fetchRepos(repositorySearch, pageNum, pageParam) {
    const response = await api.get(
      `repositories?q=${repositorySearch}&sort=help-wanted-issues&order=desc&page=${pageNum}&per_page=${pageParam}`,
      {
        Accept: 'application/vnd.github.v3+json',
      },
    );
    console.log(
      '🚀 ~ file: index.js:43 ~ fetchRepos ~ response:',
      response.data,
    );
    return response.data;
  }

  async function handleSearch(type) {
    if (repositorySearch === '' || repositorySearch === undefined) {
      return;
    }

    if (loadingRepos) {
      return;
    }

    let pageNumber = 1;

    switch (type) {
      case 'HANDLE_FORM':
        setResponseRepos([]);
        setCountResponseRepos('');
        setPageResponseRepos(pageNumber);
        setpageNum(pageNumber);
        break;

      case 'HANDLE_PAGE':
        if (responseRepos.length === countResponseRepos) {
          return;
        }

        pageNumber = pageResponseRepos + 1;
        break;
    }

    setPageResponseRepos(pageNumber);
    setpageNum(pageNumber);

    // setLoadingRepos(true);
    reposResponse.refetch();
    // const response = await api.get(
    //   `repositories?q=${repositorySearch}&sort=help-wanted-issues&order=desc&page=${pageNumber}&per_page=${LIMIT_PAGE}`,
    //   {
    //     Accept: 'application/vnd.github.v3+json',
    //   },
    // );
    // console.log('RESPONSEEEE::::::::::::::::::::::', response.data);
    if (reposResponse?.data?.pages[0]) {
      const {total_count, items} = reposResponse?.data?.pages[0];

      // setLoadingRepos(false);

      switch (type) {
        case 'HANDLE_FORM':
          setResponseRepos(items);
          break;

        case 'HANDLE_PAGE':
          setResponseRepos([...responseRepos, ...items]);
          break;
      }

      setCountResponseRepos(total_count);
    }
  }

  const Repos = ({item, index}) => {
    return <ListSection item={item} index={index} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSec}>
        <TextInput
          style={styles.searchInput}
          onChangeText={e => setRepositorySearch(e)}
          value={repositorySearch}
          placeholder="Enter repo name"
          underlineColorAndroid={'transparent'}
          onSubmitEditing={async () => await handleSearch('HANDLE_FORM')}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={async () => await handleSearch('HANDLE_FORM')}>
          <Text style={styles.searchText}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listSec}>
        {reposResponse.isLoading ? (
          <ActivityIndicator color={'#1a8f89'} size={'large'} />
        ) : (
          <FlatList
            data={responseRepos}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={Repos}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={<EmpyShow />}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  searchSec: {
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: 'Montserrat-Regular',
  },
  listSec: {
    backgroundColor: '#c5f0ee',
    height: '90%',
    width: '100%',
  },
  searchInput: {
    backgroundColor: '#E5E4E2',
    height: 40,
    width: '60%',
    borderRadius: 8,
  },
  searchBtn: {
    backgroundColor: '#27A313',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    width: '20%',
    borderRadius: 8,
  },
  searchText: {
    color: '#fff',
    fontWeight: '900',
  },
});
