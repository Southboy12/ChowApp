import Toast from 'react-native-toast-message'
import { Audio } from 'expo-av'



const playSound = async (type: "success" | "error") => {
    try {
        const sound = new Audio.Sound();
        const soundFile =
            type === "success"
                ? require("../assets/sounds/notification.mp3")
                : require("../assets/sounds/notification.mp3")

        await sound.loadAsync(soundFile);
        await sound.playAsync()

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync()
            }
        });
    } catch (error) {
        console.warn("Error playing sound:", error);
        
    }
}

export const notify = ({type, text1, text2}: {type: "success" | "error", text1: string, text2: string}) => {
    Toast.show({
        type,
        text1,
        text2
    });

    playSound(type)
}
