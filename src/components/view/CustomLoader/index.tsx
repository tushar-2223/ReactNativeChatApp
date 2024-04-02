import { View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './style'
import { Colors } from '../../../utils'

interface CustomLoaderProps {
    loader: boolean,
    setLoader: (loader: boolean) => void
}

const CustomLoader = (props: CustomLoaderProps) => {

    const {
        loader,
        setLoader
    } = props

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={loader}
            onRequestClose={() => {
                setLoader(false)
            }}
        >
            <View style={styles.container}>
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color={Colors.DARK} />
                </View>
            </View>
        </Modal>
    )
}

export default CustomLoader