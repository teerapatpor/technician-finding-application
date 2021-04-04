import React, { useState, useRef } from 'react';

import {
  Text,
  SafeAreaView,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
  Easing,
  Image
} from 'react-native';
import MyButton from '../../components/MyButton';
import Footer from '../../components/Login/Footer';
import { color, content, widthToDp } from '../../stylesheet';
import { inputStyles } from '../../components/MyTextInput';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { login, logout, checkToken, loginWithFacebook } from '../../store/actions/authAction';
import { connection } from '../../store/actions/socketAction';
import { clear as regClear } from '../../store/actions/regAction';

import { useFocusEffect } from '@react-navigation/native'

const mapStateToProps = (state) => ({});

const connector = connect(mapStateToProps, {
  login,
  logout,
  connection,
  checkToken,
  loginWithFacebook,
  regClear
});

const Login = (props) => {
  const uname_ref = useRef();
  const pwss_ref = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    props.login(username, password).then((res) => {
      if (res.status) {
        props.checkToken();
      } else {
        props.logout();
        errorPopUp()
      }
    });
  };

  const handleFacebookdLogin = () => {
    props.loginWithFacebook().then(res => {
      // console.log(res);
      if (res.status) {
        props.checkToken();
      } else {
        // props.logout();
        props.navigation.navigate('reg_name')
      }
    })
  };

  const [opacity, setOpacity] = useState(new Animated.Value(1))

  const translateY = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, parseInt(widthToDp('20'))]
  })

  const snackPopDown = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const snackPopUp = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const errorPopUp = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start()
  }

  useFocusEffect(
    React.useCallback(() => {
      props.regClear()
    }, [])
  )

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '10%',
          backgroundColor: '#fff'
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Image
            source={require('../../assets/image/logoLogin.png')}
            style={{
              width: widthToDp('25'),
              height: widthToDp('25'),
              backgroundColor: color.BLUE_4,
              borderRadius: widthToDp('12.5'),
              marginRight: 10,
            }}
            resizeMode='cover'

          />
        </View>
        <View style={[inputStyles.container]}>
          <TextInput
            style={[inputStyles.textInput]}
            placeholder="ชื่อผู้ใช้"
            placeholderTextColor={color.BLUE_2}
            blurOnSubmit={false}
            ref={uname_ref}
            onSubmitEditing={() => {
              pwss_ref.current.focus();
            }}
            value={username}
            onChangeText={(val) => setUsername(val)}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
          />
        </View>
        <View style={[inputStyles.container]}>
          <TextInput
            style={[inputStyles.textInput]}
            placeholder="รหัสผ่าน"
            placeholderTextColor={color.BLUE_2}
            blurOnSubmit={false}
            ref={pwss_ref}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              // props.login(username, password)
              handleLogin();
            }}
            value={password}
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secure}
            autoCompleteType="off"
          />
          {
            <TouchableOpacity
              style={inputStyles.iconContainer}
              onPress={() => setSecure(!secure)}>
              <Feather
                name={secure ? 'eye' : 'eye-off'}
                style={[inputStyles.icon]}
              />
            </TouchableOpacity>
          }
        </View>
        <MyButton
          title="เข้าสู่ระบบ"
          onPress={() => {
            Keyboard.dismiss();
            handleLogin();
          }}
        />
        <View style={styles.btnContainer}>
          <View style={styles.header}>
            <View style={styles.line} />
            <Text style={styles.headerText}>เข้าสู่ระบบโดยวิธีอื่น</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleFacebookdLogin()
            }}
          >
            <Ionicons name="logo-facebook" style={styles.facebookIcon} />
          </TouchableOpacity>
        </View>
      </View>



      <Animated.View
        style={{
          // backgroundColor : 'red',
          width: '100%',
          height: widthToDp('16'),
          position: 'absolute',
          bottom: widthToDp('0'),
          paddingVertical: widthToDp('2'),
          paddingHorizontal: widthToDp('4'),
          zIndex: 3,
          backgroundColor: 'transparent',
          transform: [
            { translateY: translateY }
          ],
        }}
      >
        <View
          style={{
            backgroundColor: color.RED_4,
            flex: 1,
            borderRadius: widthToDp('4'),

          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: widthToDp('2'),
              paddingVertical: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: widthToDp('4'),
              }}
              onPress={() => props.navigation.navigate('acceptedRequest')}
            >
              <Text
                style={{
                  fontSize: widthToDp('4'),
                  color: color.RED_0,
                  fontWeight: 'bold'
                }}
              >
                ชื่อผู้ใช้ หรือ รหัสผ่านผิด
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: widthToDp('8'),
                aspectRatio: 1,
                backgroundColor: `#ffffff66`,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: widthToDp('3')
              }}
              onPress={() => {
                snackPopDown()
              }}
            >
              <Feather name='x' style={{
                fontSize: widthToDp('5'),
                color: color.IOS_RED_LIGHT
              }} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <Footer navigation={props.navigation} />
    </>
  );
};

export default connector(Login);

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: color.FACEBOOK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  facebookIcon: {
    marginTop: 5,
    marginRight: 5,
    fontSize: widthToDp('10'),
    color: color.FACEBOOK,
  },
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    justifyContent: 'space-around',
  },
  btnContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 1,
    borderTopWidth: 1,
    borderTopColor: color.BLUE_4,
    flex: 1,
    marginHorizontal: 20,
  },
});
