
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, Stack } from "@react-native-material/core";

interface MainSpeedDialProps {
    handlePress: () => void
}
export default function MainSpeedDial({handlePress}: MainSpeedDialProps) {
    
    return (
        
        <Stack 
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20
            }}
            >
                <FAB
                    variant="standard"
                    color="#4f46e5"
                    pressEffect="highlight"
                    onPress={handlePress}
                    icon={props => <Icon name="plus" {...props} />} />
        </Stack>
    )
}