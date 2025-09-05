import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [role, setRole] = useState<string>("vendor")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>("")
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [secureEntry, setSecureEntry] = useState<boolean>(true)


  const { user, signIn, signUp, isLoading } = useAuth()
  const router = useRouter()
  const theme = useTheme()


  const handleAuth = async () => {

    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    setError(null)

    console.log(user);
    

    if (isSignUp) {
      const error = await signUp(email, password, role)
      if (error) {
        setError(error)
        return
      }
    } else {
      const error = await signIn(email, password)
      if (error) {
        setError(error) 
        return
      }

      console.log(user);
      
      router.replace("/")
    }
  }

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev)
  }

  const toggleShowPassword = () => {
    setSecureEntry((prev) => !prev)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
     
        <View style={styles.titleContainer}>
          <Text style={styles.title} variant="headlineLarge">{isSignUp ? "Create Account" : "Welcome Back"}</Text>
          <Text style={styles.subtitle}>{isSignUp ? "Sign up as" : "Login as"}</Text>

          <SegmentedButtons
              value={role}
              onValueChange={setRole}
              buttons={[
                {
                  value: "vendor",
                  label: "Vendor Staff",
                  icon: ({color, size}) => <Ionicons name="restaurant-outline" size={size} color={color} />
                  
                },
                {
                  value: "agent",
                  label: "Vendor Agent",
                  icon: ({color, size}) => <SimpleLineIcons name="user" size={size} color={color} />              
                }
              ]}
              style={styles.userType}
              theme={{
                roundness: 1,
                colors: {
                  secondaryContainer: "#fff",
                  onSecondaryContainer: "#3f3b38"
                }
               }}
              
            />
        </View>

        
        <View>

            <TextInput
              style={styles.input}
              label="Email address"
              mode="outlined"
              keyboardType="email-address"
              placeholder="e.g john@doe.com"
              autoCapitalize="none"
              onChangeText={setEmail}
              activeOutlineColor="#0c513f"
            />

            <TextInput
              style={styles.input}
              label="Password"
              mode="outlined"
              secureTextEntry={secureEntry}
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={setPassword}
              right={ <TextInput.Icon icon="eye" onPress={toggleShowPassword}/>}
              activeOutlineColor="#0c513f"
            />

            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>{isSignUp ? "" : "Forgot Password?"}</Text>
            </View>

            { error && <Text style = {{ color: theme.colors.error }} >{error}</Text> }

            <Button
              mode="contained"
              buttonColor="#0c513f"
              style={styles.loginButton}
              onPress={handleAuth}
            >
              {isSignUp ? "Signup" : "Login"}
            </Button>

            <Button
              mode="text"
              onPress={handleSwitchMode}
            >
              <View style={styles.bottom}>
                <Text style={styles.signupText}>{isSignUp ? "Already have an account?" : "Don't have an account?"} </Text><Text style={[styles.signupText2, styles.signupText]}>{isSignUp ? "Signin" : "Sign Up"}</Text>
              </View> 
            </Button>
           
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    
  },
  userTypeContainer: {
    backgroundColor: "red",
    borderWidth: 0,
  },
  userType: {
    borderWidth: 0,
    marginBottom: 40,
    backgroundColor: "#e0e0e0",
  },
  input: {
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold"
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 15
  },
  forgotPassword: {
    marginBottom: 2,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#042907"
  },
  loginButton: {
    borderRadius: 5,
    paddingVertical: 6,
    marginBottom: 20
  },
   signupText: {
    fontSize: 18
  },
  signupText2: {
    color: "#0439",
    fontWeight: "bold"
  },
  bottom: {
    flexDirection: "row"
  }
})

