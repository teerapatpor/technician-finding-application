import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import Header from '../../components/Header';
import MessageList from '../../components/Message/MessageList';

import {content} from '../../stylesheet';
import {connect} from 'react-redux';

import {
  ENTER_PRIVATE_CHAT,
  ENTER_PRIVATE_CHAT_BY_ID,
  INITIAL_HISTORY_LIST,
  SET_INTERLOCUTOR_ID,
  unMountMessageScreen,
} from '../../store/actions/chatAction';
import {LOADED} from '../../store/actions/authAction';
import NotFoundComponent from '../../components/NotFoundComponent';
import MessageLists from '../../components/Message/MessageLists';
import MessageListsContentLoader from '../../components/Message/MessageListsContentLoader';
import {socket} from '../../store/actions/socketAction';

const mapStateToProps = (state) => ({
  uid: state.auth.userInfo.uid,
  chat_history: state.chat.lists,
});

const connector = connect(mapStateToProps, {
  unMountMessageScreen,
  SET_INTERLOCUTOR_ID,
  ENTER_PRIVATE_CHAT_BY_ID,
  ENTER_PRIVATE_CHAT,
  INITIAL_HISTORY_LIST,
  LOADED,
});

const Message = (props) => {
  // React.useEffect( () => {
  //     props.INITIAL_HISTORY_LIST(props.uid).then( () => {
  //         props.LOADED()
  //     }).catch(err => {

  //     })
  // },[])

  const [isLoading, setIsLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      socket.on('receive_message', ({message}) => {
        // console.log(message);
        props
          .INITIAL_HISTORY_LIST(props.uid)
          .then((list) => {
            props.LOADED();
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      });
      props
        .INITIAL_HISTORY_LIST(props.uid)
        .then((list) => {
          props.LOADED();
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, []),
  );

  React.useEffect(() => {
    return () => {
      props.unMountMessageScreen();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={content.topsafearray} />
      <SafeAreaView style={content.safearray}>
        <Header
          page="กล่องข้อความ"
          navigation={props.navigation}
          back={true}
          chat={true}
          isRadius={true}
        />
        <ScrollView style={content.container}>
          {isLoading ? (
            <>
              <MessageListsContentLoader />
              <MessageListsContentLoader />
              <MessageListsContentLoader />
              <MessageListsContentLoader />
              <MessageListsContentLoader />
            </>
          ) : props.chat_history.length !== 0 ? (
            <MessageLists />
          ) : (
            <NotFoundComponent label="ไม่พบประวัติการแชท" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default connector(Message);
