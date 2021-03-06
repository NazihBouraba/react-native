import React , {Component} from 'react';
import { Text ,View  } from 'react-native';
import { Card , Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';



class Contact extends Component {
    constructor(props){
        super(props)
        this.state= {

        }
    }

    static navigationOptions = {
        title: 'Contact'
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }


    render() {
     return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>  
                <Card
                featuredTitle={"Contact Information"}
                
                >
                    
                    
                    <Text style={{margin: 10 , marginBottom : 2, textAlign: "center" ,fontWeight: "bold", fontSize : 30 }}>
                    Contact Information{"\n"}
                    </Text>

                    <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                    />
                    <Text style={{margin: 10 , marginTop :50}}>
                    121, Clear Water Bay Road{"\n"}
                    </Text>
                    <Text style={{margin: 10}}>
                    Clear Water Bay, Kowloon{"\n"}
                    </Text>
                    <Text style={{margin: 10}}>
                    HONG KONG~{"\n"}
                    </Text>
                    <Text style={{margin: 10}}>
                    Tel: +852 1234 5678{"\n"}
                    </Text>
                    <Text style={{margin: 10}}>
                    Fax: +852 8765 4321{"\n"}
                    </Text>
                    <Text style={{margin: 10}}>
                    Email:confusion@food.net{"\n"}
                    </Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
        </Animatable.View>
     )
    }


}

export default Contact