import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './style'
import Icon from 'react-native-vector-icons/Ionicons'
import { String } from '../../../utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthenticatedNavigatorType } from '../../../routes/Authenticated'

interface CreategroupProps {
    navigation: NativeStackNavigationProp<AuthenticatedNavigatorType>
}

const Creategroup = ({ navigation }: CreategroupProps) => {

    const header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackIcon}>
                    <Icon name="arrow-back" size={17} color="black"
                    />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{String.createGroup}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}

            {/* <View style={styles.groupContainer}>
            </View> */}
        </View>
    )
}

export default Creategroup