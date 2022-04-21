import { createStackNavigator } from '@react-navigation/stack';
//import screens from screens folder
import {HomeScreen} from "./screens/HomeScreen";
import {Login} from "./Login";


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name={'Login'} component={Login} />
        </Stack.Navigator>
    );
}