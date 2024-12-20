import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useToast } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPTextView from 'react-native-otp-textinput'


interface SignUp {
    email: string,
    contactNumber: Number,
    firstName: string,
    lastName: string
}

interface Response {
    message: string,
    otp: string,
    token: string
}

const SignUp = () => {
    const [token, setToken] = useState<string | null>("");
    const [openModel, setOpenModel] = useState<boolean>(false)
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



    const [infos, setInfos] = useState<SignUp>({
        email: '',
        firstName: "",
        lastName: "",
        contactNumber: 0,
    })
    const [otp,setOtp]=useState<string>('')


    const [response, setResponse] = useState<Response>({
        otp: "",
        message: "",
        token: ""
    })

    const handleRegister = async () => {
        const API = Platform.OS === 'android' ? ("http://10.0.2.2:8080/user") : ("http://localhost:8080/user");

        let res: any = await fetch(`${API}/create-new-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ infos }),
        });
        const status = res.status;
        res = await res.json();
        if (status === 201) {
            setResponse({ otp: res.otp, message: res.message, token: res.token })
            toast.show(res.message, {
                type: 'success',
                placement: 'top',
            });
            setOpenModel(true);
        } else {
            toast.show(res.message, {
                type: 'error',
                placement: 'top',
            });
        }
    }

    const handleVerifyOTP=async()=>{
        const API = Platform.OS === 'android'? ("http://10.0.2.2:8080/user") : ("http://localhost:8080/user");

        let res: any = await fetch(`${API}/verify-new-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: infos.email,
                otp: otp,
             }),
        });
        const status = res.status;
        res = await res.json();
        if (status === 200) {
            toast.show(res.message, {
                type:'success',
                placement: 'top',
            });
            setOpenModel(false);
            navigate.navigate('Home');
        } else {
            toast.show(res.message, {
                type: 'error',
                placement: 'top',
            });
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
                <View style={{
                    marginBottom: 5, display: 'flex', flexDirection: 'row', backgroundColor: "#ebeaea",
                    padding: 5,
                    borderRadius: 10,
                    height: 50
                }}>
                    <View style={{
                        backgroundColor: 'green',
                        padding: 2,
                        borderRadius: "50%",
                        display: 'flex',
                        width: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <AntDesign name="user" size={20} color="white" />
                    </View>
                    <TextInput
                        placeholder='Enter your first name'
                        style={{
                            padding: 5,
                            color: "black",
                            borderRadius: 10,
                            fontSize: 14,
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                        onChangeText={(e) => {
                            setInfos({ ...infos, firstName: e })
                        }}
                    />
                </View>
                <View style={{
                    marginBottom: 5, display: 'flex', flexDirection: 'row', backgroundColor: "#ebeaea",
                    padding: 5,
                    borderRadius: 10,
                    height: 50
                }}>
                    <View style={{
                        backgroundColor: 'green',
                        padding: 2,
                        borderRadius: "50%",
                        display: 'flex',
                        width: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <AntDesign name="user" size={20} color="white" />
                    </View>
                    <TextInput
                        placeholder='Enter your last name'
                        style={{
                            padding: 5,
                            color: "black",
                            borderRadius: 10,
                            fontSize: 14,
                            paddingLeft: 20,
                            paddingRight: 20,
                        }}
                        onChangeText={(e) => {
                            setInfos({ ...infos, lastName: e })
                        }}
                    />
                </View>

                <View style={{
                    marginBottom: 5, display: 'flex', flexDirection: 'row', backgroundColor: "#ebeaea",
                    padding: 5,
                    borderRadius: 10,
                    height: 50
                }}>
                    <View style={{
                        backgroundColor: 'green',
                        padding: 2,
                        borderRadius: "50%",
                        display: 'flex',
                        width: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <AntDesign name="mail" size={20} color="white" />
                    </View>
                    <TextInput placeholder='Enter your email address' style={{
                        padding: 5,
                        backgroundColor: "#ebeaea",
                        height: 50,
                        color: "black",
                        borderRadius: 10,
                        fontSize: 14,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }} keyboardType="email-address" onChangeText={(e) => {
                        setInfos({ ...infos, email: e })
                    }} />
                </View>


                <View style={{
                    marginBottom: 5, display: 'flex', flexDirection: 'row', backgroundColor: "#ebeaea",
                    padding: 5,
                    borderRadius: 10,
                    height: 50,
                    marginTop: 5
                }}>
                    <View style={{
                        backgroundColor: 'green',
                        padding: 2,
                        borderRadius: "50%",
                        display: 'flex',
                        width: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <AntDesign name="mobile1" size={20} color="white" />
                    </View>
                    <TextInput placeholder='Enter your email address' style={{
                        padding: 5,
                        backgroundColor: "#ebeaea",
                        height: 50,
                        color: "black",
                        borderRadius: 10,
                        fontSize: 14,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }} keyboardType="name-phone-pad" onChangeText={(e) => {
                        setInfos({ ...infos, contactNumber: Number(e) })
                    }} />
                </View>

                <TouchableOpacity disabled={!infos.email || !infos.firstName || !infos.firstName || !infos.contactNumber} onPress={handleRegister}>
                    <Text style={{
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 'bold',
                        backgroundColor: !infos.email || !infos.firstName || !infos.firstName || !infos.contactNumber ?"gray":"#007bff",
                        fontSize: 18,
                        color: "white"
                    }}>
                        Register Account
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {
                    navigate.navigate('SignIn')
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
                        Already have an account? Login now
                    </Text>
                </TouchableOpacity>
            </View>

            {
                openModel && (
                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(7, 7, 7, 0.5)',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20
                    }}>
                        <View style={{
                            backgroundColor: '#ebeaea',
                            padding: 20,
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            position: 'relative'
                        }}>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                right: 20,
                                // marginBottom:20
                            }} onPress={handleVerifyOTP}>
                                <Text style={{
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 10,
                                    textAlign: "right",
                                    fontWeight: 'bold',
                                    backgroundColor: "#007bff",
                                    fontSize: 18,
                                    color: "white"
                                }}>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: 'black',
                            }}>Verify OTP</Text>
                            <OTPTextView textInputStyle={{
                                cursor: 'pointer',
                                
                            }}  handleTextChange={(e)=>{
                                setOtp(e)
                            }} inputCount={6} />
                            <TouchableOpacity disabled={!otp} style={{
                                width:'100%'
                            }} onPress={()=>{
                                console.log("OTP: ",otp);
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
                                    Verify OTP
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({})