import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";


export default function SuccessAnimation() {

    const animationRef = useRef<LottieView>(null);
    
    useEffect(() => {
        animationRef.current?.play();
        
    }, []);
    return (
        <LottieView
            ref={animationRef}
            style={styles.success}
            source={require('@/assets/lottie/Success Check.json')}
            loop={false}
            onAnimationFinish={() => {
                animationRef.current?.reset();
            }}
        ></LottieView>
    );
}

const styles = StyleSheet.create({
  success: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});