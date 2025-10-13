
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, Stack } from "@react-native-material/core";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface MainSpeedDialProps {
    handleAddExpense: () => void,
    handleAddIncome: () => void
}
export default function MainSpeedDial({handleAddExpense, handleAddIncome}: MainSpeedDialProps) {
    const [open, setOpen] = useState(false);
    const translateY = useSharedValue(55);
    const translateX = useSharedValue(-5);
    const translateY2 = useSharedValue(55);
    const translateX2 = useSharedValue(-5);

    const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX2.value }, { translateY: translateY2.value }],
        };
    })
    const slideDown = () => {
        translateY.value = withTiming(55, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });
        translateY2.value = withTiming(55, { duration: 300 });
        translateX2.value = withTiming(0, { duration: 300 });
    };

    const slideUp = () => {
        translateY.value = withTiming(3, { duration: 250 });
        translateX.value = withTiming(5, { duration: 250 });
        translateY2.value = withTiming(-44, { duration: 400 });
        translateX2.value = withTiming(10, { duration: 400 });
    };

    const toggleOpen = () => {
        if(open)  slideDown(); else slideUp();
        setOpen(!open);
    };

    return (
        
        <Stack 
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20
            }}
            >
                <Animated.View style={animatedStyle2}>
                <FAB
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10
                    }}
                    tintColor="white"
                    variant="standard"
                    color="#e54b46ff"
                    size="mini"
                    pressEffect="highlight"
                    onPress={handleAddExpense}
                    icon={props => <Icon name="minus" {...props} />} />
                </Animated.View>
                
                <Animated.View style={animatedStyle}>
                <FAB
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10
                    }}
                    variant="standard"
                    tintColor="white"
                    color="#42c431ff"
                    size="mini"
                    pressEffect="highlight"
                    onPress={handleAddIncome}
                    icon={props => <Icon name="plus" {...props} />} />
                </Animated.View>
                <FAB
                    variant="standard"
                    color="#4f46e5"
                    pressEffect="highlight"
                    onPress={toggleOpen}
                    icon={props => <Icon name="currency-usd" {...props} />} />
        </Stack>
    )
}