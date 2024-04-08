import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

export enum ModalType {
    ALERT = 'Alert',
    INFO = 'Info',
    BACKHANDLER = 'BackHandler',
}

interface CustomModalProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    title: string;
    message: string;
    type: ModalType;
    button1Text: string;
    button1Action: () => void;
    button2Text?: string;
    button2Action?: () => void;
}

const CustomModal = (props: CustomModalProps) => {
    const { modal, setModal, title, message, button1Text, button1Action, button2Text, button2Action } = props;

    const handleButton1Press = () => {
        setModal(false);
        button1Action();
    };

    const handleButton2Press = () => {
        setModal(false);
        if (button2Action) {
            button2Action();
        }
    };

    const renderButtons = () => {
        return (
            <View style={styles.buttonContainer}>
                {button2Text && button2Action && (
                    <TouchableOpacity style={styles.button} onPress={handleButton2Press} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>{button2Text}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={handleButton1Press} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>{button1Text}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modal} onRequestClose={() => setModal(false)}>
            <Pressable style={styles.container} onPress={() => setModal(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    {renderButtons()}
                </View>
            </Pressable>
        </Modal>
    );
};

export default CustomModal;