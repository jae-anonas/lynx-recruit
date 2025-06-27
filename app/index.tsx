import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { router } from 'expo-router';
import { useSession } from '@/components/SessionProvider';
import { useFonts } from 'expo-font';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    'Pacifico-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'), // Replace with your fancy font file
  });

  if (!fontsLoaded) return null;

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      routeUser(user);
    } catch (error: any) {
      alert('Sign in failed: ' + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      routeUser(user);
    } catch (error: any) {
      alert('Sign up failed: ' + error.message);
    }
  };

  const routeUser = (user: UserCredential) => {
    const email = user.user.email?.toLowerCase();
    
    if (email === 'jae.anonas@gmail.com') {
      router.replace('/(admin)');
    } else if (email === 'anonasjae@gmail.com') {
      // Route specific surveyor users to the surveyors layout
      router.replace('/(surveyors)' as any);
    } else {
      router.replace('/(users)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={{ width: '100%', marginTop: 48 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
            <Image
              source={require('../assets/qs-mate-logo.png')}
              style={[styles.logo, { width: 120, height: 120, marginRight: 24 }]}
            />
            <Text style={[styles.title, { marginBottom: 0, fontFamily: 'Pacifico-Regular', fontSize: 40 }]}>QS Mate</Text>
          </View>

          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={signIn}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#00E5FF',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
