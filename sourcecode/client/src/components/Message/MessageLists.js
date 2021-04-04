import React from 'react';

import {SafeAreaView, ScrollView} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import Header from '../Header';
import MessageList from './MessageList';

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
import {useNavigation} from '@react-navigation/native';

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
  const {navigate} = useNavigation();

  // useFocusEffect(
  //     React.useCallback(() => {
  //         props.INITIAL_HISTORY_LIST(props.uid)
  //             .then((list) => {
  //                 props.LOADED()
  //             }).catch(err => {
  //                 console.log(err);
  //             })
  //     }, [])
  // )

  // React.useEffect(() => {
  //     return () => {
  //         props.unMountMessageScreen()
  //     }
  // }, [])

  return (
    <>
      {props.chat_history.map((item, index) => {
        return (
          <MessageList
            key={index}
            name={
              item.technicianID !== props.uid
                ? item.technicianName
                : item.userName
            }
            firstname={
              item.recentMessage.sender === props.uid
                ? 'คุณ'
                : item.technicianID !== props.uid
                ? item.userFirstname
                : item.technicianFirstname
            }
            avatar={
              item.technicianID !== props.uid
                ? item.technicianAvatar
                : item.userAvatar
            }
            lastMessage={item.recentMessage.message}
            status={
              item.technicianID === props.uid
                ? item.technicianReadStatus
                : item.userReadStatus
            }
            badges={0}
            date={item.recentMessage.date}
            msgType={item.recentMessage.msgType}
            onPress={() => {
              props.ENTER_PRIVATE_CHAT_BY_ID(item._id).then(() => {
                navigate('chat');
                props.LOADED();
              });
            }}
          />
        );
      })}
    </>
  );
};

export default connector(Message);
