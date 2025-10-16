import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

const SuccessAnimationContext = React.createContext({setSuccessAnimation: (success: boolean) => {}});

export default function SuccessAnimationContextProvider({children}: {children: React.ReactNode}) {
    const [successAnimation, setSuccessAnimation] = React.useState(false);
    const animationRef = useRef<LottieView>(null);
    
    useEffect(() => {
        if(!successAnimation) return

        animationRef.current?.play();
        
    }, [successAnimation]);
    
    return (
        <SuccessAnimationContext.Provider value={{setSuccessAnimation}}>
            {children}
            {successAnimation &&
            <LottieView
                ref={animationRef}
                style={styles.success}
                source={require('@/assets/lottie/Success Check.json')}
                loop={false}
                onAnimationFinish={() => {
                    setSuccessAnimation(false);
                    animationRef.current?.reset();
                }}
            ></LottieView>}
        </SuccessAnimationContext.Provider>
    )
}

const styles = StyleSheet.create({
  success: {
    flex: 1,
    position: 'absolute',
    backgroundColor: "white",
    width: '100%',
    height: '100%',
  },
});

export const useSuccessAnimation = () => React.useContext(SuccessAnimationContext);