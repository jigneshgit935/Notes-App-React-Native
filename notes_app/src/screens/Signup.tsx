import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { RootNavigationProps } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import Loader from '../components/Loader';
import { API_URL } from '@env';

interface MyProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Signup'>;
}
const Signup = ({ navigation }: MyProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [badName, setBadName] = useState<boolean>(false);
  const [badEmail, setBadEmail] = useState<boolean>(false);
  const [badPassword, setBadPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validate = () => {
    let valid = true;
    if (email == '') {
      setBadEmail(true);
      valid = false;
    } else if (email != '') {
      setBadEmail(false);
    }

    if (password == '') {
      setBadPassword(true);
      valid = false;
    } else if (password != '') {
      setBadPassword(false);
    }

    if (name == '') {
      setBadName(true);
      valid = false;
    } else if (name != '') {
      setBadName(false);
    }
    return valid;
  };

  const SignUp = async () => {
    setLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = { name: name, email: email, password: password };
    const res = await fetch(`http://${API_URL}/api/auth/register`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    console.log(data);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Account</Text>
      <TextInput
        value={name}
        onChangeText={(txt) => setName(txt)}
        placeholder="Enter your name"
        style={styles.input}
      />
      {badName && <Text style={styles.errorText}>Please Enter Name</Text>}
      <TextInput
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        placeholder="Enter your email"
        style={styles.input}
      />
      {badEmail && <Text style={styles.errorText}>Please Enter Email</Text>}
      <TextInput
        value={password}
        onChangeText={(txt) => setPassword(txt)}
        placeholder="Enter your password"
        style={styles.input}
      />
      {badPassword && (
        <Text style={styles.errorText}>Please Enter Password</Text>
      )}

      <TouchableOpacity
        onPress={() => {
          if (validate()) {
            SignUp();
          }
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={[
          styles.loginBtn,
          { backgroundColor: 'white', borderWidth: 1, borderColor: 'black' },
        ]}
      >
        <Text style={[styles.btnText, { color: 'black' }]}>
          Already have an Account? <Text style={{ color: 'blue' }}>Login</Text>
        </Text>
      </TouchableOpacity>
      <Loader visible={loading} text="Registering Account" />
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  heading: {
    fontSize: 30,
    color: 'black',
    marginLeft: 20,
    marginTop: 100,
    fontWeight: '500',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    marginTop: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    borderRadius: 10,
  },
  loginBtn: {
    width: '90%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    marginTop: 5,
  },
});
