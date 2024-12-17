import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SignIn {
    email: string,
    otp: string
}
interface Response {
    message: string,
    otp: string,
    token: string
}

const SignIn = () => {
    const [token, setToken] = useState<string | null>("");
    const navigate: any = useNavigation();
    const toast = useToast();

    const getToken = async () => {
        const getToken = await AsyncStorage.getItem("user");
        console.log("Token: ", getToken)
        setToken(getToken);
        if (token) {
            navigate.navigate("Home")
        }
    }

    useEffect(() => {
        getToken();
    }, [token])



    const [infos, setInfos] = useState<SignIn>({
        email: '',
        otp: ''
    })


    const [response, setResponse] = useState<Response>({
        otp: "",
        message: "",
        token: ""
    })

    const [isEmail, setIsEmail] = useState<boolean>(false);

    const validateEmail = async () => {
        const API = Platform.OS === 'android' ? ("http://10.0.2.2:8080/user") : ("http://localhost:8080/user");

        // if(isEmail){
        let res: any = await fetch(`${API}/login-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: infos.email }),
        });
        const status = res.status;
        res = await res.json();
        if (status === 201) {
            setResponse({ otp: res.otp, message: res.message, token: res.token })
            setIsEmail(true)
            toast.show(res.message, {
                type: 'success',
                // topOffset: 20,
                // bottomOffset: 80,
                // duration: 4000,
                placement: 'top',
            });
        } else {
            toast.show(res.message, {
                type: 'error',
                // topOffset: 20,
                // bottomOffset: 80,
                // duration: 4000,
                placement: 'top',
            });
        }
        // }

    }

    const verifyOTP = async () => {
        if (infos.otp === response.otp) {
            await AsyncStorage.setItem("user", JSON.stringify(response.token));
            toast.show("Account verified!!!", {
                type: 'success',
                placement: 'top',
            });
            navigate.navigate('Home');
        } else {
            toast.show("OTP wrong provided!!!", {
                type: "error",
                placement: 'top',
            })
            console.log("Wrong OTP")
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            padding: 15,
        }}>
            <Image source={{
                uri: 'https://animationvisarts.com/wp-content/uploads/2023/10/image-15.png'
            }} height={100} width={200} style={{
            }} alt='logo' />
            <Text style={{
                marginTop: 20,
                fontWeight: 'bold',
                fontSize: 28
            }}>Welcome to RideEasy</Text>

            <View style={{
                width: "90%",
                marginTop: 20
            }}>
                <TextInput placeholder='Enter your email address' style={{
                    padding: 5,
                    backgroundColor: "#ebeaea",
                    height: 50,
                    color: "black",
                    borderRadius: 10,
                    fontSize: 14,
                    paddingLeft: 20,
                    paddingRight: 20,
                }} onChangeText={(e) => {
                    setInfos({ ...infos, email: e })
                }} keyboardType="email-address" />

                {
                    response.otp && (
                        <TextInput placeholder='Enter your OTP' style={{
                            padding: 5,
                            backgroundColor: "#ebeaea",
                            height: 50,
                            marginTop: 20,
                            color: "black",
                            borderRadius: 10,
                            fontSize: 14,
                            paddingLeft: 20,
                            paddingRight: 20,
                        }} onChangeText={(e) => {
                            setInfos({ ...infos, otp: e })
                        }} />
                    )
                }
                <TouchableOpacity onPress={() => {
                    response.otp.length === 0 ? validateEmail() : verifyOTP()
                }}>
                    <Text style={{
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 'bold',
                        backgroundColor: "#007bff",
                        fontSize: 18,
                        color: "white"
                    }}>
                        {
                            isEmail ? 'Verify' : 'Get OTP'
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigate.navigate('SignUp')
                }}>
                    <Text style={{
                        marginTop: 2,
                        padding: 10,
                        borderRadius: 10,
                        textAlign: "right",
                        fontWeight: '500',
                        fontSize: 16,
                        color: "gray"
                    }}>
                        Don't have an account? Register Now
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})